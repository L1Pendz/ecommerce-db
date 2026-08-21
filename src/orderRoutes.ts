import { Router, Request, Response } from "express";
import { pool } from "./db";
import { Order } from "./types";

const router = Router();

router.get("/orders", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT order_id, customer_id, order_date, shipping_city
      FROM orders`,
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get(
  "/orders/customer/:customerId",
  async (req: Request, res: Response) => {
    const { customerId } = req.params;
    try {
      const result = await pool.query(
        `SELECT order_id, customer_id, order_date, shipping_city
        FROM orders
        WHERE customer_id = $1`,
        [customerId],
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Customer not found" });
        return;
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

router.post("/orders", async (req: Request, res: Response) => {
  const { order_id, customer_id, order_date, shipping_city }: Order = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO orders (order_id, customer_id, order_date, shipping_city)
      VALUES ($1, $2, $3, $4)
      RETURNING order_id, customer_id, order_date, shipping_city`,
      [order_id, customer_id, order_date, shipping_city],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.delete("/orders/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM orders
      WHERE order_id = $1
      RETURNING order_id, customer_id, order_date, shipping_city`,
      [id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;

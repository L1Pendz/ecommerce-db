import { Router, Request, Response } from "express";
import { pool } from "./db";
import { OrderItem } from "./types";

const router = Router();

router.get(
  "/order-items/:orderId",
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    try {
      const result = await pool.query(
        `SELECT order_id, product_id, quantity, discount
        FROM orders_item
        WHERE order_id = $1`,
        [orderId],
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

router.post("/order-items", async (req: Request, res: Response) => {
  const { order_id, product_id, quantity, discount }: OrderItem = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO order_item (order_id, product_id, quantity, discount)
      VALUES ($1, $2, $3, $4)
      RETURNING order_id, product_id, quantity, discount`,
      [order_id, product_id, quantity, discount],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
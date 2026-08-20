import { Router, Request, Response } from "express";
import { pool } from "./db";
import { Customer } from "./types";

const router = Router();

router.get("/customers", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT customer_id, customer_name, city, membership_level
      FROM customers`,
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get("/customers/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT customer_id, customer_name, city, membership_level
      FROM customers
      WHERE customer_id = $1`,
      [id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.post("/customer", async (req: Request, res: Response) => {
  const { customer_id, customer_name, city, membership_level }: Customer =
    req.body;
  try {
    const result = await pool.query(
      `INSERT INTO customer (customer_id, customer_name, city, membership_level)
      VALUES ($1, $2, $3, $4)
      RETURNING customer_id, customer_name, city, membership_level`,
      [customer_id, customer_name, city, membership_level],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.put("/customers/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { city, membership_level }: Customer = req.body;
  try {
    const result = await pool.query(
      `UPDATE customer
      SET city = $1, membership_level = $2
      WHERE id = $3
      RETURNING customer_id, customer_name, city, membership_level`,
      [city, membership_level, id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM customer 
      WHERE id = $1
      RETURNING customer_id, customer_name, city, membership_level`,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;

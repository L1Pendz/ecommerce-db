import { Router, Request, Response } from "express";
import { pool } from "./db";
import { Product } from "./types";

const router = Router();

router.get("/products", async (req: Request, res: Response) => {
  const { category } = req.query;
  try {
    const result = await pool.query(
      `SELECT product_id, product_name, category, unit_price
      FROM products
      WHERE ($1 IS NULL OR category = $1)`,
      [category],
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get("/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT product_id, product_name, category, unit_price
      FROM products
      WHERE product_id = $1`,
      [id],
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.post("/products", async (req: Request, res: Response) => {
  const { product_id, product_name, category, unit_price }: Product = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (product_id, product_name, category, unit_price)
      VALUES ($1, $2, $3, $4)
      RETURNING product_id, product_name, category, unit_price`,
      [product_id, product_name, category, unit_price],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.patch("/products/:id/price", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { unit_price } = req.body;
  try {
    const result = await pool.query(
      `UPDATE products
      SET unit_price = $1
      WHERE product_id = $2
      RETURNING product_id, product_name, category, unit_price`,
      [unit_price, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;

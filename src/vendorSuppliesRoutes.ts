import { Router, Request, Response } from "express";
import { pool } from "./db";
import { Supplies } from "./types";

const router = Router();

router.get("/vendors", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT vendor_id, vendor_name, city
      FROM vendor`,
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get(
  "/supplies/vendor/:vendorId",
  async (req: Request, res: Response) => {
    const { vendorId } = req.params;
    try {
      const result = await pool.query(
        `SELECT vendor_id, product_id, stock_quantity
        FROM supplies
        WHERE vendor_id = $1`,
        [vendorId],
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Vendor not found" });
        return;
      }
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

router.put("/supplies/:vendorId/:productId", async (req: Request, res: Response) => {
  const { vendorId } = req.params;
  const { stock_quantity }: Supplies = req.body;
  try {
    const result = await pool.query(
      `UPDATE supplies
      SET stock_quantity = $1
      WHERE vendor_id = $2
      RETURNING vendor_id, product_id, stock_quantity`,
      [stock_quantity, vendorId],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;

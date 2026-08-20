import express from "express";
import dotenv from "dotenv";
import customerRoutes from "./customerRoutes";
import productRoutes from "./productRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", customerRoutes);
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Ecommerce API server running on http://localhost:${PORT}`);
});

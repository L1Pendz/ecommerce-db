import express from "express";
import dotenv from "dotenv";
import customerRoutes from "./customerRoutes";
import productRoutes from "./productRoutes";
import orderItemRoutes from "./orderItemRoutes";
import orderRoutes from "./orderRoutes";
import vendorSuppliesRoutes from "./vendorSuppliesRoutes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", customerRoutes);
app.use("/api", productRoutes);
app.use("/api", orderItemRoutes);
app.use("/api", orderRoutes);
app.use("/api", vendorSuppliesRoutes);

app.listen(PORT, () => {
  console.log(`Ecommerce API server running on http://localhost:${PORT}`);
});

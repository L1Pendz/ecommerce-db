import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/ecommerce", );

app.listen(PORT, () => {
  console.log(`Ecommerce API server running on http://localhost:${PORT}`);
});

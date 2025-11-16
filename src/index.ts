import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoDB } from "./mongo";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import cartRoutes from "./routes/cart";

dotenv.config();

connectMongoDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});

// Manejo de errores global
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Error interno:", err);   // imprime error real en consola
  res.status(500).json({ message: "Server error", error: err.message });
});

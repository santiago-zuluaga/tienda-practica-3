import { Request, Response } from "express";
import { Product } from "../models/product.model";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || price == null || stock == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    if (stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock
    });

    res.status(201).json(product);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
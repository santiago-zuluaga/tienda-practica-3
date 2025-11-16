import { Request, Response } from "express";
import { Cart } from "../models/cart.model";
import { Product } from "../models/product.model";
import { JwtPayload } from "jsonwebtoken";

interface UserRequest extends Request {
  user?: string | JwtPayload;
}

export const getCart = async (req: UserRequest, res: Response) => {
  try {
    const userId = (req.user as JwtPayload).id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.json(cart || { items: [] });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req: UserRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = (req.user as JwtPayload).id;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Missing productId or quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      const existing = cart.items.find(
        (i) => i.productId.toString() === productId
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    res.json(cart);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
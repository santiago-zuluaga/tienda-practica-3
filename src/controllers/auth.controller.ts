import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(409).json({ message: "User or email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      passwordHash
    });

    res.status(201).json({ message: "User created", userId: newUser._id });
  } catch (err: any) {
    console.error("Error en register:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err: any) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

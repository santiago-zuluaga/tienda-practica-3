import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token inválido" });
  }

  jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
};
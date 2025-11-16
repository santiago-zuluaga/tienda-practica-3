import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { addToCart, getCart } from "../controllers/cart.controller";

const router = Router();

router.get("/", verifyToken, getCart);
router.put("/add", verifyToken, addToCart);

export default router;
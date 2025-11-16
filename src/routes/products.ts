import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { getProducts, createProduct } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.post("/", verifyToken, createProduct);

export default router;
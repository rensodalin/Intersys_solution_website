import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getAll);
router.get("/popularity/list", isAdmin, productController.getPopularity);
router.get("/:productId", productController.getById);
router.post("/", isAdmin, productController.create);
router.put("/:productId", isAdmin, productController.update);
router.delete("/:productId", isAdmin, productController.remove);

export default router;

import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as taxonomyController from "../controllers/taxonomyController.js";

const router = express.Router();

router.get("/", taxonomyController.getAll);
router.post("/category", isAdmin, taxonomyController.createCategory);
router.put("/category/:name", isAdmin, taxonomyController.updateCategory);
router.delete("/category/:name", isAdmin, taxonomyController.deleteCategory);
router.post("/category/:name/brand", isAdmin, taxonomyController.createBrand);
router.put("/category/:name/brand/:brandName", isAdmin, taxonomyController.updateBrand);
router.delete("/category/:name/brand/:brandName", isAdmin, taxonomyController.deleteBrand);
router.post("/category/:name/brand/:brandName/subcategory", isAdmin, taxonomyController.createSubcategory);
router.put("/category/:name/brand/:brandName/subcategory/:subName", isAdmin, taxonomyController.updateSubcategory);
router.delete("/category/:name/brand/:brandName/subcategory/:subName", isAdmin, taxonomyController.deleteSubcategory);
router.get("/category/:name/brand/:brandName/subcategories/flat", taxonomyController.getFlatSubcategories);

export default router;

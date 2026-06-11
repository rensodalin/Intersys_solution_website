import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as taxonomyController from "../controllers/taxonomyController.js";

const router = express.Router();

router.get("/", taxonomyController.getAll);
router.post("/category", isAdmin, taxonomyController.createCategory);
router.put("/category/:name", isAdmin, taxonomyController.updateCategory);
router.delete("/category/:name", isAdmin, taxonomyController.deleteCategory);
router.post("/category/:name/subcategory", isAdmin, taxonomyController.createSubcategory);
router.put("/category/:name/subcategory/:subName", isAdmin, taxonomyController.updateSubcategory);
router.delete("/category/:name/subcategory/:subName", isAdmin, taxonomyController.deleteSubcategory);

export default router;

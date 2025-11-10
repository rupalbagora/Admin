import express from "express";
import { upload } from "../../mediaApi/services/multerConfig";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import {
  createProductPackage,
  getProductPackages,
  getProductPackageById,
  updateProductPackage,
  deleteProductPackage,
} from "../controllers/productPackage.controller";

const router = express.Router();

router.post("/", protect, authorizeRole("admin", "superadmin"), upload.single("image"), createProductPackage);
router.get("/", protect, getProductPackages);
router.get("/:id", protect, getProductPackageById);
router.put("/:id", protect, authorizeRole("admin", "superadmin"), upload.single("image"), updateProductPackage);
router.delete("/:id", protect, authorizeRole("admin", "superadmin"), deleteProductPackage);

export default router;

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

// CREATE product package with image upload
router.post(
  "/",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("image"),
  createProductPackage
);

// GET all packages for logged-in admin
router.get("/", protect, getProductPackages);

// GET package by ID
router.get("/:id", protect, getProductPackageById);

// UPDATE product package
router.put(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("image"),
  updateProductPackage
);

// DELETE product package
router.delete(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  deleteProductPackage
);

export default router;
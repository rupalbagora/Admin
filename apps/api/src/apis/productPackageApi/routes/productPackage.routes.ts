import express from "express";
import {
  createProductPackage,
  getProductPackages,
  getProductPackageById,
  deleteProductPackage,
} from "../controllers/productPackage.controller";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";

const router = express.Router();

// Admin: create a product package
router.post("/", protect, authorizeRole("admin", "superadmin"), createProductPackage);

// Get all packages for logged-in admin
router.get("/", protect, getProductPackages);

// Get package details by ID
router.get("/:id", protect, getProductPackageById);

// Delete a product package
router.delete("/:id", protect, authorizeRole("admin", "superadmin"), deleteProductPackage);

export default router;

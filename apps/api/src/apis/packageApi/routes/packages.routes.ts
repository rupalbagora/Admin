import express from "express";
import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../controllers/packages.controller";
import { upload } from "../../mediaApi/services/multerConfig"; // your reusable multer setup

const router = express.Router();

// Create a new package
router.post("/upload", upload.single("image"), createPackage);

// Get all packages
router.get("/", getAllPackages);

// Get a package by ID
router.get("/:id", getPackageById);

// Update a package
router.put("/:id", upload.single("image"), updatePackage);

// Delete a package
router.delete("/:id", deletePackage);

export default router;

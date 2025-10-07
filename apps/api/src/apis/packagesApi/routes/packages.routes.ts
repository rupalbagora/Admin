import express from "express";
import {
  createPackage,
  getPackages,
  getPackageById,
  deletePackage,
} from "../controllers/packages.controllers";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";

const router = express.Router();

// Admin creates a package
router.post("/", protect, authorizeRole("admin", "superadmin"), createPackage);

router.get("/", protect, getPackages);        // ✅ protect route
router.get("/:id", protect, getPackageById);  // ✅ optional protect

// Admin: delete package
router.delete(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  deletePackage
);

export default router;

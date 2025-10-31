import express from "express";
import {
  createHomeService,
  getHomeServices,
  getHomeServiceById,
  updateHomeService,
  deleteHomeService,
} from "../controllers/homeService.controller";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import { upload } from "../../mediaApi/services/multerConfig"; // multer config

const router = express.Router();

// Create home service with image
router.post("/", protect, upload.single("image"), createHomeService);

// Update home service (image optional)
router.put("/:id", protect, authorizeRole("admin", "superadmin"), upload.single("image"), updateHomeService);

// Get all / Get by ID / Delete
router.get("/", protect, getHomeServices);
router.get("/:id", protect, getHomeServiceById);
router.delete("/:id", protect, authorizeRole("admin", "superadmin"), deleteHomeService);

export default router;

import express from "express";
import { upload } from "../../mediaApi/services/multerConfig";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import {
  uploadAboutSalon,
  getAllAboutSalon,
  deleteAboutSalon,
  updateAboutSalon,
} from "../controllers/aboutSalon.controller";

const router = express.Router();

router.post(
  "/upload",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("image"),
  uploadAboutSalon
);

router.get("/", protect, getAllAboutSalon);

router.delete("/:id", protect, authorizeRole("admin", "superadmin"), deleteAboutSalon);

router.put("/:id", protect, authorizeRole("admin", "superadmin"), upload.single("image"), updateAboutSalon);

export default router;

import express from "express";
import multer from "multer";
import path from "path";
import {
  createAboutSalon,
  getAllAboutSalon,
  getAboutSalonById,
  updateAboutSalon,
  deleteAboutSalon,
} from "../controllers/aboutSalon.controller";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../../../../uploads/aboutSalon"));
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", protect, authorizeRole("admin", "superadmin"), upload.single("image"), createAboutSalon);
router.put("/:id", protect, authorizeRole("admin", "superadmin"), upload.single("image"), updateAboutSalon);
router.get("/", protect, getAllAboutSalon);
router.get("/:id", protect, getAboutSalonById);
router.delete("/:id", protect, authorizeRole("admin", "superadmin"), deleteAboutSalon);

export default router;

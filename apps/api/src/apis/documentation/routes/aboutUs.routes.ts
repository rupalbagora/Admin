import { Router } from "express";
import { createOrUpdateAboutUs, getAboutUs } from "../controllers/aboutUs.controller";
import { upload } from "../../mediaApi/services/multerConfig"; // existing multer

const router = Router();

// POST route (form-data text-only)
router.post("/", upload.none(), createOrUpdateAboutUs);

// GET route
router.get("/", getAboutUs);

export default router;

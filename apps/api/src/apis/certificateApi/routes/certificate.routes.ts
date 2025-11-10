// routes/certificate.routes.ts
import express from "express";
import { upload } from "../../mediaApi/services/multerConfig";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import {
  uploadCertificate,
  getAllCertificates,
  deleteCertificate,
  updateCertificate, // ✅ Add this import
} from "../controllers/certificate.controllers";

const router = express.Router();

router.post(
  "/upload",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("certificateImage"),
  uploadCertificate
);

router.get("/", protect, getAllCertificates);

// ✅ Add the update route
router.put(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("certificateImage"), // Use same field name
  updateCertificate
);

router.delete(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  deleteCertificate
);

export default router;
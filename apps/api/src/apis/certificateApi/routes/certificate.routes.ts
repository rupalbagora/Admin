import express from "express";
import { upload } from "../../mediaApi/services/multerConfig";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import {
  uploadCertificate,
  getAllCertificates,
  deleteCertificate,
} from "../controllers/certificate.controllers";

const router = express.Router();

// Admin uploads a certificate image
 router.post(
  "/upload",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("certificateImage"), // field name in Postman
  uploadCertificate
);

// Public: View all certificates
router.get("/",protect, getAllCertificates);

// Admin deletes a certificate
router.delete(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  deleteCertificate
);

export default router;

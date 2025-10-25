import express from "express";
import upload from "../../mediaApi/services/multerConfig"; // ✅ default export
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import {
  createSpecialOffer,
  getAllSpecialOffers,
  getSpecialOfferById,
  updateSpecialOffer,
  deleteSpecialOffer,
} from "../controllers/specialoffers.controller";

const router = express.Router();

// 1️⃣ Create Special Offer
// Upload an image and save offer details
router.post(
  "/upload",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("image"), // 'image' must match the form-data key in Postman
  createSpecialOffer
);

// 2️⃣ Get All Special Offers
router.get("/", protect, getAllSpecialOffers);

// 3️⃣ Get Special Offer by ID
router.get("/:id", protect, getSpecialOfferById);

// 4️⃣ Update Special Offer by ID
router.patch(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("image"), // optional image update
  updateSpecialOffer
);

// 5️⃣ Delete Special Offer by ID
router.delete(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  deleteSpecialOffer
);

export default router;

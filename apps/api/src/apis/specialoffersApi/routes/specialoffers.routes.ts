import express from "express";
import { upload } from "../../mediaApi/services/multerConfig";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import {
  createSpecialOffer,
  getAllSpecialOffers,
  deleteSpecialOffer,
} from "../controllers/specialoffers.controller";

const router = express.Router();

//  Create Special Offer
router.post(
  "/upload",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("image"), // 'image' is the field name for Multer
  createSpecialOffer
);

//  Get All Special Offers
router.get("/", protect, getAllSpecialOffers);

//  Delete Special Offer
router.delete("/:id", protect, authorizeRole("admin", "superadmin"), deleteSpecialOffer);

export default router;

import express from "express";
import { upload } from "../../mediaApi/services/multerConfig";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
} from "../controllers/offer.controller";

const router = express.Router();

// CREATE
router.post(
  "/",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("imageUrl"),
  createOffer
);

// READ ALL
router.get("/", getAllOffers);

// READ SINGLE
router.get("/:id", getOfferById);

// UPDATE
router.put(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("imageUrl"),
  updateOffer
);

// DELETE
router.delete(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  deleteOffer
);

export default router;

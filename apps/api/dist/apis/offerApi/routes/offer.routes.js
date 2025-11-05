import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
} from "../controllers/offerController.js";

const router = express.Router();


router.post("/male/upload", (req, res, next) => {
  req.gender = "male"; 
  next();
}, upload.single("image"), createOffer);

router.post("/female/upload", (req, res, next) => {
  req.gender = "female";
  next();
}, upload.single("image"), createOffer);

router.get("/", getAllOffers);
router.get("/:id", getOfferById);
router.put("/:id", upload.single("image"), updateOffer);
router.delete("/:id", deleteOffer);

export default router;

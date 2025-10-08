// src/apis/youtubeApi/routes/youtube.routes.ts
import express from "express";
import {
  uploadYoutubeLinks,
  updateYoutubeLinksById,
  getYoutubeLinkById,
  getYoutubeLinkByDate,
  deleteYoutubeLinkById,
  getAllYoutubeLinks,
} from "../controllers/youtube.controllers";
import { createYoutubeValidator } from "../validators/youtube.validator";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";

const router = express.Router();

router.post(
  "/upload-youtube-links",
  protect,
  authorizeRole("admin", "superadmin"),
  createYoutubeValidator,
  uploadYoutubeLinks
);
router.patch(
  "/update-youtube-links-by-id/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  updateYoutubeLinksById
);
router.get("/get-youtube-links-by-id/:id", getYoutubeLinkById);
router.get("/get-youtube-links-by-date/:date", getYoutubeLinkByDate);
router.delete(
  "/delete-youtube-links-by-id/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  deleteYoutubeLinkById
);
router.get(
  "/get-all-youtube-links",
  protect,
  authorizeRole("admin", "superadmin"),
  getAllYoutubeLinks
);

export default router;

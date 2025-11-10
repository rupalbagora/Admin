import express from "express";
import {
  createYoutubeVideo,
  getAllYoutubeVideos,
  getYoutubeVideoById,
  getYoutubeVideosByDate,
  updateYoutubeVideo,
  deleteYoutubeVideo,
} from "../controllers/youtube.controllers";

import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import upload from "../../mediaApi/services/multerConfig";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("video"),
  createYoutubeVideo
);

router.get(
  "/",
  protect,
  authorizeRole("admin", "superadmin"),
  getAllYoutubeVideos
);

router.get("/:id", getYoutubeVideoById);
router.get("/date/:date", getYoutubeVideosByDate);

router.patch(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("video"),
  updateYoutubeVideo
);

router.delete(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  deleteYoutubeVideo
);

export default router;
// src/apis/youtubeApi/controllers/youtube.controllers.ts
import { Request, Response } from "express";
import YoutubeService from "../services/youtube.services";
import fs from "fs";
import path from "path";
/**
 * Create a new YouTube video entry
 * Supports both video file uploads and YouTube URLs
 */
export const createYoutubeVideo = async (req: Request, res: Response) => {
  try {
    const addedBy = (req as any).user._id;

    const { title, videoUrl } = req.body;
    const videoPath = req.file
      ? `/uploads/videos/${req.file.filename}`
      : undefined;

    if (!videoUrl && !req.file) {
      return res
        .status(400)
        .json({
          success: false,
          error: "You must provide a video file or a YouTube URL.",
        });
    }

    const newVideo = await YoutubeService.create({
      title,
      videoUrl: videoUrl || undefined,
      videoPath,
      addedBy,
    });

    res.status(201).json({ success: true, data: newVideo });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

/**
 * Get all YouTube videos
 */
export const getAllYoutubeVideos = async (_req: Request, res: Response) => {
  try {
    const videos = await YoutubeService.getAll();
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

/**
 * Get a single video by ID
 */
export const getYoutubeVideoById = async (req: Request, res: Response) => {
  try {
    const video = await YoutubeService.getById(req.params.id);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }
    res.status(200).json({ success: true, data: video });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

/**
 * Get videos by a specific date
 */
export const getYoutubeVideosByDate = async (req: Request, res: Response) => {
  try {
    const videos = await YoutubeService.getByDate(req.params.date);
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

/**
 * Update an existing video
 * Allows updating title, YouTube URL, or replacing the uploaded video file
 */
export const updateYoutubeVideo = async (req: Request, res: Response) => {
  console.log("heyyyyllo")
  try {
    console.log("heyyyyyyyyyy");
    const { title, videoUrl } = req.body;
    console.log("title", title);
    const videoPath = req.file
      ? `/uploads/videos/${req.file.filename}`
      : undefined;
    // ✅ Ensure at least one source is provided
    if (!videoUrl && !videoPath) {
      return res.status(400).json({
        success: false,
        error: "You must provide a video file or a YouTube URL.",
      });
    }
    const updated = await YoutubeService.updateById(req.params.id, {
      title,
      videoUrl: videoUrl || undefined,
      ...(videoPath && { videoPath }), // only include if a new file was uploaded
    });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

/**
 * Delete a video by ID
 */
export const deleteYoutubeVideo = async (req: Request, res: Response) => {
  try {
    const deleted = await YoutubeService.deleteById(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }
    // ✅ ADD THIS BLOCK
    if (deleted.videoPath) {
      const filePath = path.join(__dirname, "../../../../", deleted.videoPath);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(" Error deleting file:", err.message);
        } else {
          console.log(`🗑️ Deleted file: ${filePath}`);
        }
      });
    }
    // ✅ END OF NEW BLOCK
    res
      .status(200)
      .json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

import { Request, Response } from "express";
import YoutubeService from "../services/youtube.services";
import fs from "fs";
import path from "path";


export const createYoutubeVideo = async (req: Request, res: Response) => {
  try {
    const addedBy = (req as any).user._id;
    const { title, videoUrl } = req.body;
    
    // ✅ FIXED: Use absolute URL for video paths with HTTPS
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const videoPath = req.file
      ? `${baseUrl}/uploads/videos/${req.file.filename}`
      : undefined;

    if (!videoUrl && !req.file) {
      return res.status(400).json({
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
      return res.status(404).json({ success: false, message: "Video not found" });
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
  try {
    const { title, videoUrl } = req.body;
    
    // ✅ FIXED: Use absolute URL for video paths with HTTPS
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const videoPath = req.file
      ? `${baseUrl}/uploads/videos/${req.file.filename}`
      : undefined;

    // Get the existing video to check current sources
    const existingVideo = await YoutubeService.getById(req.params.id);
    if (!existingVideo) {
      return res.status(404).json({ 
        success: false, 
        message: "Video not found" 
      });
    }

    // ✅ FIXED: More flexible validation
    const hasNewYouTubeUrl = videoUrl !== undefined && videoUrl !== '';
    const hasNewVideoFile = videoPath !== undefined;
    const hasExistingYouTubeUrl = existingVideo.videoUrl;
    const hasExistingVideoFile = existingVideo.videoPath;

    // If no new source provided AND no existing source exists, then it's invalid
    if (!hasNewYouTubeUrl && !hasNewVideoFile && !hasExistingYouTubeUrl && !hasExistingVideoFile) {
      return res.status(400).json({
        success: false,
        error: "You must provide a video file or a YouTube URL.",
      });
    }

    // Prepare update data
    const updateData: any = { title };

    // Handle YouTube URL
    if (hasNewYouTubeUrl) {
      updateData.videoUrl = videoUrl;
      // If switching from file to YouTube URL, clear the file path
      if (hasExistingVideoFile) {
        updateData.videoPath = undefined;
        // Delete the old file
        if (existingVideo.videoPath) {
          // Extract filename from the full URL path
          const filename = existingVideo.videoPath.split('/').pop();
          if (filename) {
            const filePath = path.join(__dirname, "../../../../uploads/videos/", filename);
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting old file:", err.message);
              } else {
                console.log(`🗑️ Deleted old file: ${filePath}`);
              }
            });
          }
        }
      }
    } else if (videoUrl === '') {
      // If YouTube URL is explicitly set to empty string, clear it
      updateData.videoUrl = undefined;
    }
    // If no YouTube URL provided, keep the existing one

    // Handle video file
    if (hasNewVideoFile) {
      updateData.videoPath = videoPath;
      // If switching from YouTube URL to file, clear the YouTube URL
      if (hasExistingYouTubeUrl) {
        updateData.videoUrl = undefined;
      }
      // Delete old file if replacing
      if (existingVideo.videoPath && existingVideo.videoPath !== videoPath) {
        // Extract filename from the full URL path
        const filename = existingVideo.videoPath.split('/').pop();
        if (filename) {
          const oldFilePath = path.join(__dirname, "../../../../uploads/videos/", filename);
          fs.unlink(oldFilePath, (err) => {
            if (err) {
              console.error("Error deleting old file:", err.message);
            } else {
              console.log(`🗑️ Deleted old file: ${oldFilePath}`);
            }
          });
        }
      }
    }
    // If no new file uploaded, keep the existing file path

    console.log("Update data:", updateData);

    const updated = await YoutubeService.updateById(req.params.id, updateData);

    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        message: "Video not found" 
      });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};

/**
 * Delete a video by ID
 */
export const deleteYoutubeVideo = async (req: Request, res: Response) => {
  try {
    const deleted = await YoutubeService.deleteById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }
    
    if (deleted.videoPath) {
      // Extract filename from the full URL path
      const filename = deleted.videoPath.split('/').pop();
      if (filename) {
        const filePath = path.join(__dirname, "../../../../uploads/videos/", filename);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err.message);
          } else {
            console.log(`🗑️ Deleted file: ${filePath}`);
          }
        });
      }
    }
    
    res.status(200).json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
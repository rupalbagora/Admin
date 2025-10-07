// src/apis/youtubeApi/controllers/youtube.controller.ts
import { Request, Response } from "express";
import YoutubeService from "../services/youtube.services";
import { validationResult } from "express-validator";
import { CreateYoutubeDto } from "../dtos/create-youtube.dto";

export const uploadYoutubeLinks = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { youtubeLinks, date }: CreateYoutubeDto = req.body;
    const addedBy = (req as any).user._id;

    const links = await YoutubeService.create(youtubeLinks, addedBy, date);
    res
      .status(201)
      .json({
        success: true,
        message: "Links uploaded successfully!",
        data: links,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const updateYoutubeLinksById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { youtubeLinks, date }: CreateYoutubeDto = req.body;

    const updated = await YoutubeService.updateById(id, youtubeLinks, date);
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Link not found" });

    res
      .status(200)
      .json({
        success: true,
        message: "Links updated successfully!",
        data: updated,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getYoutubeLinkById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const link = await YoutubeService.getById(id);
    if (!link)
      return res
        .status(404)
        .json({ success: false, message: "Link not found" });

    res.status(200).json({ success: true, data: link });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getAllYoutubeLinks = async (_req: Request, res: Response) => {
  try {
    const links = await YoutubeService.getAll();
    res.status(200).json({ success: true, data: links });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getYoutubeLinkByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const links = await YoutubeService.getByDate(date);
    res.status(200).json({ success: true, data: links });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const deleteYoutubeLinkById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await YoutubeService.deleteById(id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Link not found" });

    res
      .status(200)
      .json({ success: true, message: "Link deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

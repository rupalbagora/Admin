import { Request, Response } from "express";
import AboutSalonService from "../services/aboutSalon.service";

export const uploadAboutSalon = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const addedBy = (req as any).user._id;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Salon image is required!" });
    }

    const image = req.file.path;
    const salon = await AboutSalonService.create(title, description, image, addedBy);

    res.status(201).json({ success: true, data: salon });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllAboutSalon = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const salons = await AboutSalonService.getByUser(userId);
    res.status(200).json({ success: true, data: salons });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteAboutSalon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await AboutSalonService.deleteById(id);

    if (!deleted) return res.status(404).json({ success: false, message: "About Salon not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateAboutSalon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: any = {};

    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description) updateData.description = req.body.description;
    if (req.file) updateData.image = req.file.path;

    const updated = await AboutSalonService.update(id, updateData);

    if (!updated) return res.status(404).json({ success: false, message: "About Salon not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

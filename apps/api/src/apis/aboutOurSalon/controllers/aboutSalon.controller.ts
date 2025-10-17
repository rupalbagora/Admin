import { Request, Response } from "express";
import AboutSalonService from "../services/aboutSalon.service";

export const createAboutSalon = async (req: Request, res: Response) => {
  try {
    const addedBy = (req as any).user._id;

    if (!req.file)
      return res.status(400).json({ success: false, message: "Image is required!" });

    const newSalon = await AboutSalonService.create({
      ...req.body,
      addedBy,
      image: req.file.path,
    });

    res.status(201).json({ success: true, data: newSalon });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllAboutSalon = async (req: Request, res: Response) => {
  try {
    const salons = await AboutSalonService.getAll();
    res.status(200).json({ success: true, data: salons });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAboutSalonById = async (req: Request, res: Response) => {
  try {
    const salon = await AboutSalonService.getById(req.params.id);
    if (!salon)
      return res.status(404).json({ success: false, message: "Salon not found" });
    res.status(200).json({ success: true, data: salon });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateAboutSalon = async (req: Request, res: Response) => {
  try {
    const updateData: any = { ...req.body };
    if (req.file) updateData.image = req.file.path;

    const updated = await AboutSalonService.updateById(req.params.id, updateData);
    if (!updated)
      return res.status(404).json({ success: false, message: "Salon not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteAboutSalon = async (req: Request, res: Response) => {
  try {
    const deleted = await AboutSalonService.deleteById(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Salon not found" });

    res.status(200).json({ success: true, message: "Salon deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

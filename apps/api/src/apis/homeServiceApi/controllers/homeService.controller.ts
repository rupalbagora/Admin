import { Request, Response } from "express";
import HomeServiceService from "../services/homeService.services";

export const createHomeService = async (req: Request, res: Response) => {
  try {
    const addedBy = (req as any).user._id;

    if (!req.file) return res.status(400).json({ success: false, message: "Image is required!" });

    const newService = await HomeServiceService.create({
      ...req.body,
      addedBy,
      image: req.file.path,
    });

    res.status(201).json({ success: true, data: newService });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getHomeServices = async (req: Request, res: Response) => {
  try {
    const services = await HomeServiceService.getAll();
    res.status(200).json({ success: true, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getHomeServiceById = async (req: Request, res: Response) => {
  try {
    const service = await HomeServiceService.getById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });
    res.status(200).json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateHomeService = async (req: Request, res: Response) => {
  try {
    const updateData: any = { ...req.body };
    if (req.file) updateData.image = req.file.path;

    const updated = await HomeServiceService.updateById(req.params.id, updateData);
    if (!updated) return res.status(404).json({ success: false, message: "Service not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteHomeService = async (req: Request, res: Response) => {
  try {
    const deleted = await HomeServiceService.deleteById(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Service not found" });
    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

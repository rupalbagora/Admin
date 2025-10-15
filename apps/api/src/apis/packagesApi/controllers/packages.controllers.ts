import { Request, Response } from "express";
import PackageService from "../services/packages.services";

export const createPackage = async (req: Request, res: Response) => {
  try {
    const addedBy = (req as any).user._id; //Logged-in user ID

    const newPackage = await PackageService.create({
      ...req.body,
      addedBy,
    });

    res.status(201).json({ success: true, data: newPackage });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getPackages = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const userId = (req as any).user._id; // Logged-in user ID
 
    const packages = await PackageService.getAll(userId, category as string);

    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};


export const getPackageById = async (req: Request, res: Response) => {
  try {
    const pkg = await PackageService.getById(req.params.id);
    if (!pkg)
      return res
        .status(404)
        .json({ success: false, message: "Package not found" });
    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  try {
    const deleted = await PackageService.deleteById(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Package not found" });
    res
      .status(200)
      .json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

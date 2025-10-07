import { Request, Response } from "express";
import ProductPackageService from "../services/productPackage.services";

export const createProductPackage = async (req: Request, res: Response) => {
  try {
    const addedBy = (req as any).user._id;

    const newPackage = await ProductPackageService.create({
      ...req.body,
      addedBy,
    });

    res.status(201).json({ success: true, data: newPackage });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getProductPackages = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const packages = await ProductPackageService.getAll(userId);

    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getProductPackageById = async (req: Request, res: Response) => {
  try {
    const pkg = await ProductPackageService.getById(req.params.id);
    if (!pkg)
      return res
        .status(404)
        .json({ success: false, message: "Package not found" });

    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const deleteProductPackage = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductPackageService.deleteById(req.params.id);
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

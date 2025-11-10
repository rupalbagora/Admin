import { Request, Response } from "express";
import Package from "../models/packages.model";

export const createPackage = async (req: Request, res: Response) => {
  try {
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`
      : "";

    const newPackage = new Package({
      title: req.body.title,
      price: req.body.price,
      services: req.body.services,
      about: req.body.about,
      discount: req.body.discount,
      review: req.body.review,
      rating: req.body.rating,
      gender: req.body.gender, 
      image: imageUrl,
    });

    const saved = await newPackage.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllPackages = async (req: Request, res: Response) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: packages });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getPackageById = async (req: Request, res: Response) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg)
      return res.status(404).json({ success: false, message: "Package not found" });

    res.status(200).json({ success: true, data: pkg });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`
      : req.body.image;

    const updated = await Package.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imageUrl },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "Package not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Package not found" });

    res.status(200).json({ success: true, message: "Package deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

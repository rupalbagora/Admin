import { Request, Response } from "express";
import { AboutUs } from "../models/aboutUs.model";
import { aboutUsSchema } from "../validators/aboutUs.validator";

export const createOrUpdateAboutUs = async (req: Request, res: Response) => {
  try {
    const validated = aboutUsSchema.parse({
      title: req.body.title,
      content: req.body.content,
    });

    let doc = await AboutUs.findOne();
    if (doc) {
      doc.title = validated.title;
      doc.content = validated.content;
      doc.updatedAt = new Date();
      await doc.save();
      return res.status(200).json({ message: "About Us updated", data: doc });
    }

    doc = await AboutUs.create(validated);
    return res.status(201).json({ message: "About Us created", data: doc });
  } catch (error: any) {
    return res.status(400).json({ message: error.errors || error.message });
  }
};

export const getAboutUs = async (_req: Request, res: Response) => {
  try {
    const doc = await AboutUs.findOne();
    if (!doc) return res.status(404).json({ message: "No About Us found" });
    return res.status(200).json({ data: doc });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

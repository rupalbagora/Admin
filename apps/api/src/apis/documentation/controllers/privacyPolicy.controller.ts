import { Request, Response } from "express";
import { PrivacyPolicy } from "../models/privacyPolicy.model";
import { privacyPolicySchema } from "../validators/privacyPolicy.validator";

export const createOrUpdatePrivacy = async (req: Request, res: Response) => {
  try {
    const validated = privacyPolicySchema.parse({
      title: req.body.title,
      content: req.body.content,
    });

    let doc = await PrivacyPolicy.findOne();
    if (doc) {
      doc.title = validated.title;
      doc.content = validated.content;
      await doc.save();
      return res.status(200).json({ message: "Privacy Policy updated", data: doc });
    }

    doc = await PrivacyPolicy.create(validated);
    return res.status(201).json({ message: "Privacy Policy created", data: doc });
  } catch (error: any) {
    return res.status(400).json({ message: error.errors || error.message });
  }
};

export const getPrivacy = async (_req: Request, res: Response) => {
  try {
    const doc = await PrivacyPolicy.findOne();
    if (!doc) return res.status(404).json({ message: "No Privacy Policy found" });
    return res.status(200).json({ data: doc });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

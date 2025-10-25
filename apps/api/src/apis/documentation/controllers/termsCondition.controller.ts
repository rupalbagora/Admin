import { Request, Response } from "express";
import { TermsCondition } from "../models/termsCondition.model";
import { termsConditionSchema } from "../validators/termsCondition.validator";

export const createOrUpdateTerms = async (req: Request, res: Response) => {
  try {
    const validated = termsConditionSchema.parse({
      title: req.body.title,
      content: req.body.content,
    });

    let doc = await TermsCondition.findOne();
    if (doc) {
      doc.title = validated.title;
      doc.content = validated.content;
      await doc.save();
      return res.status(200).json({ message: "Terms updated", data: doc });
    }

    doc = await TermsCondition.create(validated);
    return res.status(201).json({ message: "Terms created", data: doc });
  } catch (error: any) {
    return res.status(400).json({ message: error.errors || error.message });
  }
};

export const getTerms = async (_req: Request, res: Response) => {
  try {
    const doc = await TermsCondition.findOne();
    if (!doc) return res.status(404).json({ message: "No Terms & Conditions found" });
    return res.status(200).json({ data: doc });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

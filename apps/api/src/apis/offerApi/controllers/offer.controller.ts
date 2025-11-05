import { Request, Response } from "express";
import OfferService from "../services/offer.services";
import { CreateOfferDto } from "../dtos/offer.dto";
import fs from "fs";
import path from "path";

export const createOffer = async (req: Request, res: Response) => {
  const customReq = req as unknown as {
    file?: Express.Multer.File;
    user?: { _id: string };
  };
  
  try {
    const { title, discount, date, description }: CreateOfferDto = req.body;
    const addedBy = customReq.user?._id;

    if (!addedBy)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    if (!customReq.file)
      return res
        .status(400)
        .json({ success: false, message: "Image is required!" });

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${customReq.file.filename}`;

    const newOffer = await OfferService.create({
      title,
      discount,
      date,
      description, 
      imageUrl,
      addedBy,
    });

    res
      .status(201)
      .json({ success: true, message: "Offer created successfully", data: newOffer });
  } catch (error) {
    console.error("Error creating offer:", error);
    res
      .status(500)
      .json({ success: false, error: (error as Error).message });
  }
};

export const getAllOffers = async (req: Request, res: Response) => {
  try {
    const offers = await OfferService.getAll();
    res.status(200).json({ success: true, data: offers });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: (error as Error).message });
  }
};

export const getOfferById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const offer = await OfferService.getById(id);
    if (!offer)
      return res.status(404).json({ success: false, message: "Offer not found" });
    res.status(200).json({ success: true, data: offer });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: (error as Error).message });
  }
};

export const updateOffer = async (req: Request, res: Response) => {
  const customReq = req as unknown as { file?: Express.Multer.File };
  try {
    const { id } = req.params;
    const existing = await OfferService.getById(id);
    if (!existing)
      return res.status(404).json({ success: false, message: "Offer not found" });

    let imageUrl = existing.imageUrl;
    if (customReq.file) {
      const oldFilePath = path.join(
        __dirname,
        "../../../../uploads/images",
        path.basename(existing.imageUrl)
      );
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);

      imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${customReq.file.filename}`;
    }

    const updated = await OfferService.updateById(id, {
      ...req.body, // ✅ includes description if sent
      imageUrl,
    });

    res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      data: updated,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: (error as Error).message });
  }
};

export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const offer = await OfferService.getById(id);
    if (!offer)
      return res.status(404).json({ success: false, message: "Offer not found" });

    const imagePath = path.join(
      __dirname,
      "../../../../uploads/images",
      path.basename(offer.imageUrl)
    );
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await OfferService.deleteById(id);
    res.status(200).json({ success: true, message: "Offer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: (error as Error).message });
  }
};

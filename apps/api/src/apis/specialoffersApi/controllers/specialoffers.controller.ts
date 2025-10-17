import { Request, Response } from "express";
import SpecialOfferService from "../services/specialoffers.services";
import { CreateSpecialOfferDto } from "../dtos/specialoffers.dtos";

// Create Special Offer
export const createSpecialOffer = async (req: Request, res: Response) => {
  const customReq = req as unknown as { file?: Express.Multer.File; user?: { _id: string } };

  try {
    const { tag }: CreateSpecialOfferDto = req.body;
    const addedBy = customReq.user?._id;

    if (!addedBy) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!customReq.file) {
      return res.status(400).json({ success: false, message: "Offer image is required!" });
    }

    const imageUrl = customReq.file.path;

    const newOffer = await SpecialOfferService.create({
      tag,
      imageUrl,
      addedBy,
    });

    res.status(201).json({
      success: true,
      message: "Special offer created successfully",
      data: newOffer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// Get All Special Offers
export const getAllSpecialOffers = async (req: Request, res: Response) => {
  try {
    const offers = await SpecialOfferService.getAll();
    res.status(200).json({ success: true, data: offers });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// Delete Special Offer
export const deleteSpecialOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await SpecialOfferService.deleteById(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Special offer not found" });
    }

    res.status(200).json({ success: true, message: "Special offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

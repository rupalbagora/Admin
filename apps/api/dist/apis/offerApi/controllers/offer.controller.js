import OfferService from "../services/offer.services.js";
import fs from "fs";
import path from "path";

// 🟢 Create Offer
export const createOffer = async (req, res) => {
  try {
    const { title, discount, date, description } = req.body;

    if (!req.file)
      return res.status(400).json({ success: false, message: "Image is required!" });

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;
    const gender = req.gender || "unisex"; // 👈 auto-detected from route

    const newOffer = await OfferService.create({
      title,
      discount,
      date,
      description,
      imageUrl,
      gender,
      addedBy: req.user?._id,
    });

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      data: newOffer,
    });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

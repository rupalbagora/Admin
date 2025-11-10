import { Request, Response } from "express";
import ProductService from "../services/product.services";
import { CreateProductDto } from "../dtos/product.dto";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// ✅ Create Product
export const createProduct = async (req: Request, res: Response) => {
  const customReq = req as unknown as {
    files?: {
      image?: Express.Multer.File[];
      icons?: Express.Multer.File[];
    };
    user?: { _id: string };
  };

  try {
    const { name, price, offer, rating, tag, description, reviews, gender }: CreateProductDto = req.body;

    // ✅ Convert addedBy to ObjectId if user exists
    const addedBy = customReq.user?._id ? new mongoose.Types.ObjectId(customReq.user._id) : undefined;

    if (!customReq.files?.image?.[0]) {
      return res.status(400).json({ success: false, message: "Main image is required!" });
    }

    const image = `${req.protocol}://${req.get("host")}/uploads/images/${customReq.files.image[0].filename}`;
    const icons =
      customReq.files?.icons?.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/icons/${file.filename}`
      ) || [];

    const product = await ProductService.create({
      name,
      price,
      offer,
      rating,
      tag,
      description,
      image,
      icons,
      reviews,
      gender,
      addedBy, // ✅ Properly typed
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// ✅ Get All Products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getAll();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// ✅ Get Product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.getById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// ✅ Update Product
export const updateProduct = async (req: Request, res: Response) => {
  const customReq = req as unknown as { file?: Express.Multer.File };

  try {
    const { id } = req.params;
    const existing = await ProductService.getById(id);
    if (!existing)
      return res.status(404).json({ success: false, message: "Product not found" });

    let image = existing.image;

    if (customReq.file) {
      const oldPath = path.join(__dirname, "../../../../uploads/images", path.basename(existing.image));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      image = `${req.protocol}://${req.get("host")}/uploads/images/${customReq.file.filename}`;
    }

    // ✅ Destructure gender from body and keep existing if not provided
    const { gender, ...rest } = req.body;

    const updated = await ProductService.updateById(id, {
      ...rest,
      image,
      gender: gender ?? existing.gender,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getById(id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    // ✅ Delete main image file
    const imgPath = path.join(__dirname, "../../../../uploads/images", path.basename(product.image));
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    await ProductService.deleteById(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

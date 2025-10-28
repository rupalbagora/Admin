import { Request, Response } from "express";
import ProductService from "../services/product.services";
import { CreateProductDto } from "../dtos/product.dto";
import fs from "fs";
import path from "path";

export const createProduct = async (req: Request, res: Response) => {
  const customReq = req as unknown as { file?: Express.Multer.File; user?: { _id: string } };

  try {
    const { name, price, offer, rating, tag }: CreateProductDto = req.body;
    const addedBy = customReq.user?._id;

    if (!customReq.file)
      return res.status(400).json({ success: false, message: "Image is required!" });

    const image = `${req.protocol}://${req.get("host")}/uploads/images/${customReq.file.filename}`;

    const product = await ProductService.create({
      name,
      price,
      offer,
      rating,
      tag,
      image,
      
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

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getAll();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

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

    const updated = await ProductService.updateById(id, {
      ...req.body,
      image,
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

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getById(id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    const imgPath = path.join(__dirname, "../../../../uploads/images", path.basename(product.image));
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    await ProductService.deleteById(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

import { Request, Response } from "express";
import ProductPackageService from "../services/productPackage.services";

export const createProductPackage = async (req: Request, res: Response) => {
  try {
    const addedBy = (req as any).user._id;
    const file = req.file as Express.Multer.File;

    const {
      name,
      price,
      products,
      tagline,
      review,
      items,
      offers,
      usage,
      gender 
    } = req.body;

    // ✅ Create image URL
    let imageUrl = "";
    if (file) {
      const baseUrl = process.env.URL || `${req.protocol}://${req.get("host")}`;
      imageUrl = `${baseUrl}/uploads/images/${file.filename}`;
    }

    const newPackage = await ProductPackageService.create({
      name,
      price: Number(price),
      products: Array.isArray(products) ? products : [products],
      tagline,
      review: review || "No review yet",
      items: Array.isArray(items) ? items : [items],
      offers: offers || "",
      usage,
      image: imageUrl,
      gender, 
      addedBy,
    });

    res.status(201).json({ 
      success: true, 
      message: "Product package created successfully",
      data: newPackage 
    });
  } catch (error) {
    console.error("Create package error:", error);
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};

export const getProductPackages = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const packages = await ProductPackageService.getAll(userId);

    res.status(200).json({ 
      success: true, 
      data: packages 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};

export const getProductPackageById = async (req: Request, res: Response) => {
  try {
    const pkg = await ProductPackageService.getById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ 
        success: false, 
        message: "Product package not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: pkg 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};

export const updateProductPackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const file = req.file as Express.Multer.File;

    const updateData: any = { ...req.body };

    // ✅ Handle image update
    if (file) {
      const baseUrl = process.env.URL || `${req.protocol}://${req.get("host")}`;
      updateData.image = `${baseUrl}/uploads/images/${file.filename}`;
    }

    // ✅ Convert to arrays if needed
    if (req.body.products) {
      updateData.products = typeof req.body.products === 'string' 
        ? [req.body.products] 
        : req.body.products;
    }
    
    if (req.body.items) {
      updateData.items = typeof req.body.items === 'string' 
        ? [req.body.items] 
        : req.body.items;
    }

    const updated = await ProductPackageService.updateById(id, updateData);
    
    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        message: "Product package not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Product package updated successfully",
      data: updated 
    });
  } catch (error) {
    console.error("Update package error:", error);
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};

export const deleteProductPackage = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductPackageService.deleteById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ 
        success: false, 
        message: "Product package not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Product package deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};
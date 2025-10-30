import { Request, Response } from "express";
import {
  createCart as createCartService,
  getAllCarts,
  getCartById,
  updateCartById,
  deleteCartById,
} from "../services/cart.service";

// ✅ Create a cart item
export const createCart = async (req: Request, res: Response) => {
  try {
    // Get uploaded image URL or use from body (HTTP)
    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`
      : req.body.image;

    const cartData = { ...req.body, image };
    const newCart = await createCartService(cartData);
    res.status(201).json({
      success: true,
      message: "Cart item added successfully",
      data: newCart,
    });
  } catch (error) {
    console.error("Create cart error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add item",
      error,
    });
  }
};

// ✅ Get all cart items
export const getAllCartItems = async (_req: Request, res: Response) => {
  try {
    const carts = await getAllCarts();
    res.status(200).json({ success: true, data: carts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart items",
      error,
    });
  }
};

// ✅ Get cart by ID
export const getCartItemById = async (req: Request, res: Response) => {
  try {
    const cart = await getCartById(req.params.id);
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error,
    });
  }
};

// ✅ Update cart
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`
      : req.body.image;

    const updated = await updateCartById(req.params.id, { ...req.body, image });
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cart",
      error,
    });
  }
};

// ✅ Delete cart
export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteCartById(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    res
      .status(200)
      .json({ success: true, message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete cart",
      error,
    });
  }
};

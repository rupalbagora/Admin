import Cart from "../models/cart.model";
import { ICart } from "../types/cart.types";

// ✅ Create a cart item
export const createCart = async (data: Partial<ICart>) => {
  const cartItem = new Cart(data);
  return await cartItem.save();
};

// ✅ Get all cart items
export const getAllCarts = async () => {
  return await Cart.find().sort({ createdAt: -1 });
};

// ✅ Get a cart item by ID
export const getCartById = async (id: string) => {
  return await Cart.findById(id);
};

// ✅ Update a cart item
export const updateCartById = async (id: string, data: Partial<ICart>) => {
  return await Cart.findByIdAndUpdate(id, data, { new: true });
};

// ✅ Delete a cart item
export const deleteCartById = async (id: string) => {
  return await Cart.findByIdAndDelete(id);
};

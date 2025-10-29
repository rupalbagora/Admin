import mongoose, { Schema } from "mongoose";
import { ICartDocument } from "../types/cart.types";

const cartSchema = new Schema<ICartDocument>(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }, // stored as HTTP URL
  },
  { timestamps: true }
);

export default mongoose.model<ICartDocument>("Cart", cartSchema);

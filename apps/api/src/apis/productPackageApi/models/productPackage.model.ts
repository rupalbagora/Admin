import { Schema, model } from "mongoose";
import { IProductPackage } from "../types/productPackage.types";

const productPackageSchema = new Schema<IProductPackage>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    products: [{ type: String, required: true }],
    tagline: { type: String, required: true },
    rating: { type: Number, default: 0 },
    description: { type: String, required: true },
    discount: { type: String },
    items: [{ type: String, required: true }],
    usageInstructions: { type: String, required: true },
    stock: { type: Number, required: true },

    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IProductPackage>("ProductPackage", productPackageSchema);

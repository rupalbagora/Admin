// models/packages.models.ts
import { Schema, model } from "mongoose";
import { IPackage } from "../types/packages.types";

const packageSchema = new Schema<IPackage>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    services: [{ type: String, required: true }],
    about: { type: String, required: true },
    discount: { type: String },
    serviceList: [{ type: String, required: true }],
    ratings: { type: Number, default: 0 },
    category: { type: String, enum: ["male", "female"], required: true },

    // 👇 NEW FIELD
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IPackage>("Package", packageSchema);

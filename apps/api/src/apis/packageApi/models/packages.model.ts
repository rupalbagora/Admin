import { Schema, model } from "mongoose";

const packageSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    services: { type: String, required: true },
    about: { type: String, required: true },
    image: { type: String, required: true },
    discount: { type: String },
    review: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    serviceList: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Package", packageSchema);

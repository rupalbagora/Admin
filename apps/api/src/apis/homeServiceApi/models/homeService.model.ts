import { Schema, model } from "mongoose";
import { IHomeService } from "../types/homeService.types";

const homeServiceSchema = new Schema<IHomeService>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IHomeService>("HomeService", homeServiceSchema);

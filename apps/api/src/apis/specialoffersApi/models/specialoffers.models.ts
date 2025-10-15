import { Schema, model } from "mongoose";
import { ISpecialOffer } from "../types/specialoffers.types";

const specialOfferSchema = new Schema<ISpecialOffer>(
  {
    tag: { type: String, required: true },
    image: { type: String, required: true },
    // Optional: track who added the offer
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model<ISpecialOffer>("SpecialOffer", specialOfferSchema);

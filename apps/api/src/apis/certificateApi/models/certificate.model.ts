import { Schema, model, Document } from "mongoose";
import {ICertificate} from "../types/certificate.types"
const certificateSchema = new Schema<ICertificate>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Multer saves the file, we save path
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<ICertificate>("Certificate", certificateSchema);

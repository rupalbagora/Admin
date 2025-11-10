import mongoose, { Schema, Document } from "mongoose";

export interface IProductPackage extends Document {
  name: string;
  price: number;
  review?: string;
  description?: string;
  offers?: string;
  items: string[];
  usage?: string;
  image?: string;
  gender?: string;
  addedBy: mongoose.Types.ObjectId;
}

const productPackageSchema = new Schema<IProductPackage>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    review: { type: String },
    description: { type: String },
    offers: { type: String },
    items: [{ type: String, required: true }],
    usage: { type: String },
    image: { type: String },
    gender: { type: String }, 
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProductPackage>(
  "ProductPackage",
  productPackageSchema
);

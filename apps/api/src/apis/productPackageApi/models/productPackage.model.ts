import { Schema, model, Document, Types } from "mongoose";

export interface IProductPackage extends Document {
  name: string;
  price: number;
  products: string[];
  tagline: string;
  review: string;
  items: string[];
  offers: string;
  usage: string;
  image: string;
  gender: string; 
  addedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productPackageSchema = new Schema<IProductPackage>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    products: [{ type: String, required: true }],
    tagline: { type: String, required: true },
    review: { type: String, required: true },
    items: [{ type: String, required: true }],
    offers: { type: String },
    usage: { type: String, required: true },
    image: { type: String },
    gender: { type: String }, 
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IProductPackage>("ProductPackage", productPackageSchema);
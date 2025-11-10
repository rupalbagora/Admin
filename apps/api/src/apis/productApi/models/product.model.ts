import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: string;
  offer?: string;
  rating?: string;
  tag?: string;
  description?: string;
  image: string;
  addedBy?: mongoose.Types.ObjectId;
  icons?: string[];
  reviews?: string[];
  gender?: string; 
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    offer: { type: String },
    rating: { type: String },
    tag: { type: String },
    description: { type: String },
    image: { type: String, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
    icons: [{ type: String }],
    reviews: [{ type: String }],
    gender: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);

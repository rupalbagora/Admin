import { Document, Types } from "mongoose";

export interface ICart {
  userId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string; // HTTP URL
}

export interface ICartDocument extends ICart, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

import { Document, Types } from "mongoose";

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
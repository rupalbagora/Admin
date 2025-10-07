// types/packages.types.ts
import { Document, Types } from "mongoose";

export interface IPackage extends Document {
  title: string;
  price: number;
  services: string[];
  about: string;
  discount?: string;
  serviceList: string[];
  ratings?: number;
  category: "male" | "female";
  addedBy: Types.ObjectId; // 👈 NEW
  createdAt: Date;
  updatedAt: Date;
}

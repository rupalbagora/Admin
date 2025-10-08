import { Document, Types } from "mongoose";

export interface IProductPackage extends Document {
  name: string; // "Glow & Go Pack"
  price: number; // 599
  products: string[]; // ["Facewash", "Bleach"]
  tagline: string; // "Quick glow for party"
  rating?: number; // 4.7
  description: string; // "Complete hair nourishment in one kit"
  discount?: string; // "Save 300rs on combo purchase"
  items: string[]; // ["Shampoo (250ml)", "Conditioner (250ml)", "Hairmask (200g)"]
  usageInstructions: string; // "Use shampoo & conditioner twice weekly..."
  stock: number; // inventory count
  addedBy: Types.ObjectId; // who added (admin)
  createdAt: Date;
  updatedAt: Date;
}

import { Document } from "mongoose";

export interface IPackage extends Document {
  title: string;
  price: string;
  services: string;
  about: string;
  image: string;
  discount?: string;
  review?: number;
  rating?: number;
  serviceList: string[];
  createdAt: Date;
  updatedAt: Date;
}

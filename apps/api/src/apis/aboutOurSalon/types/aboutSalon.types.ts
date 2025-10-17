// types/aboutSalon.types.ts
import { Types, Document } from "mongoose";

export interface IAboutSalon extends Document {
  title: string;
  description: string;
  image: string;
  addedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

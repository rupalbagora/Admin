// src/apis/ourserviceApi/types/ourservice.types.ts
import { Document, Types } from "mongoose";

export interface IOurService extends Document {
  serviceName: string;
  price: number;
  title: string;
  highlights: string[];
  extra: { name: string; price: number }[];
  imageUrl: string;
  addedBy: Types.ObjectId;
}

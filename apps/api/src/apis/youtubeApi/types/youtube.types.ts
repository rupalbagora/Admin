import mongoose from "mongoose";
import { Types, Document } from "mongoose";
export interface IYoutubeLink extends Document {
  youtubeLinks: string[];
  date: Date;
  addedBy: Types.ObjectId; // admin who created it
  createdAt: Date;
  updatedAt: Date;
}

import { Document, Types } from "mongoose";

export interface IYoutubeVideo extends Document {
  title: string;
  videoUrl?: string; 
  videoPath?: string; 
  uploadedAt: Date;
  addedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
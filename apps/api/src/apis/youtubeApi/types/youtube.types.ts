import { Document, Types } from "mongoose";

export interface IYoutubeVideo extends Document {
  title: string;
  videoUrl?: string; // Optional if we upload file
  videoPath?: string; // Path to uploaded file
  uploadedAt: Date;
  addedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

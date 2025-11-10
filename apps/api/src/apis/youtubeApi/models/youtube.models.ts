import { Schema, model } from "mongoose";
import { IYoutubeVideo } from "../types/youtube.types";

const youtubeSchema = new Schema<IYoutubeVideo>(
  {
    title: { type: String, required: true },
    videoUrl: { type: String }, 
    videoPath: { type: String }, 
    uploadedAt: { type: Date, default: Date.now },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IYoutubeVideo>("YoutubeVideo", youtubeSchema);
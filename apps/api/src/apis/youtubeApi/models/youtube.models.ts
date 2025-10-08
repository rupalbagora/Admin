import { Schema, model } from "mongoose";
import { IYoutubeVideo } from "../types/youtube.types";

const youtubeSchema = new Schema<IYoutubeVideo>(
  {
    title: { type: String, required: true },

    // Either a YouTube URL or a local file path
    videoUrl: { type: String }, // For YouTube links
    videoPath: { type: String }, // For uploaded files

    uploadedAt: { type: Date, default: Date.now },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IYoutubeVideo>("YoutubeVideo", youtubeSchema);

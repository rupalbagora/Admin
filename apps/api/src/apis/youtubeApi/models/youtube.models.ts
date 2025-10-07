import { Schema, model } from "mongoose";
import { IYoutubeLink } from "../types/youtube.types";
const youtubeSchema = new Schema<IYoutubeLink>(
  {
    youtubeLinks: [{ type: String, required: true }],
    date: { type: Date, default: Date.now },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IYoutubeLink>("YoutubeLink", youtubeSchema);

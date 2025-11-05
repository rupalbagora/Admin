import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: String,
  discount: Number,
  date: String,
  description: String,
  imageUrl: String,
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Offer", offerSchema);

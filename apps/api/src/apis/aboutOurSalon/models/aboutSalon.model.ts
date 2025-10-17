import { Schema, model, Document, Types } from "mongoose";

export interface IAboutSalon extends Document {
  title: string;
  description: string;
  image: string;       // Multer uploaded image path
  addedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSalonSchema = new Schema<IAboutSalon>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IAboutSalon>("AboutSalon", AboutSalonSchema);

import { Document, Types } from "mongoose";

export interface ISpecialOffer extends Document {
  tag: string;
  image: string;
  addedBy: Types.ObjectId;
}

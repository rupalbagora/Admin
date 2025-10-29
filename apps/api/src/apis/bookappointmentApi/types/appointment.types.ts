import { Document, Types } from "mongoose";

export interface IAppointment extends Document {
  image: string;
  date: string;
  time: string;
  name: string;
  title: string;
  price: number;
  bookedBy?: Types.ObjectId;
}

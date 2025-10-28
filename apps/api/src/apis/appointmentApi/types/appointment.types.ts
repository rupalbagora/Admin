import { Document } from "mongoose";

export interface IAppointment extends Document {
  date: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
}

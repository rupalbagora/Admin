import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  date: string;
  time: string;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);

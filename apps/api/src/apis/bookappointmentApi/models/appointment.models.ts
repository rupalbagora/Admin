import { Schema, model } from "mongoose";
import { IAppointment } from "../types/appointment.types";

const appointmentSchema = new Schema<IAppointment>(
  {
    image: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    bookedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model<IAppointment>("Appointment", appointmentSchema);

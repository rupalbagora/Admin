import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
	date?: string;
	time?: string;
	appointmentStatus?: "Pending" | "Accepted";
	userId?: string;
	appointmentCode?: string;
}

const AppointmentSchema = new Schema<IAppointment>(
	{
		date: { type: String, required: true },
		time: { type: String, required: true },
		appointmentStatus: {
			type: String,
			enum: ["Pending", "Accepted"],
			default: "Pending",
		},
		userId: { type: String },
		appointmentCode: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);

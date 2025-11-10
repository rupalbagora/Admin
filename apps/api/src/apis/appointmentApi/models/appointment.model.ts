import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
	date?: string;
	time?: string;
	appointmentStatus?: "Pending" | "Accepted";
	userId?: string;
	appointmentCode?: string;
	chairNo?: number;
	fromDateTime?: Date;
	toDateTime?: Date;
	email?: string;
	services?: string[];
	subAdminId?: string | mongoose.Types.ObjectId;
}

const AppointmentSchema = new Schema<IAppointment>(
	{
		date: { type: String, required: true },
		time: { type: String, required: true },
		appointmentStatus: {
			type: String,
			enum: ["Pending", "Accepted", "Rescheduled", "Cancelled"],
			default: "Pending",
		},
		userId: { type: String },
		appointmentCode: { type: String },
		chairNo: { type: Number },
		fromDateTime: { type: Date },
		toDateTime: { type: Date },
		email: { type: String },
		services: [{ type: String }],
		subAdminId: { type: mongoose.Schema.Types.ObjectId },
	},
	{ timestamps: true }
);

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);

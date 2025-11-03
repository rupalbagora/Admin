import Appointment, { IAppointment } from "../models/appointment.model";
import { nanoid } from "nanoid";
class AppointmentService {
	async create(
		data: Partial<IAppointment>,
		userId: string
	): Promise<IAppointment> {
		const appointmentCode = `NAU${nanoid(4).toUpperCase()}`;
		console.log(
			"🚀 ~ AppointmentService ~ create ~ appointmentCode:",
			appointmentCode
		);
		const appointment = new Appointment({ ...data, userId, appointmentCode });
		return appointment.save();
	}

	async getAll(): Promise<IAppointment[]> {
		return Appointment.find().sort({ createdAt: -1 });
	}

	async getById(id: string): Promise<IAppointment | null> {
		return Appointment.findById(id);
	}

	async updateById(
		id: string,
		data: Partial<IAppointment>
	): Promise<IAppointment | null> {
		console.log("data", data);
		return Appointment.findByIdAndUpdate(id, data, { new: true });
	}

	async deleteById(id: string): Promise<IAppointment | null> {
		return Appointment.findByIdAndDelete(id);
	}
}

export default new AppointmentService();

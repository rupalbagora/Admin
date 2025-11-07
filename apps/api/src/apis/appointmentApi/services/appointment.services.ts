import { InAppNotifications } from "../../inAppNotification/models/inAppNotification.model";
import ourserviceModel from "../../ourserviceApi/models/ourservice.model";
import Appointment, { IAppointment } from "../models/appointment.model";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

class AppointmentService {
	async create(
		data: Partial<IAppointment>,
		userId: string,
		email: string
	): Promise<IAppointment> {
		const appointmentCode = `NAU${nanoid(4).toUpperCase()}`;

		const servicesArray = data.services
			? Array.isArray(data.services)
				? data.services
				: JSON.parse(data.services)
			: [];
		const matchedServices = await ourserviceModel.find({
			serviceName: { $in: servicesArray },
		});
		const totalEstimatedTime = matchedServices.reduce(
			(sum, s) => sum + Number(s.estimatedTime || 0),
			10
		);

		// parse IST time properly
		const from = new Date(`${data.date}T${data.time}:00+05:30`);
		const to = new Date(from);
		to.setMinutes(to.getMinutes() + totalEstimatedTime);

		// format to ISO (stored in UTC internally)
		const formattedFromDateTime = from.toISOString();
		const formattedToDateTime = to.toISOString();

		const existingAppointment = await Appointment.findOne({
			appointmentStatus: "Pending",
			chairNo: data.chairNo,
			$and: [
				{ fromDateTime: { $lte: to } }, // existing starts before new ends
				{ toDateTime: { $gte: from } }, // existing ends after new starts
			],
		});

		if (existingAppointment) {
			throw new Error("An appointment already exists during this time range.");
		}

		const appointment = new Appointment({
			...data,
			fromDateTime: formattedFromDateTime,
			toDateTime: formattedToDateTime,
			email,
			userId,
			appointmentCode,
		});

		await InAppNotifications.create({
			message: `Your appointment has been booked for ${dayjs(
				formattedFromDateTime
			)
				.tz("Asia/Kolkata")
				.format("DD-MMM-YY")} at ${dayjs(formattedFromDateTime)
				.tz("Asia/Kolkata")
				.format("hh:mm A")}.`,
			userId,
		});
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
		const appointmentCode = `NAU${nanoid(4).toUpperCase()}`;
		const servicesArray = data.services
			? Array.isArray(data.services)
				? data.services
				: JSON.parse(data.services)
			: [];
		const matchedServices = await ourserviceModel.find({
			serviceName: { $in: servicesArray },
		});
		const totalEstimatedTime = matchedServices.reduce(
			(sum, s) => sum + Number(s.estimatedTime || 0),
			10
		);

		// parse IST time properly
		const from = new Date(`${data.date}T${data.time}:00+05:30`);
		const to = new Date(from);
		to.setMinutes(to.getMinutes() + totalEstimatedTime);

		// format to ISO (stored in UTC internally)
		const formattedFromDateTime = from.toISOString();
		const formattedToDateTime = to.toISOString();
		return Appointment.findByIdAndUpdate(
			id,
			{
				...data,
				fromDateTime: formattedFromDateTime,
				toDateTime: formattedToDateTime,
				appointmentStatus: "Pending",
				appointmentCode: appointmentCode,
			},
			{ new: true }
		);
	}

	async deleteById(id: string): Promise<IAppointment | null> {
		return Appointment.findByIdAndDelete(id);
	}
}

export default new AppointmentService();

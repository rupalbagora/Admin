import { Request, Response } from "express";
import appointmentService from "../services/appointment.services";
import appointmentModel from "../models/appointment.model";
import User from "../../userApi/models/User.model";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { InAppNotifications } from "../../inAppNotification/models/inAppNotification.model";

dayjs.extend(utc);
dayjs.extend(timezone);
export const createAppointment = async (req: Request, res: Response) => {
	try {
		const userId = String(req.user._id);
		const email = (await User.findById(userId))?.email;
		const data = await appointmentService.create(req.body, userId, email!);
		res.status(201).json({
			success: true,
			message: "Appointment created successfully",
			data,
		});
	} catch (error: any) {
		res
			.status(500)
			.json({ success: false, error: error.message || "Something went wrong" });
	}
};
export const getAppointments = async (req: Request, res: Response) => {
	try {
		const data = await appointmentService.getAll();
		const formattedAppointments = data.map((item) => ({
			...item.toObject(),
			fromDateTime: dayjs(item.fromDateTime)
				.tz("Asia/Kolkata")
				.format("DD-MM-YYYY hh:mm A"),
			toDateTime: dayjs(item.toDateTime)
				.tz("Asia/Kolkata")
				.format("DD-MM-YYYY hh:mm A"),
		}));
		res.status(200).json({ success: true, data: formattedAppointments });
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
};

export const getAppointmentById = async (req: Request, res: Response) => {
	try {
		const data = await appointmentService.getById(req.params.id);
		if (!data)
			return res
				.status(404)
				.json({ success: false, message: "Appointment not found" });

		// const fromIST = new Date(data.fromDateTime ?? "").toLocaleString("en-In", {
		// 	timeZone: "Asia/Kolkata",
		// });

		// const toIST = new Date(data.toDateTime ?? "").toLocaleString("en-In", {
		// 	timeZone: "Asia/Kolkata",
		// });

		const fromIST = dayjs(data.fromDateTime ?? "")
			.tz("Asia/Kolkata")
			.format("DD-MM-YYYY hh:mm A");
		const toIST = dayjs(data.toDateTime ?? "")
			.tz("Asia/Kolkata")
			.format("DD-MM-YYYY hh:mm A");
		res.status(200).json({
			success: true,
			...data.toObject(),
			fromDateTime: fromIST,
			toDateTime: toIST,
		});
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
};

export const updateAppointment = async (req: Request, res: Response) => {
	try {
		const data = await appointmentService.updateById(req.params.id, req.body);
		if (!data)
			return res
				.status(404)
				.json({ success: false, message: "Appointment not found" });
		res.status(200).json({
			success: true,
			message: "Appointment updated successfully",
			data,
		});
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
};

export const deleteAppointment = async (req: Request, res: Response) => {
	try {
		const data = await appointmentService.deleteById(req.params.id);
		if (!data)
			return res
				.status(404)
				.json({ success: false, message: "Appointment not found" });
		res
			.status(200)
			.json({ success: true, message: "Appointment deleted successfully" });
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
};

export const getAppointmentsByUserId = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const appointments = await appointmentModel.find({ userId });
		if (appointments.length === 0) {
			return res
				.status(204)
				.json({ success: true, message: "No Appointment Booked Yet!!" });
		}
		return res.status(200).json({
			success: true,
			message: "Appointments fetched successfully",
			data: appointments,
		});
	} catch (error) {
		res.status(500).json({ success: false, error: (error as Error).message });
	}
};

// verify appointment code

export const verifyAppointmentCode = async (req: Request, res: Response) => {
	try {
		const { appointmentCode, email } = req.body;
		const appointment = await appointmentModel.findOneAndUpdate(
			{
				appointmentCode,
				email,
			},
			{ appointmentStatus: "Accepted" }
		);
		if (appointment) {
			await InAppNotifications.create({
				message: `Your appointment has been confirmed for ${dayjs(
					appointment.fromDateTime
				).format("DD-MMM-YY")} at ${dayjs(appointment.fromDateTime)
					.tz("Asia/Kolkata")
					.format("hh:mm A")}.`,
				userId: req.user._id,
			});

			return res
				.status(200)
				.json({ success: true, message: "Appointment Confirmed!!" });
		} else {
			return res
				.status(403)
				.json({ success: false, message: "Incorrect Credentials" });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

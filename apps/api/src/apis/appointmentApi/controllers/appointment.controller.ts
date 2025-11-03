import { Request, Response } from "express";
import appointmentService from "../services/appointment.services";
import appointmentModel from "../models/appointment.model";
export const createAppointment = async (req: Request, res: Response) => {
	try {
		const userId = String(req.user._id);
		const data = await appointmentService.create(req.body, userId);
		res.status(201).json({
			success: true,
			message: "Appointment created successfully",
			data,
		});
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
};

export const getAppointments = async (req: Request, res: Response) => {
	try {
		const data = await appointmentService.getAll();
		res.status(200).json({ success: true, data });
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
		res.status(200).json({ success: true, data });
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

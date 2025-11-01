import { Request, Response } from "express";
import appointmentService from "../services/appointment.services";

export const createAppointment = async (req: Request, res: Response) => {
	try {
		const data = await appointmentService.create(req.body);
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

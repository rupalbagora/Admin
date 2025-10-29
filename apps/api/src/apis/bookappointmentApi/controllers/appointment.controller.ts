import { Request, Response } from "express";
import AppointmentService from "../services/appointment.services";
import { CreateAppointmentDto } from "../dtos/appointment.dtos";

// 1️⃣ Create Appointment
export const createAppointment = async (req: Request, res: Response) => {
  const customReq = req as unknown as { file?: Express.Multer.File; user?: { _id: string } };
  try {
    const { date, time, name, title, price }: CreateAppointmentDto = req.body;
    const bookedBy = customReq.user?._id;

    if (!date || !time || !name || !title || !price) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    if (!customReq.file) {
      return res.status(400).json({ success: false, message: "Image is required!" });
    }

    const imageUrl = customReq.file.path;

    const newAppointment = await AppointmentService.create({
      image: imageUrl,
      date,
      time,
      name,
      title,
      price,
     
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      data: newAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// 2️⃣ Get All Appointments
export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await AppointmentService.getAll();
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// 3️⃣ Get Appointment by ID
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await AppointmentService.getById(id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// 4️⃣ Update Appointment
export const updateAppointment = async (req: Request, res: Response) => {
  const customReq = req as unknown as { file?: Express.Multer.File };
  try {
    const { id } = req.params;
    const { date, time, name, title, price } = req.body;

    const updateData: any = { date, time, name, title, price };
    if (customReq.file) updateData.image = customReq.file.path;

    const updatedAppointment = await AppointmentService.updateById(id, updateData);

    if (!updatedAppointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// 5️⃣ Delete Appointment
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await AppointmentService.deleteById(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

import { IAppointment } from "../types/appointment.types";
import Appointment from "../models/appointment.models";

class AppointmentService {
  // 🟢 Create Appointment
  async create(data: Partial<IAppointment>): Promise<IAppointment> {
    const newAppointment = new Appointment(data);
    return newAppointment.save();
  }

  // 🟠 Get All Appointments
  async getAll(): Promise<IAppointment[]> {
    return Appointment.find()
      .populate("bookedBy", "name email")
      .sort({ createdAt: -1 });
  }

  // 🔵 Get Appointment by ID
  async getById(id: string): Promise<IAppointment | null> {
    return Appointment.findById(id).populate("bookedBy", "name email");
  }

  // 🟣 Update Appointment by ID
  async updateById(id: string, data: Partial<IAppointment>): Promise<IAppointment | null> {
    return Appointment.findByIdAndUpdate(id, data, { new: true });
  }

  // 🔴 Delete Appointment by ID
  async deleteById(id: string): Promise<IAppointment | null> {
    return Appointment.findByIdAndDelete(id);
  }
}

export default new AppointmentService();

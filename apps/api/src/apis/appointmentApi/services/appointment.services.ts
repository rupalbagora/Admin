import Appointment, { IAppointment } from "../models/appointment.model";

class AppointmentService {
  async create(data: Partial<IAppointment>): Promise<IAppointment> {
    const appointment = new Appointment(data);
    return appointment.save();
  }

  async getAll(): Promise<IAppointment[]> {
    return Appointment.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IAppointment | null> {
    return Appointment.findById(id);
  }

  async updateById(id: string, data: Partial<IAppointment>): Promise<IAppointment | null> {
    return Appointment.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IAppointment | null> {
    return Appointment.findByIdAndDelete(id);
  }
}

export default new AppointmentService();

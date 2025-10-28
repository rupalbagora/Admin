export interface CreateAppointmentDto {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

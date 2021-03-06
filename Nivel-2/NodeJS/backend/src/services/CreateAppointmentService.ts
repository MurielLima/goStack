import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentRepository";
import appointmentsRouter from "../routes/appointments.routes";

import { startOfHour } from "date-fns";

interface RequestDTO {
  date: Date;
  provider: string;
}
class CreateAppointmentService {
  appointmentsRepository: AppointmentsRepository;
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }
  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      date
    );
    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}
export default CreateAppointmentService;

import Appointment from "../models/Appointment";
import { parse, isEqual } from "date-fns";
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}
class AppointmentsRepository {
  private appointments: Array<Appointment>;

  constructor() {
    this.appointments = [];
  }
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);
    return appointment;
  }
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );
    return findAppointment || null;
  }
  public all(): Array<Appointment> {
    return this.appointments;
  }
}

export default AppointmentsRepository;

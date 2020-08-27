import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentRepository";
import { getCustomRepository } from 'typeorm';
import { uuid } from 'uuidv4';

import { startOfHour } from "date-fns";

interface RequestDTO {
  date: Date;
  provider_id: uuid;
}
class CreateAppointmentService {
  public async execute({ date, provider_id }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );
    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;

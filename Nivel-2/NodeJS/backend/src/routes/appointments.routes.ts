import { Router } from "express";
import { uuid, isUuid } from "uuidv4";
import { startOfHour, parseISO, isEqual } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get("/", (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;
  try {
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository
    );
    const appointment = createAppointmentService.execute({
      date: parsedDate,
      provider,
    });
    return response.json(appointment);
  } catch(err) {
    return response.status(400).json({error:err.message});
  }
});
export default appointmentsRouter;

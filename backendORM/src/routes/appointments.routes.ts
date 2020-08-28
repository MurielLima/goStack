import { Router } from "express";
import { uuid, isUuid } from "uuidv4";
import { startOfHour, parseISO, isEqual } from "date-fns";
import { getCustomRepository } from 'typeorm';
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.get("/", async (request, response) => {
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
  const { provider, date } = request.body;
  try {
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();
    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id: provider,
    });
    return response.json(appointment);
  } catch(err) {
    return response.status(err.statusCode).json({error:err.message});
  }
});
export default appointmentsRouter;

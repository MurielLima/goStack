import { Router } from "express";
import AppointmentsRouter from "./appointments.routes";

const router = Router();

router.use("/appointments", AppointmentsRouter);

export default router;

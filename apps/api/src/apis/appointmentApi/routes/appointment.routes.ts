import { Router } from "express";
import {
	createAppointment,
	getAppointments,
	getAppointmentById,
	updateAppointment,
	deleteAppointment,
	getAppointmentsByUserId,
} from "../controllers/appointment.controller";
import { protect } from "../../userApi/middlewares/auth.middleware";

const router = Router();

router.post("/", protect, createAppointment);
router.get("/", getAppointments);
router.get("/fetch-by-userId/:userId", protect, getAppointmentsByUserId);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;

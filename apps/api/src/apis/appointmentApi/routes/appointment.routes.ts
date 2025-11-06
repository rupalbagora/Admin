import { Router } from "express";
import {
	createAppointment,
	getAppointments,
	getAppointmentById,
	updateAppointment,
	deleteAppointment,
	getAppointmentsByUserId,
	verifyAppointmentCode,
} from "../controllers/appointment.controller";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";

const router = Router();

router.post("/", protect, createAppointment);
router.get("/", getAppointments);
router.get("/fetch-by-userId/:userId", protect, getAppointmentsByUserId);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.post(
	"/verify-appointment",
	protect,
	authorizeRole("sub-admin"),
	verifyAppointmentCode
);

export default router;

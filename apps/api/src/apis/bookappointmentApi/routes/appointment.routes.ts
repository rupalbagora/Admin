import express from "express";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import upload from "../../mediaApi/services/multerConfig";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller";

const router = express.Router();

// 1️⃣ Create Appointment (Book)
router.post("/book", upload.single("image"), createAppointment);


// 2️⃣ Get All (Admin)
router.get("/", protect, authorizeRole("admin", "superadmin"), getAllAppointments);

// 3️⃣ Get by ID
router.get("/:id", protect, getAppointmentById);

// 4️⃣ Update Appointment
router.patch(
  "/:id",
  protect,
  upload.single("image"), // optional new image
  updateAppointment
);

// 5️⃣ Delete Appointment
router.delete("/:id", protect, authorizeRole("admin", "superadmin"), deleteAppointment);

export default router;

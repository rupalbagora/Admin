import { body } from "express-validator";

export const createAppointmentValidator = [
  body("date").notEmpty().withMessage("Date is required"),
  body("time").notEmpty().withMessage("Time is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
];

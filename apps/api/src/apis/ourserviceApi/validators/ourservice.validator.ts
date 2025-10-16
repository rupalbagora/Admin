// src/apis/ourserviceApi/validators/ourservice.validator.ts
import { body } from "express-validator";

export const createOurServiceValidator = [
  body("serviceName").notEmpty().withMessage("Service name is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("title").notEmpty().withMessage("Title is required"),
];

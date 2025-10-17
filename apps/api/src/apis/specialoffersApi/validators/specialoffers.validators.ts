import { body } from "express-validator";

export const createSpecialOfferValidator = [
  body("tag")
    .notEmpty()
    .withMessage("Tag is required")
    .isString()
    .withMessage("Tag must be a string"),
];

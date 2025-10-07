import { body } from "express-validator";

export const createYoutubeValidator = [
  body("title").isString().notEmpty().withMessage("Title is required"),

  body("videoUrl")
    .optional()
    .isURL()
    .withMessage("videoUrl must be a valid URL"),

  body("uploadedAt")
    .optional()
    .isISO8601()
    .withMessage("uploadedAt must be a valid date"),
];

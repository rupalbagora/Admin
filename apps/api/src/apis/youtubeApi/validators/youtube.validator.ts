// src/apis/youtubeApi/validators/youtube.validator.ts
import { body } from "express-validator";

export const createYoutubeValidator = [
  body("youtubeLinks")
    .isArray({ min: 1 })
    .withMessage("youtubeLinks must be an array with at least one link"),
  body("youtubeLinks.*")
    .isURL()
    .withMessage("Each youtube link must be a valid URL"),
  body("date").optional().isISO8601().withMessage("Date must be valid"),
];

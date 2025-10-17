"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createYoutubeValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createYoutubeValidator = [
    (0, express_validator_1.body)("title").isString().notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("videoUrl")
        .optional()
        .isURL()
        .withMessage("videoUrl must be a valid URL"),
    (0, express_validator_1.body)("uploadedAt")
        .optional()
        .isISO8601()
        .withMessage("uploadedAt must be a valid date"),
];

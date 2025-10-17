"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOurServiceValidator = void 0;
// src/apis/ourserviceApi/validators/ourservice.validator.ts
const express_validator_1 = require("express-validator");
exports.createOurServiceValidator = [
    (0, express_validator_1.body)("serviceName").notEmpty().withMessage("Service name is required"),
    (0, express_validator_1.body)("price").isNumeric().withMessage("Price must be a number"),
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpecialOfferValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createSpecialOfferValidator = [
    (0, express_validator_1.body)("tag")
        .notEmpty()
        .withMessage("Tag is required")
        .isString()
        .withMessage("Tag must be a string"),
];

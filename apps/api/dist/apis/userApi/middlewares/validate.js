"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validateLogin = void 0;
const express_validator_1 = require("express-validator");
exports.validateLogin = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Valid email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            {
                res.status(422).json({ errors: errors.array() });
                return;
            }
        }
        next();
    },
];
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ errors: error.errors });
            return;
        }
        next(error); // forward unexpected errors
    }
};
exports.validate = validate;

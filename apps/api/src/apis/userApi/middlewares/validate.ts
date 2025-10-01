import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { ZodSchema } from "zod";


export const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      {
        res.status(422).json({ errors: errors.array() });
        return;
      }
    }
    next();
  },
];

import {  ZodError } from "zod";

export const validate = (schema: ZodSchema<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.errors });
      return
    }
    next(error); // forward unexpected errors
  }
};


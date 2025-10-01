// middlewares/error.middleware.ts
import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { MongoServerError } from 'mongodb';

export interface ErrorResponse {
  status: string;
  message: string;
  errors?: string[];
  stack?: string;
}

// 1. Custom AppError class
export class AppError extends Error {
  statusCode: number;
  status: 'fail' | 'error';
  isOperational: boolean;
  errors?: string[];

  constructor(message: string, statusCode: number, errors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    if (errors) this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 2. Normalize known error types to AppError
const normalizeError = (err: unknown): AppError => {
  // Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map(e => e.message);
    return new AppError('Validation failed', 400, errors);
  }

  // Mongo Duplicate Key Error
  if (err instanceof MongoServerError && err.code === 11000) {
    return new AppError('Duplicate field value entered', 400);
  }

  // JWT Errors
  if (err instanceof JsonWebTokenError) {
    return new AppError('Invalid token. Please log in again!', 401);
  }

  if (err instanceof TokenExpiredError) {
    return new AppError('Your token has expired. Please log in again!', 401);
  }

  // Unknown error: convert to AppError
  const error = err as Partial<AppError> & Error;
  return new AppError(
    error.message || 'Internal server error',
    (error as any).statusCode || 500
  );
};

// 3. Global error handler middleware
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const normalizedError = normalizeError(err);

  const response: ErrorResponse = {
    status: normalizedError.status,
    message: normalizedError.message,
    ...(normalizedError.errors && { errors: normalizedError.errors }),
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = normalizedError.stack;
  }

  if (!normalizedError.isOperational) {
    console.error('💥 Unhandled Error:', normalizedError);
  }

  res.status(normalizedError.statusCode).json(response);
};

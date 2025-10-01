"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = require("jsonwebtoken");
const mongodb_1 = require("mongodb");
// 1. Custom AppError class
class AppError extends Error {
    constructor(message, statusCode, errors) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        if (errors)
            this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
// 2. Normalize known error types to AppError
const normalizeError = (err) => {
    // Mongoose Validation Error
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const errors = Object.values(err.errors).map(e => e.message);
        return new AppError('Validation failed', 400, errors);
    }
    // Mongo Duplicate Key Error
    if (err instanceof mongodb_1.MongoServerError && err.code === 11000) {
        return new AppError('Duplicate field value entered', 400);
    }
    // JWT Errors
    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        return new AppError('Invalid token. Please log in again!', 401);
    }
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        return new AppError('Your token has expired. Please log in again!', 401);
    }
    // Unknown error: convert to AppError
    const error = err;
    return new AppError(error.message || 'Internal server error', error.statusCode || 500);
};
// 3. Global error handler middleware
const errorHandler = (err, req, res, next) => {
    const normalizedError = normalizeError(err);
    const response = Object.assign({ status: normalizedError.status, message: normalizedError.message }, (normalizedError.errors && { errors: normalizedError.errors }));
    if (process.env.NODE_ENV === 'development') {
        response.stack = normalizedError.stack;
    }
    if (!normalizedError.isOperational) {
        console.error('💥 Unhandled Error:', normalizedError);
    }
    res.status(normalizedError.statusCode).json(response);
};
exports.errorHandler = errorHandler;

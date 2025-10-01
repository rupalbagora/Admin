"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/ams.";
const connectDB = () => {
    mongoose_1.default
        .connect(uri)
        .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    })
        .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });
};
exports.connectDB = connectDB;

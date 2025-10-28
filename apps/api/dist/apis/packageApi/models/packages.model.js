"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const packageSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    services: { type: String, required: true },
    about: { type: String, required: true },
    image: { type: String, required: true },
    discount: { type: String },
    review: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    serviceList: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Package", packageSchema);

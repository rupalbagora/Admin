"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/packages.models.ts
const mongoose_1 = require("mongoose");
const packageSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    services: [{ type: String, required: true }],
    about: { type: String, required: true },
    discount: { type: String },
    serviceList: [{ type: String, required: true }],
    ratings: { type: Number, default: 0 },
    category: { type: String, enum: ["male", "female"], required: true },
    // 👇 NEW FIELD
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Package", packageSchema);

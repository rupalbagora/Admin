"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/apis/ourserviceApi/models/ourservice.model.ts
const mongoose_1 = require("mongoose");
const ourServiceSchema = new mongoose_1.Schema({
    serviceName: { type: String, required: true },
    price: { type: Number, required: true },
    title: { type: String, required: true },
    highlights: { type: [String], default: [] },
    extra: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
    imageUrl: { type: String, required: true },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("OurService", ourServiceSchema);

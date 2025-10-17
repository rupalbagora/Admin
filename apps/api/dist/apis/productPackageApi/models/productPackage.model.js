"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productPackageSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    products: [{ type: String, required: true }],
    tagline: { type: String, required: true },
    rating: { type: Number, default: 0 },
    description: { type: String, required: true },
    discount: { type: String },
    items: [{ type: String, required: true }],
    usageInstructions: { type: String, required: true },
    stock: { type: Number, required: true },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("ProductPackage", productPackageSchema);

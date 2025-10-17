"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const specialOfferSchema = new mongoose_1.Schema({
    tag: { type: String, required: true },
    image: { type: String, required: true },
    // Optional: track who added the offer
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("SpecialOffer", specialOfferSchema);

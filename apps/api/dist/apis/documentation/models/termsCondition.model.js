"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsCondition = void 0;
const mongoose_1 = require("mongoose");
const termsConditionSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    accepted: { type: Boolean, default: false },
}, { timestamps: true });
exports.TermsCondition = (0, mongoose_1.model)("TermsCondition", termsConditionSchema);

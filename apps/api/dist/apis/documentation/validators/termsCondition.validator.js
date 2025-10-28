"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.termsConditionSchema = void 0;
const zod_1 = require("zod");
exports.termsConditionSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string().min(1, "Content is required"),
    accepted: zod_1.z.boolean().default(false),
});

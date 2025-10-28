"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutUsSchema = void 0;
// validators/aboutUs.validator.ts
const zod_1 = require("zod");
exports.aboutUsSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string().min(1, "Content is required"),
});

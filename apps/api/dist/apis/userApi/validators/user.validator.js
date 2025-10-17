"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
// validators/user.validator.ts
const zod_1 = require("zod");
const user_types_1 = require("../types/user.types");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().min(1),
        // lastName: z.string().min(1),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8),
        phone: zod_1.z.string().min(10),
        role: zod_1.z.nativeEnum(user_types_1.UserRole).optional(),
        subscriptionType: zod_1.z.nativeEnum(user_types_1.SubscriptionType).optional(),
        dateOfBirth: zod_1.z.string().optional(), // or z.coerce.date()
        // gender: z.nativeEnum(Gender).optional()
    }),
});
exports.updateUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    // lastName: z.string().optional(),
    phone: zod_1.z.string().optional(),
    subscriptionType: zod_1.z.nativeEnum(user_types_1.SubscriptionType).optional(),
    // gender: z.nativeEnum(Gender).optional(),
    bio: zod_1.z.string().optional(),
});

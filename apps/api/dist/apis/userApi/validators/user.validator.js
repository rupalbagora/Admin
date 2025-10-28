"use strict";
// // validators/user.validator.ts
// import { z } from 'zod';
// import { UserRole, SubscriptionType, Gender } from '../types/user.types';
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
// export const createUserSchema = z.object({
//   body: z.object({
//     firstName: z.string().min(1),
//           fullName: z.string().min(3, "Full name is required"),
//        lastName: z.string().min(1),
//     email: z.string().email(),
//       password: z.string().min(8, "Password must be at least 8 characters"),
//             confirmPassword: z.string().min(8, "Confirm password is required"),
//       phone: z.string().min(10, "Phone number must be at least 10 digits"),
//       dateOfBirth: z.string().optional(),
//       address: z.string().optional(),
//       gender: z.nativeEnum(Gender).optional(),
//       referralCode: z.string().optional(),
//       avatar: z.string().optional(),
//     role: z.nativeEnum(UserRole).optional(),
//     subscriptionType: z.nativeEnum(SubscriptionType).optional(),
//     // gender: z.nativeEnum(Gender).optional()
//   }),
// });
// export const updateUserSchema = z.object({
//   firstName: z.string().optional(),
//   // lastName: z.string().optional(),
//   phone: z.string().optional(),
//   subscriptionType: z.nativeEnum(SubscriptionType).optional(),
//   // gender: z.nativeEnum(Gender).optional(),
//   bio: z.string().optional(),
// });
const zod_1 = require("zod");
const user_types_1 = require("../types/user.types");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().min(3, "Full name is required"),
        // optional support for first/last names (auto handled later)
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: zod_1.z.string().min(8, "Confirm password is required"),
        phone: zod_1.z.string().min(10, "Phone number must be at least 10 digits").optional(),
        dateOfBirth: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        gender: zod_1.z.nativeEnum(user_types_1.Gender).optional(),
        referralCode: zod_1.z.string().optional(),
        avatar: zod_1.z.string().optional(),
        role: zod_1.z.nativeEnum(user_types_1.UserRole).optional(),
        subscriptionType: zod_1.z.nativeEnum(user_types_1.SubscriptionType).optional(),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    subscriptionType: zod_1.z.nativeEnum(user_types_1.SubscriptionType).optional(),
    bio: zod_1.z.string().optional(),
});

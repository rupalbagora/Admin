// validators/user.validator.ts
import { z } from 'zod';
import { UserRole, SubscriptionType, Gender } from '../types/user.types';

export const createUserSchema = z.object({
  body: z.object({
    // firstName: z.string().min(1),
    // lastName: z.string().min(1),
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().min(10),
    role: z.nativeEnum(UserRole).optional(),
    subscriptionType: z.nativeEnum(SubscriptionType).optional(),
    dateOfBirth: z.string().optional(), // or z.coerce.date()
    gender: z.nativeEnum(Gender).optional(),
  }),
});

export const updateUserSchema = z.object({
  // firstName: z.string().optional(),
  // lastName: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  subscriptionType: z.nativeEnum(SubscriptionType).optional(),
  gender: z.nativeEnum(Gender).optional(),
  bio: z.string().optional(),
});


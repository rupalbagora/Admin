import type {Type} from "mongoose"
// dtos/create-user.dto.ts
import { 
  UserRole, 
  SubscriptionType, 
  Gender 
} from '../types/user.types';

export class CreateUserDto {
  admin?: Type.ObjectId; // Optional, will be set by the controller
  firstName!: string;
  lastName!: string;
  email!: string;
  phone?: string;
  password!: string;
  role?: UserRole;
  subscriptionType?: SubscriptionType;
  dateOfBirth?: Date;
  gender?: Gender;
}
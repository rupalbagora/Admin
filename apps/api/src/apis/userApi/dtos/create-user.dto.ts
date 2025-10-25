import type {Types} from "mongoose"
// dtos/create-user.dto.ts
import { 
  UserRole, 
  SubscriptionType, 
  Gender 
} from '../types/user.types';

export class CreateUserDto {
  admin?: Types.ObjectId; // Optional, will be set by the controller
  firstName!: string;
  lastName!: string;
  fullName!: string;
  email!: string;
  phone?: string;
  password!: string;
  confirmPassword!:string;
    address?: string;
  role?: UserRole;
  subscriptionType?: SubscriptionType;
  dateOfBirth?: Date;
    referralCode?: string;
  avatar?: string;
  
  gender?: Gender;
}
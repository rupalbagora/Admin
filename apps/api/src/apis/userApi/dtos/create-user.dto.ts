import type { mongo, Types } from "mongoose";
// dtos/create-user.dto.ts
import { UserRole, SubscriptionType, Gender } from "../types/user.types";
import mongoose from "mongoose";
import { IUploadedFile } from "../../mediaApi/models/uploadedFile";

export class CreateUserDto {
	admin?: Types.ObjectId; // Optional, will be set by the controller
	firstName!: string;
	lastName!: string;
	fullName!: string;
	email!: string;
	phone?: string;
	password!: string;
	confirmPassword!: string;
	address?: string;
	role?: UserRole;
	subscriptionType?: SubscriptionType;
	dateOfBirth?: Date;
	referralCode?: string;
	avatar?: mongoose.Types.ObjectId | IUploadedFile;
	otp?: number;
	noOfChairs?: number;
	gender?: Gender;
	appRegistrationCode?: string;
	subAdminEmail?: string;
	subAdminId?: Types.ObjectId;
}

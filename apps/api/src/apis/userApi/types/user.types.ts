import { Document, Types } from "mongoose";
import { IUploadedFile } from "../../mediaApi/models/uploadedFile";

export enum UserRole {
	SUPERADMIN = "superadmin",
	ADMIN = "admin",
	STAFF = "staff",
	STUDENT = "student",
	USER = "user",
}

export enum SubscriptionType {
	FREE = "free",
	BASIC = "basic",
	PREMIUM = "premium",
	ENTERPRISE = "enterprise",
}

export enum SubscriptionStatus {
	ACTIVE = "active",
	EXPIRED = "expired",
	CANCELLED = "cancelled",
	PENDING = "pending",
}

export enum PaymentMethod {
	CREDIT_CARD = "credit_card",
	PAYPAL = "paypal",
	BANK_TRANSFER = "bank_transfer",
	CRYPTO = "crypto",
}

export enum Gender {
	MALE = "male",
	FEMALE = "female",
	OTHER = "other",
	PREFER_NOT_TO_SAY = "prefer-not-to-say",
}

export enum ThemePreference {
	LIGHT = "light",
	DARK = "dark",
	SYSTEM = "system",
}

export interface IDeviceInfo {
	deviceType: string;
	os: string;
	browser: string;
	ipAddress: string;
	lastAccess: Date;
}

export interface IBillingInfo {
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	postalCode?: string;
}

export interface ISocialMedia {
	facebook?: string;
	twitter?: string;
	linkedin?: string;
	instagram?: string;
}

export interface IPreferences {
	theme?: ThemePreference;
	language?: string;
	notifications?: {
		email?: boolean;
		push?: boolean;
		sms?: boolean;
	};
}

export interface IUser extends Document {
	otp?: number | null;
	refLink?: string | null;
	admin?: Types.ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	password: string;
	passwordChangedAt?: Date;
	passwordResetToken?: string;
	passwordResetExpires?: Date;
	role: UserRole;
	permissions: string[];
	isVerified: boolean;
	isActive: boolean;
	subscription?: Types.ObjectId;
	subscriptionType: SubscriptionType;
	subscriptionPeriod?: "biannual" | "halfyearly" | "yearly" | "custom";
	subscriptionStartDate?: Date;
	subscriptionEndDate?: Date;
	subscriptionStatus: SubscriptionStatus;
	paymentMethod?: PaymentMethod;
	billingInfo?: IBillingInfo;
	avatar?: Types.ObjectId | IUploadedFile;
	bio?: string;
	dateOfBirth?: Date;
	gender?: Gender;
	socialMedia?: ISocialMedia;
	preferences: IPreferences;
	loginCount: number;
	lastLogin?: Date;
	devices: IDeviceInfo[];
	noOfChairs?: number;
	createdAt: Date;
	updatedAt: Date;

	address?: string;

	// Virtuals
	fullName: string;
	isSubscriptionActive: boolean;

	// Methods
	comparePassword(candidatePassword: string): Promise<boolean>;
	generateAuthToken(): string;
	changedPasswordAfter(JWTTimestamp: number): boolean;
	createPasswordResetToken(): string;
}

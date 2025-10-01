import type { IMedia } from "./media.types";

export type UserRole = 'superadmin' | 'admin' | 'user'| "staff" | "student";

export type SubscriptionType ='free'| 'basic'|'premium'|'enterprise'
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'pending';


export type PaymentMethod ='credit_card'|'paypal'|'bank_transfer'|'crypto'


export type Gender ='male'|'female'|'other'| 'prefer-not-to-say'

export type ThemePreference ='light'|'dark'|'system'
  


// Interfaces
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

export interface IUser {
  _id: string;
  refLink?: string | null;
  admin?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  permissions: string[];
  isVerified: boolean;
  isActive: boolean;
  subscription?: string;
  subscriptionType: SubscriptionType;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  subscriptionStatus: SubscriptionStatus;
  paymentMethod?: PaymentMethod;
  billingInfo?: IBillingInfo;
  avatar?: IMedia|string;
  bio?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  socialMedia?: ISocialMedia;
  preferences: IPreferences;
  loginCount: number;
  lastLogin?: Date;
  devices: IDeviceInfo[];
  createdAt: Date;
  updatedAt: Date;
  fullName?: string;
  isSubscriptionActive?: boolean;
}
export interface UserState {
  user: IUser | null;
  users: IUser[];
  UsersI: IUser[];
  loading: boolean;
  error: string | null;
}
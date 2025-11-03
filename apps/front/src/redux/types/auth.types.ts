// import type { IMedia } from "./media.types";
import type { IUser } from "./usera.types";

// types/auth.types.ts
export interface LoginPayload {
	email: string;
	password: string;
}

export interface RegisterPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone?: string;
}

export interface AuthResponse {
	user: IUser;
	token: string;
}

export type UpdateUserPayload = Partial<IUser>;

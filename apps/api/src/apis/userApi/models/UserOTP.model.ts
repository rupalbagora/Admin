import mongoose from "mongoose";
import { IUser } from "../types/user.types";

const emailOTPSchema = new mongoose.Schema<IUser>({
	email: { type: String },
	otp: { type: Number },
});

export const EmailOTP = mongoose.model("emailOTP", emailOTPSchema);

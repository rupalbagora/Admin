import nodemailer from "nodemailer";
import { EmailOTP } from "../apis/userApi/models/UserOTP.model";
import dotenv from "dotenv";
dotenv.config();

export const sendOTP = async (email: string) => {
	const otp = Math.floor(100000 + Math.random() * 900000).toString();

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_SENDER,
			pass: process.env.MAIL_PASS,
		},
	});

	await transporter.sendMail({
		from: process.env.MAIL_SENDER,
		to: email,
		subject: "Your OTP code to log in to the Naushad app is",
		text: `Your verification code is ${otp}`,
	});

	await EmailOTP.create({ email, otp });

	return otp;
};

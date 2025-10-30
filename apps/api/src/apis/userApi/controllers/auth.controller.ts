import { NextFunction, Request, Response } from "express";
import User from "../models/User.model";
import { CreateUserDto } from "../dtos/create-user.dto";
import { IUser } from "../types/user.types";
import mongoose, { Types } from "mongoose";
import { validate } from "../middlewares/validate";
import { saveUploadedFile } from "../../mediaApi/services/saveFile";
import { deleteUploadedFileFromReqFile } from "../../mediaApi/services/deleteUploadedFileFromReqFile";
import { IUploadedFile } from "../../mediaApi/models/uploadedFile";
import { updateUploadedFile } from "../../mediaApi/services/updateUploadedFile";
import { updateUserSchema } from "../validators/user.validator"; // Your Zod schema
import { sendOTP } from "../../../config/mailconfig";
import { EmailOTP } from "../models/UserOTP.model";

export const register = async (req: Request, res: Response) => {
	try {
		const { ref } = req.query;
		const userData: CreateUserDto = req.body;

		// If fullName provided, split automatically
		if (userData.fullName && (!userData.firstName || !userData.lastName)) {
			const nameParts = userData.fullName.trim().split(" ");
			userData.firstName = nameParts[0];
			userData.lastName = nameParts.slice(1).join(" ") || "";
		}
		
		// Ensure fullName is always set
		if (!userData.fullName && userData.firstName && userData.lastName) {
			userData.fullName = `${userData.firstName} ${userData.lastName}`;
		}

		// Check existing user
		const existingUser = await User.findOne({ email: userData.email });
		if (existingUser) {
			res.status(409).json({ message: "Email already in use" });
			return;
		}

		// Handle referral case
		if (ref) {
			handleReferralRegistration(req, res, userData, ref.toString());
			return;
		}

		// for production enable this
		// const storedOTP = await EmailOTP.findOne({ email: userData.email });

		// if (Number(userData.otp) === storedOTP?.otp) {
		// Normal registration
		const user = new User(userData);
		user.isActive = false;
		await user.save();

		await EmailOTP.findOneAndDelete({ email: userData.email });

		const token = user.generateAuthToken();
		console.log(token);
		console.log("JWT_SECRET in protect:", process.env.JWT_SECRET);

		return res.status(201).json({
			success: true,
			user: formatUserResponse(user),
			token,
		});
		// } else {
		// 	return res.status(401).json({ success: false, message: "Invalid OTP" });
		// }
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({
			message: "Registration failed",
			error: process.env.NODE_ENV === "development" ? error : undefined,
		});
		return;
	}
};

// Helper function for referral registration
const handleReferralRegistration = async (
	req: Request,
	res: Response,
	userData: CreateUserDto,
	ref: string
) => {
	if (!mongoose.Types.ObjectId.isValid(ref)) {
		return res.status(400).json({ message: "Invalid referral ID format" });
	}

	const refUser = await User.findById(ref);
	if (!refUser) {
		return res.status(404).json({ message: "Referral user not found" });
	}

	const user = await User.create({
		...userData,
		refLink: ref,
		admin: refUser._id,
	});

	const token = user.generateAuthToken();

	return res.status(201).json({
		user: formatUserResponse(user),
		token,
	});
};

// Format user response (remove sensitive data)
const formatUserResponse = (user: IUser) => ({
	_id: user._id,
	firstName: user.firstName,
	lastName: user.lastName,
	email: user.email,
	role: user.role,
	createdAt: user.createdAt,
});

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		let user: IUser | null = await User.findOne({ email }).select("+password");
		if (!user) {
			res.status(401).json({ error: "Invalid email or password" });
			return;
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			res.status(401).json({ error: "Invalid email or password" });
			return;
		}

		if (user.subscriptionEndDate) {
			const currentDate = new Date();
			if (currentDate > user.subscriptionEndDate) {
				user.isActive = false;
				await user.save();
			}
		}
		const token = user.generateAuthToken();
		res.status(200).json({ user, token });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// controllers/token.controller.ts

export const updateToken = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = (req as any).user;

		if (!user || !user._id) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const foundUser = await User.findById(user._id).populate({
			path: "avatar",
			model: "UploadedFile",
		});

		if (!foundUser) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const newToken = foundUser.generateAuthToken(); // ✅ use foundUser

		res.status(200).json({
			message: "Token refreshed successfully",
			token: newToken,
			user: {
				_id: foundUser._id,
				email: foundUser.email,
				role: foundUser.role,
				firstName: foundUser.firstName,
				lastName: foundUser.lastName,
				fullName: `${foundUser.firstName} ${foundUser.lastName}`,
				avatar: (foundUser.avatar as any)?.url || null, // ✅ populated avatar
				preferences: foundUser.preferences,
				isVerified: foundUser.isVerified,
				isActive: foundUser.isActive,
				subscriptionType: foundUser.subscriptionType,
				subscriptionStatus: foundUser.subscriptionStatus,
				bio: foundUser.bio,
				dateOfBirth: foundUser.dateOfBirth,
				createdAt: foundUser.createdAt,
				updatedAt: foundUser.updatedAt,
				address: foundUser.address,
			},
		});
	} catch (error) {
		console.error("Token refresh error:", error);
		res.status(500).json({ message: "Token refresh failed", error });
	}
};

/////////
export const updateProfile = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		if (!req.file) {
			res.status(400).json({ error: "No file uploaded" });
			return;
		}

		const userId = req.user?._id;
		if (!userId) {
			res.status(401).json({ error: "Unauthorized user" });
			return;
		}

		let avatar: IUploadedFile;

		const existingAvatarId =
			(req.user?.avatar as Types.ObjectId) || req.user?.avatar?._id;
		if (existingAvatarId) {
			const avatarId = new Types.ObjectId(existingAvatarId);
			avatar = await updateUploadedFile(avatarId, req.file);
		} else {
			avatar = await saveUploadedFile(req.file);
		}

		await User.findByIdAndUpdate(userId, { avatar: avatar._id });

		res.status(200).json({ url: avatar.url });
	} catch (err: any) {
		if (req.file) {
			deleteUploadedFileFromReqFile(req.file);
		}
		console.error("Error updating profile:", err);
		res.status(500).json({ error: err.message || "Server error" });
	}
};

export const getUserProfile = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = (req as any).user;

		if (!user || !user._id) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const foundUser = await User.findById(user._id).populate({
			path: "avatar",
			model: "UploadedFile",
		});

		if (!foundUser) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.status(200).json({
			message: "User profile fetched successfully",
			user: {
				_id: foundUser._id,
				email: foundUser.email,
				role: foundUser.role,
				firstName: foundUser.firstName,
				lastName: foundUser.lastName,
				fullName: `${foundUser.firstName} ${foundUser.lastName}`,
				avatar: (foundUser.avatar as any)?.url || null,
				phone: foundUser.phone || null,
				bio: foundUser.bio || null,
				gender: foundUser.gender || null,
				dateOfBirth: foundUser.dateOfBirth || null,
				preferences: foundUser.preferences,
				isVerified: foundUser.isVerified,
				isActive: foundUser.isActive,
				subscriptionType: foundUser.subscriptionType,
				subscriptionStatus: foundUser.subscriptionStatus,
				createdAt: foundUser.createdAt,
				updatedAt: foundUser.updatedAt,
			},
		});
	} catch (error) {
		console.error("Get profile error:", error);
		res.status(500).json({ message: "Failed to fetch user profile", error });
	}
};

export const updateUserInfo = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const userId = (req as any).user?._id;

		if (!userId) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		// Validate incoming data using Zod
		const parseResult = updateUserSchema.safeParse(req.body);
		if (!parseResult.success) {
			res
				.status(400)
				.json({ message: "Invalid data", errors: parseResult.error.format() });
			return;
		}

		// const updates = parseResult.data;
		const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
			new: true,
			runValidators: true,
		}).populate("avatar");

		if (!updatedUser) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.status(200).json({
			message: "Profile updated successfully",
			user: updatedUser,
		});
	} catch (error: any) {
		console.error("Update user info error:", error);
		res
			.status(500)
			.json({ message: "Something went wrong", error: error.message });
	}
};

export const checkUserEmailExists = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { email } = req.query;

		if (!email || typeof email !== "string") {
			res.status(400).json({ message: "Email is required" });
			return;
		}

		const exists = await User.exists({ email });
		res.status(200).json({ exists: !!exists });
		return;
	} catch (error: any) {
		console.error("Email check error:", error);
		res.status(500).json({ message: "Server error" });
		return;
	}
};

// generate otp for email
export const generateOTP = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const otp = await sendOTP(email);
		if (otp) {
			return res
				.status(200)
				.json({ success: true, message: "OTP Generated Successfully" });
		}
		await EmailOTP.findOneAndUpdate(
			{ email },
			{ otp },
			{ new: true, upsert: true }
		);
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

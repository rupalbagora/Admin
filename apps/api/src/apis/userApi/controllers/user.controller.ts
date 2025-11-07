import { Request, Response } from "express";
import UserService from "../services/user.service";
import { CreateUserDto } from "../dtos/create-user.dto";
import { IUser, UserRole } from "../types/user.types";
import { Types } from "mongoose";
import User from "../models/User.model";
import { saveUploadedFile } from "../../mediaApi/services/saveFile";

export const createUser = async (req: Request, res: Response) => {
	try {
		const {
			fullName,
			password,
			phone,
			address,
			status,
			subscriptionPeriod,
			customDate,
			noOfChairs,
			email,
		} = req.body;

		let imageUrl;
		if (req.file) {
			imageUrl = (await saveUploadedFile(req.file)).url;
		}
		const newUser = await UserService.createUser({
			email,
			fullName,
			password,
			phone,
			address,
			isActive: status === "active",
			subscriptionPeriod,
			expireDate:
				subscriptionPeriod === "custom" && customDate ? customDate : undefined,
			avatar: imageUrl || undefined,
			noOfChairs: Number(noOfChairs),
			role: UserRole.ADMIN,
			// admin: req.user?._id
		});

		res.status(201).json({ message: "User created", user: newUser });
	} catch (error: any) {
		if (error.name === "ValidationError") {
			res.status(400).json({
				message: "Validation failed",
				errors: error.errors,
			});
			return;
		}
		res.status(500).json({
			message: "Registration failed",
			error: process.env.NODE_ENV === "development" ? error.message : undefined,
		});
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await UserService.getUserById(req.params.id);
		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}
		res.status(200).json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const getUserByEmail = async (req: Request, res: Response) => {
	try {
		const { email } = req.query;
		if (typeof email !== "string") {
			res.status(400).json({ error: "Invalid email" });
			return;
		}

		const user = await UserService.getUserByEmail(email);
		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}
		res.status(200).json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const user = await User.find({ _id: req.params.id, admin: req.user?._id });
		if (!user) {
			res.status(401).json({ error: "Not authorized" });
			return;
		}
		const updated = await UserService.updateUser(req.params.id, req.body);
		if (!updated) {
			res.status(404).json({ error: "User not found" });
			return;
		}
		res.status(200).json({ message: "User updated", user: updated });
	} catch (err: any) {
		res.status(400).json({ error: err.message });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		await UserService.deleteUser(req.params.id);
		res.status(204).send();
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const promoteUser = async (req: Request, res: Response) => {
	try {
		const user = await UserService.promoteToAdmin(
			req.params.id,
			req.user?._id as Types.ObjectId
		);
		res.status(200).json({ message: "User promoted to admin", user });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const demoteUser = async (req: Request, res: Response) => {
	try {
		const user = await UserService.demoteToUser(req.params.id);
		res.status(200).json({ message: "User demoted to user", user });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const getAllUser = async (req: Request, res: Response) => {
	try {
		let users: IUser[] | null;
		if (
			req.user?.role.toLocaleLowerCase() === "superadmin".toLocaleLowerCase()
		) {
			users = await UserService.getAllUsers();
		} else {
			users = await UserService.getAllUsersForAdmin(
				req.user?._id as Types.ObjectId
			);
		}
		res.status(200).json(users);
	} catch (err: any) {
		console.log(err);
		res.status(500).json({ error: err.message });
	}
};

import { ChairsModel } from "../../salonCharisApi/model/chairs.model";
import User from "../models/User.model";
import type { IUser } from "../types/user.types";
import { UserRole } from "../types/user.types";
import { Types } from "mongoose";

class UserService {
	async createUser(createUserDto: {
		fullName: string;
		email: string;
		password: string;
		phone: string;
		address: string;
		isActive: boolean;
		subscriptionPeriod: string;
		expireDate?: Date;
		avatar?: string;
		admin?: Types.ObjectId;
		noOfChairs?: number;
		role?: UserRole;
		registrationCode?: string;
		appName?: string;
		appRegistrationCode?: string;
	}) {
		const user = new User({
			...createUserDto,
			role: UserRole.ADMIN, // default role
		});

		await user.save();

		const chairs = [];

		for (let i = 1; i <= createUserDto.noOfChairs!; i++) {
			chairs.push({
				chairNumber: i,
				subAdminId: user._id,
				subAdminEmail: user.email,
			});
		}

		const chairData = await ChairsModel.insertMany(chairs);

		return { user, chairs: chairData };
	}

	async getUserById(id: string): Promise<IUser | null> {
		return User.findById(id);
	}

	async getUserByEmail(email: string): Promise<IUser | null> {
		return User.findOne({ email }).select("+password");
	}

	async updateUser(id: string, updateData: Partial<IUser>) {
		const user = await User.findByIdAndUpdate(id, updateData, { new: true });

		let chairData;
		if (updateData.noOfChairs !== undefined) {
			const existingChairs = await ChairsModel.find({ subAdminId: user?._id });
			const currentCount = existingChairs.length;
			const newCount = updateData.noOfChairs;

			//  Add new chairs
			if (newCount > currentCount) {
				const newChairs = [];
				for (let i = currentCount + 1; i <= newCount; i++) {
					newChairs.push({
						chairNumber: i,
						subAdminId: user?._id,
						subAdminEmail: user?.email,
						isChairAvailable: true,
					});
				}
				chairData = await ChairsModel.insertMany(newChairs);
			}

			// Remove extra chairs (keep earlier ones)
			if (newCount < currentCount) {
				chairData = await ChairsModel.deleteMany({
					subAdminId: user?._id,
					chairNumber: { $gt: newCount },
				});
			}
		}

		return { user, chairs: chairData };
	}

	async deleteUser(id: string): Promise<void> {
		await User.findByIdAndDelete(id);
	}

	async promoteToAdmin(
		id: string,
		adminId: Types.ObjectId
	): Promise<IUser | null> {
		return User.findByIdAndUpdate(
			id,
			{ role: UserRole.ADMIN, admin: adminId },
			{ new: true }
		);
	}

	async demoteToUser(id: string): Promise<IUser | null> {
		return User.findByIdAndUpdate(id, { role: UserRole.USER }, { new: true });
	}

	async getAllUsers(): Promise<IUser[] | null> {
		return User.find({
			role: { $nin: ["superadmin"] }, // exclude superadmins
		});
	}

	async getAllUsersForAdmin(id: Types.ObjectId): Promise<IUser[] | null> {
		if (!Types.ObjectId.isValid(id)) {
			throw new Error("Invalid ObjectId");
		}
		return User.find({
			admin: id,
			role: { $nin: ["superadmin"] }, // exclude superadmins
		});
	}
}

export default new UserService();

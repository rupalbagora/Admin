import User from "../models/User.model";
import type { IUser } from "../types/user.types";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserRole } from "../types/user.types";
import { Types } from "mongoose";

class UserService {
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const user = new User({
      ...createUserDto,
      role: createUserDto.role || UserRole.USER,
    });

    await user.save();
    return user;
  }

  async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select("+password");
  }

  async updateUser(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updateData, { new: true });
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
      role: { $nin: ["superadmin"] }, // exclude admins
    });
  }
  async getAllUsersForAdmin(id: Types.ObjectId): Promise<IUser[] | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }
    return User.find({
      admin: id,
      role: { $nin: ["superadmin"] }, // exclude admins
    });
  }
}

export default new UserService();

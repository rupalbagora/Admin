import User from "../apis/userApi/models/User.model";
import bcrypt from "bcryptjs";
export const createSuperAdminIfNotExists = async () => {
  const superAdminEmail = "admin@example.com";
  
  const existing = await User.findOne({ email: superAdminEmail, role: "superadmin" });
  // console.log("..........",existing)
  if (!existing) {
    const password = "Admin@123"
    await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: superAdminEmail,
      password,
      role: "superadmin",
      isVerified: true
    });
    console.log("✅ Superadmin created");
  } else {
    console.log("🟢 Superadmin already exists");
  }
};

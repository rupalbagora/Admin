import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Signup from "../models/signup.model"; // ✅ Model renamed

// ✅ Signup API
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // 1️⃣ Check all fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: true, message: "All fields are required" });
    }
    
    // 2️⃣ Check passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    // 3️⃣ Check if user already exists
    const existingSignup = await Signup.findOne({ email });
    if (existingSignup) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create signup
    const newSignup = await Signup.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6️⃣ Generate JWT token
    const token = jwt.sign({ id: newSignup._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
  httpOnly: true,
  secure: false, // must be false for localhost testing
 
});

    res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      signup: {
        id: newSignup._id,
        name: newSignup.name,
        email: newSignup.email,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

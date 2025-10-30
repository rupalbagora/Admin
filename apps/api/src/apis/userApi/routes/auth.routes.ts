import express from "express";
import {
	register,
	login,
	updateToken,
	updateProfile,
	getUserProfile,
	updateUserInfo,
	checkUserEmailExists,
	generateOTP,
} from "../controllers/auth.controller";
import { validate, validateLogin } from "../middlewares/validate";
import { createUserSchema } from "../validators/user.validator";
import { protect } from "../middlewares/auth.middleware";
import upload from "../../mediaApi/services/multerConfig";
import {
	generateOrderId,
	refundPayment,
	verifyOrderId,
} from "../../razorpay/controller/razorpay.controller";

const router = express.Router();
router.post("/", protect, updateToken);
router.post(
	"/register",
	upload.single("avatar"), // ✅ handle avatar upload
	validate(createUserSchema),
	register
);
//router.post('/register', validate(createUserSchema), register);
router.post("/login", validateLogin, login);
router.put("/profile", protect, upload.single("avatar"), updateProfile);
router.get("/profile", protect, getUserProfile);
router.get("/check-email", checkUserEmailExists);
router.put("/profile-update", protect, updateUserInfo);
router.put("/send-otp", generateOTP);

// razorpay routes
router.post("/generate-order-id", protect, generateOrderId);
router.post("/verify-order-id", protect, verifyOrderId);
router.post("/refund", protect, refundPayment);

export default router;

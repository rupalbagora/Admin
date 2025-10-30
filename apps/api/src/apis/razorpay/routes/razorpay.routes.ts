import express from "express";
import {
	generateOrderId,
	refundPayment,
	verifyOrderId,
} from "../controller/razorpay.controller";
import { protect } from "../../userApi/middlewares/auth.middleware";

const router = express.Router();
// razorpay routes
router.post("/generate-order-id", protect, generateOrderId);
router.post("/verify-order-id", protect, verifyOrderId);
router.post("/refund", protect, refundPayment);

export default router;

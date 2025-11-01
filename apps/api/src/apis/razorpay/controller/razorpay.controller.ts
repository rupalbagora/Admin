import { config } from "dotenv";
import { Request, Response } from "express";
import Razorpay from "razorpay";
import * as crypto from "crypto";

config();
export const generateOrderId = async (req: Request, res: Response) => {
	try {
		const razorpay = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_SECRET,
		});
		
		const options = req.body;
		const order = await razorpay.orders.create(options);
		console.log("🚀 ~ generateOrderId ~ order:", order);

		if (!order) {
			return res
				.status(403)
				.json({ success: false, message: "Unable to generate order" });
		}

		res.status(200).json({
			success: true,
			message: "Order Generated successfully",
			data: order,
		});
	} catch (error) {
		res.status(500).json({ success: false, error: (error as Error).message });
	}
};

export const verifyOrderId = async (req: Request, res: Response) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET!);
		console.log("🚀 ~ verifyOrderId ~ sha:", sha);
		sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
		const digest = sha.digest("hex");
		if (digest !== razorpay_signature) {
			return res.status(400).json({ msg: "Transaction is not legit!" });
		}

		res.status(200).json({
			msg: "success",
			orderId: razorpay_order_id,
			paymentId: razorpay_payment_id,
		});
	} catch (error) {
		res.status(500).json({ success: false, error: (error as Error).message });
	}
};

export const refundPayment = async (req: Request, res: Response) => {
	try {
		const razorpay = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_SECRET,
		});
		const { paymentId } = req.body;
		if (!paymentId) {
			return res
				.status(400)
				.json({ success: false, message: "Payment ID required" });
		}
		const refund = await razorpay.payments.refund(paymentId, {
			speed: "normal",
		});
		console.log("🚀 ~ refundPayment ~ refund:", refund);

		return res.status(200).json({
			success: true,
			message:
				"Full refund has been initiated. The amount will reflect in your account within 7–10 business days.",
			data: refund,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Refund Initialization failed",
			error: (error as Error).message,
		});
	}
};

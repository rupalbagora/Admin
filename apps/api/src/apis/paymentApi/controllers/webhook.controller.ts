// controllers/webhook.controller.ts
import { Request, Response } from "express";
import crypto from "crypto";
import Subscription from "../models/subscription.model";

export const handleWebhook = async (req: Request, res: Response) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const receivedSignature = req.headers["x-razorpay-signature"] as string;

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(JSON.stringify(req.body))
    .digest("hex");
    
  if (expectedSignature !== receivedSignature) {
    res.status(400).json({ error: "Invalid webhook signature" });
    return;
  }

  const event = req.body.event;
  const payload = req.body.payload;

  console.log(`🪝 Webhook received: ${event}`);
  if (event === "subscription.charged") {
    const subscriptionId = payload.subscription.entity.id;
    await Subscription.findOneAndUpdate(
      { razorpaySubscriptionId: subscriptionId },
      { status: "active" }
    );
  }

  // Optional: Handle events like payment.failed, subscription.charged, etc.

  res.status(200).json({ status: "ok" });
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    razorpayOrderId: {
        type: String,
        required: true,
    },
    razorpayPaymentId: {
        type: String,
        required: true,
    },
    razorpaySignature: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "INR",
    },
    status: {
        type: String,
        enum: ["created", "paid", "failed", "refunded"],
        default: "created",
    },
    method: {
        type: String,
        required: true,
    },
    captured: {
        type: Boolean,
        default: false,
    },
    invoiceId: String,
    subscriptionId: String, // optional if you're using Razorpay subscriptions
    notes: {
        type: mongoose_1.Schema.Types.Mixed,
    },
}, {
    timestamps: true,
});
const Payment = (0, mongoose_1.model)("Payment", paymentSchema);
exports.default = Payment;

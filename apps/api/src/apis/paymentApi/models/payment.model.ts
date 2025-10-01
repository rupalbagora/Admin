import { Schema, model, Document, Types } from "mongoose";

export interface IPayment extends Document {
  user: Types.ObjectId;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed" | "refunded";
  method: string;
  captured: boolean;
  invoiceId?: string;
  notes?: Record<string, any>;
  subscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model<IPayment>("Payment", paymentSchema);
export default Payment;

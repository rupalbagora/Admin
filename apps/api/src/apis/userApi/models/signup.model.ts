import mongoose, { Schema, Document } from "mongoose";

export interface ISignup extends Document {
  name: string;
  email: string;
  password: string;
}

const signupSchema = new Schema<ISignup>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISignup>("Signup", signupSchema);

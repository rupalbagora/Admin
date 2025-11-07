import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { connectDB } from "./db";
import { createSuperAdminIfNotExists } from "./bootstrapSuperAdmin";
import path from "path";
import cookieParser from "cookie-parser";

createSuperAdminIfNotExists();
dotenv.config();
const origin: string = process.env.ORIGIN || "http://localhost:3000"; // Replace with your frontend URL
const app = express();

const corsOptions = {
	origin: origin,
	credentials: true, //  need cookies/auth headers
};

// Middleware
app.use(cors(corsOptions));
app.use(morgan("dev")); // HTTP request logger
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin media access
//   })
// );

app.use(express.json()); // Parse JSON body
app.use(cookieParser()); // ✅ must come before routes using req.cookies

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Rate Limiting (optional)
const limiter = rateLimit({
	windowMs: 15 * 60 * 100, // 15 minutes
	max: 100, // limit each IP
});
// app.use(limiter);
connectDB();

// Sample route
app.get("/", (req, res) => {
	res.send("Hello from the TypeScript backend with middleware!");
});
export default app;

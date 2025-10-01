"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const db_1 = require("./db");
const bootstrapSuperAdmin_1 = require("./bootstrapSuperAdmin");
const path_1 = __importDefault(require("path"));
(0, bootstrapSuperAdmin_1.createSuperAdminIfNotExists)();
dotenv_1.default.config();
const origin = process.env.ORIGIN || "http://localhost:3000"; // Replace with your frontend URL
const app = (0, express_1.default)();
const corsOptions = {
    origin: origin,
    credentials: true, //  need cookies/auth headers
};
// Middleware
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)("dev")); // HTTP request logger
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin media access
//   })
// );
app.use(express_1.default.json()); // Parse JSON body
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded data
// Serve static files from uploads directory
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// Rate Limiting (optional)
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 100, // 15 minutes
    max: 100, // limit each IP
});
// app.use(limiter);
(0, db_1.connectDB)();
// Sample route
app.get("/", (req, res) => {
    res.send("Hello from the TypeScript backend with middleware!");
});
exports.default = app;

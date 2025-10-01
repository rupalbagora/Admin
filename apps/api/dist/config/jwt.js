"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = (process.env.JWT_EXPIRES_IN || '30d');
if (!JWT_SECRET) {
    throw new Error('⚠️  Missing JWT_SECRET in environment');
}
exports.jwtConfig = {
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRES, // e.g. '30d', '12h', 86400 (seconds)
};

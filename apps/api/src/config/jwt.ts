import { config } from 'dotenv';
import type { SignOptions } from 'jsonwebtoken';
config()

const JWT_SECRET   = process.env.JWT_SECRET;
const JWT_EXPIRES  = (process.env.JWT_EXPIRES_IN || '30d') as SignOptions['expiresIn'];

if (!JWT_SECRET) {
  throw new Error('⚠️  Missing JWT_SECRET in environment');
}

export const jwtConfig = {
  secret:   JWT_SECRET,
  expiresIn: JWT_EXPIRES,   // e.g. '30d', '12h', 86400 (seconds)
} as const;

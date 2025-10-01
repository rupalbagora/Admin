// middlewares/protect.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User.model";
import { config } from "dotenv";
config()
// export interface AuthRequest extends Request {
//   user?: any;
// }

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Not authorized, token missing" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    let user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ error: "User no longer exists" });
      return;
    }
    const currentDate = new Date();
    if(user.subscriptionEndDate){
      if(currentDate > user.subscriptionEndDate&&user.isActive){
        user.isActive = false;
        await user.save();
      }
    }
    req.user = user;  
    next();
  } catch (err) {
    next(err)
    // res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
};

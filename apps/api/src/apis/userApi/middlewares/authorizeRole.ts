// middlewares/authorizeRole.ts
import { Request, Response, NextFunction } from "express";

export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    next();
  };
};

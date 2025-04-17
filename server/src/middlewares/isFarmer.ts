import { Request, Response, NextFunction } from "express";
import { ERole } from "../model/user.schema";

export function isFarmer(req: Request, res: Response, next: NextFunction) {
  const user = req.user as any;

  if (!user) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  if (user.role !== ERole.FARMER || user.role !== ERole.ADMIN) {
    res.status(403).json({ message: "Access restricted to farmers only" });
    return;
  }

  next();
}

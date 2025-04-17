import { Router, Request, Response } from "express";
import { ERole, User } from "../model/user.schema";

export const farmersRoutes = (router: Router): Router => {
  router.get("/", async (req: Request, res: Response) => {
    try {
      const farmers = await User.find({ role: ERole.FARMER }).select(
        "-password"
      );
      res.json(farmers);
    } catch {
      res.status(500).json({ message: "Failed to load farmers" });
    }
  });

  return router;
};

import { Router, Request, Response } from "express";
import { User } from "../model/user.schema";
import { body, validationResult } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const usersRoutes = (router: Router): Router => {
  // GET /users - csak admin
  router.get("/", isAuthenticated, async (req: Request, res: Response) => {
    const user = req.user as any;
    if (user.role !== "ADMIN") {
      res.status(403).json({ message: "Only admins can access all users." });
      return;
    }

    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch {
      res.status(500).json({ message: "Failed to load users" });
    }
  });

  // GET /users/:id - saját profil vagy admin
  router.get("/:id", isAuthenticated, async (req: Request, res: Response) => {
    const user = req.user as any;

    if (user.role !== "ADMIN" && user.id !== req.params.id) {
      res.status(403).json({ message: "Unauthorized to view this user." });
      return;
    }

    try {
      const profile = await User.findById(req.params.id).select("-password");
      if (!profile) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(profile);
    } catch {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // PUT /users/:id - saját profil vagy admin
  router.put(
    "/:id",
    isAuthenticated,
    body("name").optional().isString(),
    body("email").optional().isEmail(),
    body("location").optional().isString(),
    body("bio").optional().isString(),
    async (req: Request, res: Response) => {
      const user = req.user as any;

      if (user.role !== "ADMIN" && user.id !== req.params.id) {
        res.status(403).json({ message: "Unauthorized to update this user." });
        return;
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        }).select("-password");
        if (!updated) {
          res.status(404).json({ message: "User not found" });
          return;
        }

        res.json(updated);
      } catch {
        res.status(500).json({ message: "Failed to update user" });
      }
    }
  );

  return router;
};

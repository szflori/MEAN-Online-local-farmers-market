import { Router, Request, Response } from "express";
import { User } from "../model/user.schema";
import { body, validationResult } from "express-validator";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const usersRoutes = (router: Router): Router => {
  router.get("/", isAdmin, async (req: Request, res: Response) => {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch {
      res.status(500).json({ message: "Failed to load users" });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  router.patch(
    "/:id",
    isAdmin,
    body("name").optional().isString(),
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("address").optional().isString(),
    body("bio").optional().isString(),
    body("avatarUrl").optional().isString(),
    body("role").optional().isIn(["USER", "FARMER", "ADMIN"]),
    async (req: Request, res: Response) => {
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

  router.delete("/:id", isAdmin, async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      await user.deleteOne();

      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  router.put("/fav", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const { farmerId } = req.body;

      if (!farmerId) {
        res.status(400).json({ message: "Missing farmerId" });
        return;
      }

      const farmer = await User.findById(farmerId);
      if (!farmer || farmer.role !== "FARMER") {
        res.status(404).json({ message: "Farmer not found or invalid role" });
        return;
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          $addToSet: { favoriteFarmers: farmerId }, // csak egyszer adja hozzá
        },
        { new: true }
      )
        .populate("favoriteFarmers", "name avatarUrl")
        .lean();

      res.json({
        message: "Farmer added to favorites",
        favorites: updatedUser?.favoriteFarmers,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add favorite farmer" });
    }
  });

  router.get("/fav", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = await User.findById((req.user as any)._id).populate(
        "favoriteFarmers",
        "name avatarUrl"
      );

      res.json({ favorites: user?.favoriteFarmers || [] });
    } catch (err) {
      res.status(500).json({ message: "Failed to load favorite farmers" });
    }
  });

  router.delete(
    "/fav/:farmerId",
    isAuthenticated,
    async (req: Request, res: Response) => {
      try {
        const user = req.user as any;
        const { farmerId } = req.params;

        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $pull: { favoriteFarmers: farmerId } },
          { new: true }
        )
          .populate("favoriteFarmers", "name avatarUrl")
          .lean();

        res.json({
          message: "Farmer removed from favorites",
          favorites: updatedUser?.favoriteFarmers,
        });
      } catch (err) {
        res.status(500).json({ message: "Failed to remove favorite farmer" });
      }
    }
  );

  return router;
};

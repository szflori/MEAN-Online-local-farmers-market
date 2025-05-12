import { Router, Request, Response, NextFunction } from "express";
import { PassportStatic } from "passport";
import { ERole, User } from "../model/user.schema";

export const authRoutes = (
  passport: PassportStatic,
  router: Router
): Router => {
  router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (error: string | null, user: typeof User) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          if (!user) {
            res.status(400).send("User not found.");
          } else {
            req.login(user, (err: string | null) => {
              if (err) {
                console.log(err);
                res.status(500).send("Internal server error.");
              } else {
                res.status(200).send(user);
              }
            });
          }
        }
      }
    )(req, res, next);
  });

  router.post("/register", async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({ message: "Email already in use" });
        return;
      }

      const user = new User({ email: email, password: password, name: name });
      await user.save();

      res.status(201).json({ message: "Registered successfully" });
    } catch (err) {
      res.status(500).json({ message: "Registration failed" });
    }
  });

  router.post("/register-farmer", (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const user = new User({
      email: email,
      password: password,
      name: name,
      role: ERole.FARMER,
    });
    user
      .save()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.post("/logout", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      req.logout((error) => {
        if (error) {
          console.log(error);
          res.status(500).send("Internal server error.");
        }
        res.status(200).send("Successfully logged out.");
      });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.get("/check-session", async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user);

      if (!user) {
        res.status(400).send("User not found.");
        return;
      }

      res.status(200).json({ id: user._id, name: user.name, role: user.role });
      return;
    }
    res.status(401).json({ message: "Not authenticated" });
  });

  return router;
};

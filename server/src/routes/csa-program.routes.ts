import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isFarmer } from "../middlewares/isFarmer";
import { body } from "express-validator";
import { CsaProgram } from "../model/csa-program.schema";

export const csaProgramsRoutes = (router: Router): Router => {
  router.post(
    "/",
    isAuthenticated,
    isFarmer,
    body("title").isString().notEmpty(),
    body("description").optional().isString(),
    body("frequency").isIn(Object.values(["weekly", "biweekly", "monthly"])),
    body("durationWeeks").isFloat({ gt: 0 }),
    body("startDate").isDate(),
    body("imageUrl").optional().isString(),
    async (req: Request, res: Response) => {
      try {
        const user = req.user as any;

        if (!["FARMER", "ADMIN"].includes(user.role)) {
          res.status(403).json({ message: "Unauthorized" });
          return;
        }

        const {
          title,
          description,
          frequency = "weekly",
          durationWeeks,
          startDate,
          price,
          spotsAvailable,
        } = req.body;

        const csaProgram = await CsaProgram.create({
          title,
          description,
          frequency,
          durationWeeks,
          startDate,
          price,
          spotsAvailable,
          farmerId: user._id,
        });

        res.status(201).json({
          message: "CSA program created successfully",
          program: csaProgram,
        });
      } catch (err) {
        console.error("Failed to create CSA program", err);
        res.status(500).json({ message: "Failed to create CSA program" });
      }
    }
  );

  router.get("/", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const csaPrograms = await CsaProgram.find();

      res.json(csaPrograms);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch csa programs" });
    }
  });

  router.get("/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const csaProgram: any = await CsaProgram.findById(req.params.id);

      res.json(csaProgram);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch csa program" });
    }
  });

  router.patch(
    "/:id",
    isAuthenticated,
    isFarmer,
    async (req: Request, res: Response) => {
      try {
      } catch (err) {
        console.error(err);
      }
    }
  );

  router.delete(
    "/:id",
    isAuthenticated,
    isFarmer,
    async (req: Request, res: Response) => {
      try {
        const csaProgram: any = await CsaProgram.findById(req.params.id);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete csa program" });
      }
    }
  );

  return router;
};

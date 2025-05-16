import { Router, Request, Response } from "express";
import { isFarmer } from "../middlewares/isFarmer";
import { Product } from "../model/product.schema";
import { Order } from "../model/order.schema";
import { Types } from "mongoose";

export const salesRoutes = (router: Router): Router => {
  router.get("/", isFarmer, async (req: Request, res: Response) => {
    try {
      const { range = "monthly" } = req.query;
      const user = req.user as any;

      const groupFormat = {
        daily: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        monthly: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        yearly: { year: { $year: "$createdAt" } },
      }[range as string] || {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
      };

      const sales = await Order.aggregate([
        {
          $match: {
            farmerId: new Types.ObjectId(user._id),
            status: "COMPLETED",
          },
        },
        {
          $group: {
            _id: groupFormat,
            totalSales: { $sum: "$total" },
            orderCount: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
        },
      ]);

      res.json(sales);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to generate sales report" });
    }
  });

  return router;
};

import { Router, Request, Response } from "express";
import { isFarmer } from "../middlewares/isFarmer";
import { Product } from "../model/product.schema";
import { Order } from "../model/order.schema";

export const salesRoutes = (router: Router): Router => {
  router.get("/sales-report", isFarmer, async (req: Request, res: Response) => {
    try {
      const user = req.user as any;

      const products = await Product.find({ farmerId: user._id });
      const productIds = products.map((p) => p._id.toString());

      const orders = await Order.find({ "items.product": { $in: productIds } });

      const salesSummary: Record<
        string,
        { name: string; quantity: number; totalRevenue: number }
      > = {};

      orders.forEach((order) => {
        order.items.forEach((item) => {
          const productId = item.productId.toString();
          if (productIds.includes(productId)) {
            if (!salesSummary[productId]) {
              const product = products.find(
                (p) => p._id.toString() === productId
              );
              salesSummary[productId] = {
                name: product?.name || "Unknown",
                quantity: 0,
                totalRevenue: 0,
              };
            }
            salesSummary[productId].quantity += item.quantity;
            salesSummary[productId].totalRevenue += item.price * item.quantity;
          }
        });
      });

      res.json(Object.values(salesSummary));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to generate sales report" });
    }
  });

  return router;
};

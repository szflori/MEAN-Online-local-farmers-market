import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Order } from "../model/order.schema";
import { OrderItem } from "../model/order-item.schema";
import { Product } from "../model/product.schema";

export const ordersRoutes = (router: Router): Router => {
  // GET /orders
  router.get("/", async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const orders = await Order.find({ userId: user._id }).populate({
        path: "items",
        populate: { path: "product" },
      });

      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // POST /orders
  router.post(
    "/",
    body("items").isArray({ min: 1 }),
    body("items.*.productId").isString(),
    body("items.*.quantity").isInt({ gt: 0 }),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const user = req.user as any;
      const { items } = req.body;

      try {
        let total = 0;
        const orderItems: any[] = [];

        for (const item of items) {
          const product = await Product.findById(item.productId);
          if (!product || product.stock < item.quantity) {
            res
              .status(400)
              .json({ message: "Invalid product or insufficient stock" });
            return;
          }

          total += product.price * item.quantity;

          const orderItem = new OrderItem({
            productId: product._id,
            quantity: item.quantity,
            price: product.price,
          });

          await orderItem.save();
          orderItems.push(orderItem);

          product.stock -= item.quantity;
          await product.save();
        }

        const order = new Order({
          userId: user._id,
          total,
          status: "PENDING",
          items: orderItems.map((item) => item._id),
        });

        const savedOrder = await order.save();
        const populatedOrder = await savedOrder.populate({
          path: "items",
          populate: { path: "product" },
        });

        res.status(201).json(populatedOrder);
      } catch (err: any) {
        res
          .status(400)
          .json({ message: err.message || "Order creation failed" });
      }
    }
  );

  // GET /orders/:id
  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const order = await Order.findById(req.params.id).populate({
        path: "items",
        populate: { path: "product" },
      });

      if (!order || order.userId.toString() !== user._id.toString()) {
        res.status(403).json({ message: "Unauthorized or order not found" });
        return;
      }

      res.json(order);
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve order" });
    }
  });

  return router;
};

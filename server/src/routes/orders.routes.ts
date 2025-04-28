import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Order } from "../model/order.schema";
import { OrderItem } from "../model/order-item.schema";
import { Product } from "../model/product.schema";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const ordersRoutes = (router: Router): Router => {
  router.get("/", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const orders = await Order.find({ userId: user._id }).sort({
        createdAt: -1,
      });

      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  router.get("/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const order = await Order.findById(req.params.id);

      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      if (
        order.userId.toString() !== user._id.toString() &&
        user.role !== "ADMIN"
      ) {
        res.status(403).json({ message: "Unauthorized to access this order" });
        return;
      }

      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to retrieve order" });
    }
  });

  // POST /orders
  router.post(
    "/",
    isAuthenticated,
    body("items").isArray({ min: 1 }),
    body("fullName").isString().notEmpty(),
    body("address").isString().notEmpty(),
    body("phone").isString().notEmpty(),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      try {
        const user = req.user as any;
        const { items, fullName, address, phone } = req.body;

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
          fullName,
          address,
          phone,
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
      } catch (err: any) {
        res
          .status(400)
          .json({ message: err.message || "Order creation failed" });
      }
    }
  );

  router.get("/:id", isAuthenticated, async (req: Request, res: Response) => {
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

  router.patch("/:id", async () => {});

  return router;
};

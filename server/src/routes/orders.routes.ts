import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Order } from "../model/order.schema";
import { Product } from "../model/product.schema";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const ordersRoutes = (router: Router): Router => {
  router.get("/", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      let filter = {};

      if (user.role !== "ADMIN") {
        filter = { userId: user._id };
      }

      const orders = await Order.find(filter)
        .sort({
          createdAt: -1,
        })
        .populate("farmerId", "name avatarUrl")
        .populate("userId", "name avatarUrl")
        .lean();

      const formatted = orders.map((order: any) => ({
        farmer: {
          id: order.farmerId._id.toString(),
          name: order.farmerId.name,
          avatarUrl: order.farmerId.avatarUrl,
        },
        user: {
          id: order.userId._id.toString(),
          name: order.userId.name,
          avatarUrl: order.userId.avatarUrl,
        },
        ...order,
      }));

      res.json(formatted);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  router.get("/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const order: any = await Order.findById(req.params.id)
        .populate("farmerId", "name avatarUrl")
        .populate("userId", "name avatarUrl")
        .populate("items.productId", "name category imageUrl")
        .lean();

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

      const formatted = {
        ...order,
        farmer: {
          id: order.farmerId._id.toString(),
          name: order.farmerId.name,
          avatarUrl: order.farmerId.avatarUrl,
        },
        user: {
          id: order.userId._id.toString(),
          name: order.userId.name,
          avatarUrl: order.userId.avatarUrl,
        },
        items: order.items.map((item: any) => ({
          ...item,
          productId: item.productId._id,
          name: item.productId.name,
          category: item.productId.category,
          imageUrl: item.productId.imageUrl,
        })),
      };

      res.json(formatted);
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
    body("address").isString().notEmpty(),
    body("phone").isString().notEmpty(),
    body("farmerId").isString(),
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

          const orderItem = {
            productId: product._id,
            quantity: item.quantity,
            price: product.price,
          };

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

  router.patch("/:id", isAuthenticated, async (req: Request, res: Response) => {
    const user = req.user as any;
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    if (order.status === "COMPLETED") {
      res.status(403).json({ message: "Order is completed" });
      return;
    }

    const updates: any = {};

    if (
      user.role === "ADMIN" ||
      (user.role === "FARMER" && user._id.equals(order.farmerId))
    ) {
      if (req.body.status) updates.status = req.body.status;
    }

    if (
      user.role === "ADMIN" ||
      (user.role === "USER" && user._id.equals(order.userId))
    ) {
      if (req.body.address) updates.address = req.body.address;
      if (req.body.phone) updates.phone = req.body.phone;
    }

    Object.assign(order, updates);
    await order.save();

    res.json({ message: "Order updated" });
  });

  return router;
};

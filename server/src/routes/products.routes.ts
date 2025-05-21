import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { EProductCategory, Product } from "../model/product.schema";
import { isFarmer } from "../middlewares/isFarmer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { ERole } from "../model/user.schema";

export const productsRoutes = (router: Router): Router => {
  router.post(
    "/",
    isAuthenticated,
    isFarmer,
    body("name").isString().notEmpty(),
    body("category").isIn(Object.values(EProductCategory)),
    body("description").optional().isString(),
    body("price").isFloat({ gt: 0 }),
    body("stock").isInt({ min: 0 }),
    body("imageUrl").optional().isString(),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      try {
        const user = req.user as any;

        const { name, description, price, stock, imageUrl } = req.body;

        const newProduct = new Product({
          name,
          description,
          price,
          stock,
          imageUrl,
          farmerId: user.id,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create product" });
      }
    }
  );

  router.get("/", async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const isFarmer = user?.role === ERole.FARMER;

      const { category, farmerId, search } = req.query;
      const filter: any = {};

      if (category) {
        filter.category = category;
      }

      if (farmerId) {
        filter.farmerId = farmerId;
      } else if (isFarmer) {
        filter.farmerId = user._id;
      }

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      const products = await Product.find(filter)
        .populate("farmerId", "name avatarUrl")
        .lean();

      const formatted = products.map((product: any) => ({
        farmer: {
          id: product.farmerId._id.toString(),
          name: product.farmerId.name,
          avatarUrl: product.farmerId.avatarUrl,
        },
        ...product,
      }));

      res.json(formatted);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // GET product by ID
  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const product: any = await Product.findById(req.params.id)
        .populate("farmerId", "name avatarUrl")
        .lean();
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.json({
        farmer: {
          id: product.farmerId._id.toString(),
          name: product.farmerId.name,
          avatarUrl: product.farmerId.avatarUrl,
        },
        ...product,
      });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving product" });
    }
  });

  router.patch(
    "/:id",
    isAuthenticated,
    isFarmer,
    body("name").optional().isString().notEmpty(),
    body("category").optional().isIn(Object.values(EProductCategory)),
    body("description").optional().isString(),
    body("price").optional().isFloat({ gt: 0 }),
    body("stock").optional().isInt({ min: 0 }),
    body("imageUrl").optional().isString(),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      try {
        const user = req.user as any;
        const product = await Product.findById(req.params.id);

        if (!product) {
          res.status(404).json({ message: "Product not found" });
          return;
        }

        const isOwner = product.farmerId.toString() === user.id;
        const isAdmin = user.role === "ADMIN";

        if (!isOwner && !isAdmin) {
          res.status(403).json({ message: "Unauthorized" });
          return;
        }

        const updated = await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

        res.json(updated);
      } catch (err) {
        res.status(500).json({ message: "Failed to update product" });
      }
    }
  );

  // DELETE product
  router.delete(
    "/:id",
    isAuthenticated,
    isFarmer,
    async (req: Request, res: Response) => {
      try {
        const user = req.user as any;
        const product = await Product.findById(req.params.id);

        if (!product) {
          res.status(404).json({ message: "Product not found" });
          return;
        }

        const isOwner = product.farmerId.toString() === user.id;
        const isAdmin = user.role === "ADMIN";

        if (!isOwner && !isAdmin) {
          res.status(403).json({ message: "Unauthorized" });
          return;
        }

        await product.deleteOne();
        res.json({ message: "Product deleted" });
      } catch (err) {
        res.status(500).json({ message: "Failed to delete product" });
      }
    }
  );

  return router;
};

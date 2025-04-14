import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { Product } from "../model/product.schema";

export const productsRoutes = (router: Router): Router => {
  // GET all products
  router.get("/", async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // GET product by ID
  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.json(product);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving product" });
    }
  });

  // POST new product
  router.post(
    "/",
    body("name").isString().notEmpty(),
    body("price").isFloat({ gt: 0 }),
    body("stock").isInt({ min: 0 }),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      try {
        const user = req.user as any;
        if (user.role !== "FARMER") {
          res.status(403).json({ message: "Only farmers can create products" });
          return;
        }

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
        res.status(500).json({ message: "Failed to create product" });
      }
    }
  );

  // PUT update product
  router.put(
    "/:id",
    body("name").optional().isString().notEmpty(),
    body("price").optional().isFloat({ gt: 0 }),
    body("stock").optional().isInt({ min: 0 }),
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
        if (product.farmerId.toString() !== user._id.toString()) {
          res
            .status(403)
            .json({ message: "Unauthorized to update this product" });
          return;
        }

        Object.assign(product, req.body);
        const updatedProduct = await product.save();

        res.json(updatedProduct);
      } catch (err) {
        res.status(500).json({ message: "Failed to update product" });
      }
    }
  );

  // DELETE product
  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const product = await Product.findById(req.params.id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      if (product.farmerId.toString() !== user._id.toString()) {
        res
          .status(403)
          .json({ message: "Unauthorized to delete this product" });
        return;
      }

      await product.deleteOne();
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  return router;
};

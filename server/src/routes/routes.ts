import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

import { authenticateJWT } from '../middlewares/auth';
import prisma from '../client';
import passport from '../configs/passport';
import { Role } from '@prisma/client';

export const productsRoutes = (router: Router): Router => {
  // GET /products - Összes termék lekérése
  router.get('/', async (req, res) => {
    try {
      const products = await prisma.product.findMany({
        include: { farmer: true },
      });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  });

  // GET /products/:id - Egy termék lekérése
  router.get('/:id', async (req, res) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id: req.params.id },
        include: { farmer: true },
      });
      if (!product)
        return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving product' });
    }
  });

  // POST /products - Új termék létrehozása (csak gazdálkodók)
  router.post(
    '/',
    authenticateJWT,
    body('name').isString().notEmpty(),
    body('price').isFloat({ gt: 0 }),
    body('stock').isInt({ min: 0 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const user = req.user as any;
        if (user.role !== 'FARMER') {
          return res
            .status(403)
            .json({ message: 'Only farmers can create products' });
        }

        const { name, description, price, stock, imageUrl } = req.body;

        const newProduct = await prisma.product.create({
          data: {
            name,
            description,
            price,
            stock,
            imageUrl,
            farmerId: user.id,
          },
        });

        res.status(201).json(newProduct);
      } catch (err) {
        res.status(500).json({ message: 'Failed to create product' });
      }
    }
  );

  // PUT /products/:id - Termék frissítése (csak saját termék, csak gazdálkodóknak)
  router.put(
    '/:id',
    authenticateJWT,
    body('name').optional().isString().notEmpty(),
    body('price').optional().isFloat({ gt: 0 }),
    body('stock').optional().isInt({ min: 0 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const user = req.user as any;
        const product = await prisma.product.findUnique({
          where: { id: req.params.id },
        });

        if (!product)
          return res.status(404).json({ message: 'Product not found' });
        if (product.farmerId !== user.id) {
          return res
            .status(403)
            .json({ message: 'Unauthorized to update this product' });
        }

        const updatedProduct = await prisma.product.update({
          where: { id: req.params.id },
          data: req.body,
        });

        res.json(updatedProduct);
      } catch (err) {
        res.status(500).json({ message: 'Failed to update product' });
      }
    }
  );

  // DELETE /products/:id - Termék törlése (csak saját termék, csak gazdálkodóknak)
  router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
      const user = req.user as any;
      const product = await prisma.product.findUnique({
        where: { id: req.params.id },
      });

      if (!product)
        return res.status(404).json({ message: 'Product not found' });
      if (product.farmerId !== user.id) {
        return res
          .status(403)
          .json({ message: 'Unauthorized to delete this product' });
      }

      await prisma.product.delete({ where: { id: req.params.id } });
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete product' });
    }
  });

  return router;
};

export const ordersRoutes = (router: Router): Router => {
  // GET /orders - Saját rendelések lekérése (vásárlóknak)
  router.get('/', authenticateJWT, async (req, res) => {
    try {
      const user = req.user as any;
      const orders = await prisma.order.findMany({
        where: { userId: user.id },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });

  // POST /orders - Új rendelés létrehozása
  router.post(
    '/',
    authenticateJWT,
    body('items').isArray({ min: 1 }),
    body('items.*.productId').isString(),
    body('items.*.quantity').isInt({ gt: 0 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = req.user as any;
      const { items } = req.body;

      try {
        // Ellenőrizd a termékeket és számold ki a végösszeget
        let total = 0;
        const orderItems = await Promise.all(
          items.map(async (item: any) => {
            const product = await prisma.product.findUnique({
              where: { id: item.productId },
            });
            if (!product || product.stock < item.quantity) {
              throw new Error('Invalid product or insufficient stock');
            }
            total += product.price * item.quantity;
            return {
              productId: product.id,
              quantity: item.quantity,
              price: product.price,
            };
          })
        );

        // Rendelés mentése
        const order = await prisma.order.create({
          data: {
            userId: user.id,
            total,
            orderItems: {
              create: orderItems,
            },
          },
          include: {
            orderItems: true,
          },
        });

        // Készlet frissítése
        for (const item of items) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }

        res.status(201).json(order);
      } catch (err: any) {
        res
          .status(400)
          .json({ message: err.message || 'Order creation failed' });
      }
    }
  );

  // GET /orders/:id - Egy rendelés részletei (csak a saját)
  router.get('/:id', authenticateJWT, async (req, res) => {
    try {
      const user = req.user as any;
      const order = await prisma.order.findUnique({
        where: { id: req.params.id },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order || order.userId !== user.id) {
        return res
          .status(403)
          .json({ message: 'Unauthorized or order not found' });
      }

      res.json(order);
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve order' });
    }
  });

  return router;
};

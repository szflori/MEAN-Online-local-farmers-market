import express from "express";
import { Router } from "express";
import { PassportStatic } from "passport";

import { authRoutes } from "./auth";
import { productsRoutes } from "./products";
import { ordersRoutes } from "./orders";

export const configureRoutes = (passport: PassportStatic): Router => {
  const router = express.Router();

  router.use("/", authRoutes(passport, express.Router()));

  router.use("/products", productsRoutes(express.Router()));

  router.use("/orders", ordersRoutes(express.Router()));

  return router;
};

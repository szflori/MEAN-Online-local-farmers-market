import express from "express";
import { Router } from "express";
import { PassportStatic } from "passport";

import { authRoutes } from "./auth.routes";
import { productsRoutes } from "./products.routes";
import { ordersRoutes } from "./orders.routes";
import { farmersRoutes } from "./farmers.routes";
import { usersRoutes } from "./users.routes";
import { salesRoutes } from "./sales.routes";
import { csaProgramsRoutes } from "./csa-program.routes";

export const configureRoutes = (passport: PassportStatic): Router => {
  const router = express.Router();

  router.use("/", authRoutes(passport, express.Router()));

  router.use("/users", usersRoutes(express.Router()));

  router.use("/products", productsRoutes(express.Router()));

  router.use("/orders", ordersRoutes(express.Router()));

  router.use("/farmers", farmersRoutes(express.Router()));

  router.use("/sales-report", salesRoutes(express.Router()));

  router.use("/csa-programs", csaProgramsRoutes(express.Router()));

  return router;
};

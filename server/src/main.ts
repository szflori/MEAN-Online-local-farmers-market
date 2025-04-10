/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";
import expressSession, { SessionOptions } from "express-session";
import * as path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import passport from "./configs/passport";
import { configureRoutes } from "./routes";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then((_) => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((error) => {
    console.log(error);
    return;
  });

// Middleware-ek
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
};

app.use(expressSession(sessionOptions) as any);
app.use(passport.initialize() as any);
app.use(passport.session());

const port = process.env.PORT || 3333;

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use('/app', configureRoutes(passport, express.Router()));

app.get("/", (_req, res) => {
  res.send("APP is running 🚀");
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on("error", console.error);

console.log('After server is ready.');

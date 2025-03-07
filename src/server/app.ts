import AppError from "../utils/app_error";
import geh from "../utils/global_error_handler";
import config from "../config";
import express, { Application, NextFunction, Request, Response } from "express";
import { v1 } from "./routes";

// Global app
const app: Application = express();

// Built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Check the API Key
app.use((req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return next(new AppError("Please provide the API Key", 400));
  }

  if (config.api_key !== apiKey)
    return next(new AppError("Invalid API Key", 400));

  next();
});

// Use routes from V1
v1(app);

// Unknown URLs
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError(`Unknown URL`, 404));
});

// Global Error Handler
app.use(geh);

export default app;

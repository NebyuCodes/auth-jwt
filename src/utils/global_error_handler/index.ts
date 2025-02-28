import { NextFunction, Request, RequestHandler, Response } from "express";
import AppError from "../app_error";
import sendDevError from "./send_dev_error";
import sendProdError from "./send_prod_error";
import configs from "../../config";
import errors from "./errors";

// Global error handler
export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "ERROR";

  // Handle Error
  err = errors(err);

  // Send Dev error
  if (configs.env === "local" || configs.env === "development") {
    sendDevError(err, res);
  } else if (configs.env === "qa" || configs.env === "production") {
    sendProdError(err, res);
  }
};

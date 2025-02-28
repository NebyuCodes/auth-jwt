import { Response } from "express";
import AppError from "../app_error";

/**
 * Send Dev Error
 * @param {AppError} err
 * @param {Response} res
 * @returns {}
 */
export default (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
};

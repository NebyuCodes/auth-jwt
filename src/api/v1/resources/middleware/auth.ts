import { RequestHandler } from "express";
import { IUserDocument } from "../user/schema";
import AppError from "../../../../utils/app_error";

export const auth = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    if (req.user) {
      const user = <IUserDocument>req.user;
      if (!roles.includes(user.role))
        return next(new AppError("Access Denied.", 400));
      next();
    } else {
      return next(new AppError("Unable to perform authorization.", 400));
    }
  };
};

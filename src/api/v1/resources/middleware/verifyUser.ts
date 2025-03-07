import { RequestHandler } from "express";
import { IUserDocument } from "../user/schema";
import AppError from "../../../../utils/app_error";

export const verifyUser: RequestHandler = async (req, res, next) => {
  try {
    const user = <IUserDocument>req.user;
    const userId = req.params.userId;
    if (user && userId) {
      if (user.id !== userId)
        return next(new AppError("You can not access other users' data.", 400));
    } else {
      next(new AppError("Unable to find user.", 404));
    }
    next();
  } catch (error) {
    next(error);
  }
};

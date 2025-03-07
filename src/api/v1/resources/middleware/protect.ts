import { RequestHandler } from "express";
import AppError from "../../../../utils/app_error";
import { verifyToken } from "../../../../utils/token";
import { UserDal } from "../user/dal";

export const protect: RequestHandler = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new AppError("Please login.", 400));

    const decyrptData = verifyToken(token);

    if (decyrptData.role === "user") {
      const user = await UserDal.getUser(decyrptData.id);
      if (!user) return next(new AppError("User does not exists.", 404));

      if (!user.isActive)
        return next(new AppError("User account is not active.", 400));

      const originalUrl = `/api/v1/user/${user.id}/requestotp`;
      if (req.originalUrl !== originalUrl) {
        if (!user.isVerified)
          return next(new AppError("User account is not verified.", 400));
      }

      if (user.isEmailOrPhoneNumberChanged)
        return next(
          new AppError(
            "You have recently changed your email or phone number. Please login.",
            400
          )
        );

      if (user.isPasswordChanged)
        return next(
          new AppError(
            "You have recently changed your password. Please login.",
            400
          )
        );

      req.user = user;
    }
    next();
  } catch (error) {
    next(error);
  }
};

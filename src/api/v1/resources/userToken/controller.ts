import { RequestHandler } from "express";
import { UserTokenDal } from "./dal";
import { IRenewToken } from "./dto";
import AppError from "../../../../utils/app_error";
import { generateToken, verifyToken } from "../../../../utils/token";

// Create access token
export const renewAccessToken: RequestHandler = async (req, res, next) => {
  try {
    const data = <IRenewToken>req.value;

    const userToken = await UserTokenDal.getUserToken(data.user);
    if (!userToken) return next(new AppError("Please login.", 400));

    verifyToken(userToken.refreshToken, true);
    const accessToken = generateToken(userToken.user, "user", false);

    res.status(200).json({
      status: "SUCCESS",
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

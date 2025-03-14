import { RequestHandler } from "express";
import { ICreateUser, IUserLogin, IVerifyOtp } from "./dto";
import { hashPayload } from "../../../../utils/hashPayload";
import { generateOtp } from "../../../../utils/generateOtp";
import { UserDal } from "./dal";
import { compareSync } from "bcryptjs";
import AppError from "../../../../utils/app_error";
import { generateToken } from "../../../../utils/token";
import { SessionsDal } from "../sessions/dal";
import { deviceInfo } from "../../../../utils/deviceInfo";
import { deviceIdGenerator } from "../../../../utils/deviceIdGenerator";

// Create user
export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data = <ICreateUser>req.value;

    // Hash password
    const password = hashPayload(data.password);

    // Generate OTP
    const otp = generateOtp();
    const hashedOtp = hashPayload(otp);
    const otpExpiresIn = new Date(Date.now() + 1 * 60 * 1000);

    // Create user
    const user = await UserDal.createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password,
      otp: hashedOtp,
      otpExpiresIn,
    });

    // Send OTP
    console.log(otp);

    res.status(200).json({
      status: "SUCCESS",
      message:
        "User account is successfully created. Please verify your account using the OTP sent to your email or phone number.",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Verify OTP
export const verifyOtp: RequestHandler = async (req, res, next) => {
  try {
    const data = <IVerifyOtp>req.value;

    const userData = await UserDal.getUser(req.params.userId);
    if (!userData) return next(new AppError("User does not exists.", 404));

    // Compare otp
    if (!userData.otp || !userData.otpExpiresIn)
      return next(
        new AppError("OTP can not be found. Please request again.", 400)
      );

    if (!compareSync(data.otp, userData.otp))
      return next(new AppError("Invalid OTP.", 400));

    const otpExpiresIn = userData.otpExpiresIn.getTime();
    const currentDate = new Date().getTime();
    if (otpExpiresIn < currentDate)
      return next(new AppError("OTP has expired. Please request again.", 400));

    const user = await UserDal.verifyUser(userData.id);
    if (!user) return next(new AppError("User does not exists.", 404));

    res.status(200).json({
      status: "SUCCESS",
      message: "You have successfully verified your account.",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// User login
export const userLogin: RequestHandler = async (req, res, next) => {
  try {
    const data = <IUserLogin>req.value;

    const user = await UserDal.getUserByEmailOrPhoneNumber(
      data.emailOrPhoneNumber
    );
    if (!user || !compareSync(data.password, user.password))
      return next(new AppError("Invalid Login Credentials.", 400));

    if (user.isEmailOrPhoneNumberChanged) {
      await UserDal.updateIsEmailOrPhoneNumberChanged(user.id, false);
    }

    if (user.isPasswordChanged) {
      await UserDal.updateIsPasswordChanged(user.id, false);
    }

    const userSessions = await SessionsDal.getUserSessions(user.id);
    if (userSessions.length >= 3)
      return next(
        new AppError(
          "Maximum number of sessions for this user has reached.",
          400
        )
      );

    let isOwner = false;
    if (userSessions.length === 0) {
      isOwner = true;
    }

    let userAgent = "Unknown";
    if (req.headers["user-agent"]) {
      userAgent = req.headers["user-agent"];
    }

    let deviceId = deviceIdGenerator(user.id);
    const session = await SessionsDal.createSession({
      userId: user.id,
      deviceId,
      deviceInfo: deviceInfo(userAgent),
      expireDate: new Date(Date.now() + 20 * 60 * 1000),
      isOwner,
    });

    const token = generateToken(user.id, "user", deviceId);

    res.status(200).json({
      status: "SUCCESS",
      data: {
        user,
      },
      token,
      session,
    });
  } catch (error) {
    next(error);
  }
};

// Request OTP
export const requestOtp: RequestHandler = async (req, res, next) => {
  try {
    const userData = await UserDal.getUser(req.params.userId);

    if (!userData) return next(new AppError("User does not exists.", 404));

    if (userData.isVerified)
      return next(new AppError("You account is already verified.", 400));

    // Generate OTP
    const otp = generateOtp();
    const hashedOtp = hashPayload(otp);
    const otpExpiresIn = new Date(Date.now() + 1 * 60 * 1000);

    const user = await UserDal.updateOtp(
      req.params.userId,
      hashedOtp,
      otpExpiresIn
    );
    if (!user) return next(new AppError("User does not exists.", 404));

    // Send OTP
    console.log(otp);

    res.status(200).json({
      status: "SUCCESS",
      message: "You have recieved an OTP via SMS or Email.",
    });
  } catch (error) {
    next(error);
  }
};

// Get user
export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserDal.getUser(req.params.userId);
    if (!user) return next(new AppError("User does not exists.", 404));

    res.status(200).json({
      status: "SUCCESS",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

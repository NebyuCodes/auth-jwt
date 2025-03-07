import { Router } from "express";
const router = Router();

import { validator, protect, auth, verifyUser } from "../middleware";

import {
  createUserValidation,
  userLoginValidation,
  verifyOtpValidation,
} from "./validations";

import {
  createUser,
  userLogin,
  verifyOtp,
  requestOtp,
  getUser,
} from "./controller";
import { Role } from "../../../../shared";

router.post("/login", validator(userLoginValidation), userLogin);

router.route("/").post(validator(createUserValidation), createUser);

router.patch("/:userId/verifyotp", validator(verifyOtpValidation), verifyOtp);

router.patch(
  "/:userId/requestotp",
  protect,
  auth(Role.User),
  verifyUser,
  requestOtp
);

router.route("/:userId").get(protect, auth(Role.User), verifyUser, getUser);

export default router;

import { Router } from "express";
const router = Router();

import { protect, auth, validator, verifyUser } from "../middleware";

import { destroySessionValidation } from "./validations";

import {
  getAllSessions,
  getUserSessions,
  getSession,
  destroySession,
  deleteSession,
} from "./controller";

import { Role } from "../../../../shared";

router.delete(
  "/delete",
  protect,
  auth(Role.User, Role.Owner, Role.SuperAdmin),
  deleteSession
);

router.delete("/destroy", protect, auth(Role.User), destroySession);

router
  .route("/")
  .get(protect, auth(Role.Owner, Role.SuperAdmin, Role.Admin), getAllSessions);

router.get(
  "/:userId/user",
  protect,
  auth(Role.Owner, Role.SuperAdmin, Role.Admin, Role.User),
  verifyUser,
  getUserSessions
);

router
  .route("/:id")
  .get(
    protect,
    auth(Role.Owner, Role.SuperAdmin, Role.Admin, Role.User),
    getSession
  );

export default router;

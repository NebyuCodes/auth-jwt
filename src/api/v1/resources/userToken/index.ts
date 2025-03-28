import { Router } from "express";
const router = Router();

import { protect, auth, validator } from "../middleware";

import { renewTokenValidation } from "./validation";

import { renewAccessToken } from "./controller";

router.patch("/renew", validator(renewTokenValidation), renewAccessToken);

export default router;

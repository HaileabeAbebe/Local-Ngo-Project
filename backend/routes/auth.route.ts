import { Router } from "express";
import {
  validateRegistration,
  validateLogin,
} from "../validators/auth.validator";

import {
  googleSignIn,
  refreshToken,
  signIn,
  signOut,
  signUp,
  validateToken,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
const router = Router();

router.post("/sign-up", validateRegistration, signUp);
router.post("/sign-in", validateLogin, signIn);
router.post("/google-sign-in", googleSignIn);
router.get("/validate-token", isAuthenticated, validateToken);
router.post("/sign-out", signOut);
// router.post("/refresh-token", validateLogin, refreshToken);

export default router;
// In routes/auth.route.js

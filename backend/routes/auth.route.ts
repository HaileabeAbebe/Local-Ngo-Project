import { Router } from "express";
import { validateLogin } from "../validators/auth.validator";

import {
  googleSignIn,
  signIn,
  signOut,
  validateToken,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
const router = Router();

router.post("/sign-in", validateLogin, signIn);
router.get("/validate-token", isAuthenticated, validateToken);
router.post("/sign-out", signOut);
router.post("/google-sign-in", googleSignIn);

export default router;
// In routes/auth.route.js

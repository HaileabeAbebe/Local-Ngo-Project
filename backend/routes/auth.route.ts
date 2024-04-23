import { Router } from "express";
import { validateLogin } from "../validators/auth.validator";

import { signIn, signOut, validateToken } from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
const router = Router();

router.post("/sign-in", validateLogin, signIn);
router.get("/validate-token", isAuthenticated, validateToken);
router.post("/sign-out", signOut);

export default router;

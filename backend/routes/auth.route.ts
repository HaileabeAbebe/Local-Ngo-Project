import { Router } from "express";
import { validateLogin } from "../validators/auth.validator";

import { login, logout, validateToken } from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
const router = Router();

router.post("/login", validateLogin, login);
router.get("/validate-token", isAuthenticated, validateToken);
router.post("/logout", logout);

export default router;

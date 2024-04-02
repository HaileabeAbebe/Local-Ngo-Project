import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { validateRegistration } from "./../validators/user.validator";
import { isAuthenticated } from "../middlewares/auth.middleware";
const router = Router();

router.post("/register", validateRegistration, userController.register);
router.get("/me", isAuthenticated, userController.profile);

router.put("/me", isAuthenticated, userController.updateProfile);

export default router;
import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", isAuthenticated, isAdmin, userController.fetchUsers);
router.put(
  "/:userId/role",
  isAuthenticated,
  isAdmin,
  userController.updateUserRole
);
router.get("/me", isAuthenticated, userController.profile);

router.put("/me", isAuthenticated, userController.updateProfile);

export default router;

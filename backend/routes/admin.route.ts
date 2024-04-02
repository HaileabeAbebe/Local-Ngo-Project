import express from "express";
import * as adminController from "../controllers/admin.controller";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware";
import { validateRegistration } from "../validators/user.validator";

const router = express.Router();

router.put(
  "/user/:userId/role",
  isAuthenticated,
  isAdmin,
  adminController.updateUserRole
);

router.post(
  "/user",
  isAuthenticated,
  isAdmin,
  validateRegistration,
  adminController.createUser
);

router.delete(
  "/user/:userId",
  isAuthenticated,
  isAdmin,
  adminController.deleteUser
);

export default router;

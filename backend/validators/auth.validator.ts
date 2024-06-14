import { body } from "express-validator";

export const validateRegistration = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("email").isEmail().withMessage("Email is not valid"),
  body("role")
    .optional() // Make role optional
    .isIn(["user", "editor", "admin"])
    .withMessage("Role is not valid"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

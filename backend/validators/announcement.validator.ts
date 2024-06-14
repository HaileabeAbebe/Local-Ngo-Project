import { body } from "express-validator";

export const validateAnnouncementCreation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title should be between 5 and 100 characters"),
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 15, max: 5000 })
    .withMessage("Content should be between 15 and 5000 characters"),
];

export const validateAnnouncementUpdate = [
  body("title")
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage("Title should be between 5 and 100 characters"),
  body("content")
    .optional()
    .isLength({ min: 15, max: 5000 })
    .withMessage("Content should be between 15 and 5000 characters"),
];

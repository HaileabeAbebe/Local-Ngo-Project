// blog.validator.ts
import { body } from "express-validator";

export const validateBlogCreation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters"),
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 15 })
    .withMessage("Content should be at least 15 characters"),
  body("imageFiles").custom((value, { req }) => {
    if (req.files && req.files.length >= 1 && req.files.length <= 6) {
      return true;
    }
    throw new Error("There should be at least 1 and at most 6 images");
  }),
];

export const validateBlogUpdate = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters"),
  body("content")
    .optional()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 20 })
    .withMessage("Content should be at least 20 characters"),
  body("imageUrls.*").optional().isURL().withMessage("Invalid image URL"),
  body("imageUrls")
    .optional()
    .isArray({ min: 1, max: 6 })
    .withMessage("There should be at least 1 and at most 6 images"),
];

import { body } from "express-validator";

export const validateNewsCreation = [
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
  body("imageFiles").custom((value, { req }) => {
    const imageFiles = req.files?.imageFiles;
    if (imageFiles && (imageFiles.length < 1 || imageFiles.length > 6)) {
      throw new Error("There should be at least 1 and at most 6 images");
    }
    return true;
  }),
];

export const validateNewsUpdate = [
  body("title")
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage("Title should be between 5 and 100 characters"),
  body("content")
    .optional()
    .isLength({ min: 15, max: 5000 })
    .withMessage("Content should be between 15 and 5000 characters"),
  body("imageUrls")
    .optional()
    .isArray({ min: 1, max: 6 })
    .withMessage("There should be at least 1 and at most 6 images"),
];

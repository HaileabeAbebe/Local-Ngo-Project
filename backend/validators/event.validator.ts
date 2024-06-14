import { body } from "express-validator";

// Validators for event creation
export const validateEventCreation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title should be between 5 and 100 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 5, max: 5000 })
    .withMessage("Description should be between 5 and 5000 characters"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid date"),
  body("location")
    .optional()
    .isLength({ min: 5, max: 200 })
    .withMessage("Location should be between 5 and 200 characters"),
  body("imageUrls")
    .optional()
    .isArray({ min: 1, max: 5 })
    .withMessage("There should be at least 1 and at most 5 images"),
];

// Validators for event update
export const validateEventUpdate = [
  body("title")
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage("Title should be between 5 and 100 characters"),
  body("description")
    .optional()
    .isLength({ min: 5, max: 5000 })
    .withMessage("Description should be between 5 and 5000 characters"),
  body("date").optional().isISO8601().withMessage("Date must be a valid date"),
  body("location")
    .optional()
    .isLength({ min: 5, max: 200 })
    .withMessage("Location should be between 5 and 200 characters"),
  body("imageUrls")
    .optional()
    .isArray({ min: 1, max: 5 })
    .withMessage("There should be at least 1 and at most 5 images"),
];

import { body } from "express-validator";

// Validate download creation
export const validateDownloadCreation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ min: 3 })
    .withMessage("Category should be at least 3 characters"),
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["manual", "strategy"])
    .withMessage("Type must be either 'manual' or 'strategy'"),
  body("accessLevel")
    .notEmpty()
    .withMessage("Access level is required")
    .isIn(["public", "protected"])
    .withMessage("Access level must be either 'public' or 'protected'"),
  body("file").custom((value, { req }) => {
    const file = req.file;
    if (!file) {
      throw new Error("File is required");
    }
    return true;
  }),
];

// Validate download update
export const validateDownloadUpdate = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters"),
  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ min: 3 })
    .withMessage("Category should be at least 3 characters"),
  body("type")
    .optional()
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["manual", "strategy"])
    .withMessage("Type must be either 'manual' or 'strategy'"),
  body("accessLevel")
    .optional()
    .notEmpty()
    .withMessage("Access level is required")
    .isIn(["public", "protected"])
    .withMessage("Access level must be either 'public' or 'protected'"),
  body("file")
    .optional()
    .custom((value, { req }) => {
      const file = req.file;
      if (file && !file.mimetype.startsWith("application/")) {
        throw new Error("Invalid file type. Only documents are allowed");
      }
      return true;
    }),
];

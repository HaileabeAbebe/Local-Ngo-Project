import { body } from "express-validator";

// Validate project creation
export const validateProjectCreation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 15 })
    .withMessage("Description should be at least 15 characters"),
  body("status").isIn(["ongoing", "finished"]).withMessage("Invalid status"),
  body("imageFiles").custom((value, { req }) => {
    const imageFiles = req.files?.imageFiles;
    if (imageFiles && (imageFiles.length < 1 || imageFiles.length > 6)) {
      throw new Error("There should be at least 1 and at most 6 images");
    }
    return true;
  }),
  body("docFiles").custom((value, { req }) => {
    const docFiles = req.files?.docFiles;
    if (docFiles && docFiles.length > 3) {
      throw new Error("There should be at most 3 documents");
    }
    return true;
  }),
];

// Validate project update

export const validateProjectUpdate = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 15 })
    .withMessage("Description should be at least 15 characters"),
  body("status")
    .optional()
    .isIn(["ongoing", "finished"])
    .withMessage("Invalid status"),
  body("imageUrls")
    .optional()
    .isArray({ min: 1, max: 6 })
    .withMessage("There should be at least 1 and at most 6 images"),
  body("imageUrls.*").optional().isURL().withMessage("Invalid image URL"),
  body("docUrls")
    .optional()
    .isArray({ max: 3 })
    .withMessage("There should be at most 3 documents"),
  body("docUrls.*").optional().isURL().withMessage("Invalid document URL"),
];

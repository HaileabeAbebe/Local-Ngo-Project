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
    .isIn(["manual", "strategy", "others"])
    .withMessage("Type must be either 'manual', 'strategy' or others"),
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
    const allowedTypes = [
      "application/pdf",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error(
        "Invalid file type. Only PDF and Word documents are allowed"
      );
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
    .isIn(["manual", "strategy", "others"])
    .withMessage("Type must be either 'manual', 'strategy'or 'others"),
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
      const allowedTypes = [
        "application/pdf",
        "application/msword", // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      ];
      if (file && !allowedTypes.includes(file.mimetype)) {
        throw new Error(
          "Invalid file type. Only PDF and Word documents are allowed"
        );
      }
      return true;
    }),
];

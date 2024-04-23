import { body } from "express-validator";

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
    if (
      req.files &&
      req.files["imageFiles"] &&
      req.files["imageFiles"].length >= 1 &&
      req.files["imageFiles"].length <= 6
    ) {
      return true;
    }
    throw new Error("There should be at least 1 and at most 6 images");
  }),
  // body("docFiles").custom((value, { req }) => {
  //   if (
  //     !req.files ||
  //     !req.files["docFiles"] ||
  //     req.files["docFiles"].length === 0
  //   ) {
  //     // If there are no docFiles, it's fine because they're optional
  //     return true;
  //   }
  //   if (req.files["docFiles"].length > 3) {
  //     // If there are more than 3 docFiles, throw an error
  //     throw new Error("There should be at most 3 documents");
  //   }
  //   return true;
  // }),
];

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
    .isLength({ min: 20 })
    .withMessage("Description should be at least 20 characters"),
  body("status")
    .optional()
    .isIn(["ongoing", "finished"])
    .withMessage("Invalid status"),
  body("imageUrls.*").optional().isURL().withMessage("Invalid image URL"),
  body("imageUrls")
    .optional()
    .isArray({ min: 1, max: 6 })
    .withMessage("There should be at least 1 and at most 6 images"),
  body("docUrls.*").optional().isURL().withMessage("Invalid document URL"),
  // body("docUrls")
  //   .optional()
  //   .isArray({ max: 3 })
  //   .withMessage("There should be at most 3 documents"),
];

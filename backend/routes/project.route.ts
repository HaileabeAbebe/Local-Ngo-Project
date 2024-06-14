// Import necessary modules
import { Router } from "express";
import multer from "multer";
import * as projectController from "../controllers/project.controller";
import Project from "../models/project.model";
import {
  validateProjectCreation,
  validateProjectUpdate,
} from "../validators/project.validator";
import {
  isAuthenticated,
  isAdmin,
  isAdminOrOwner,
  isAdminOrEditor,
} from "../middlewares/auth.middleware";

// Create a new router
const router = Router();

// Set up multer for file uploads with memory storage and a file size limit of 10MB.
// The fileFilter function is used to control which files should be uploaded and which should be skipped.
// It accepts PDF, DOC, DOCX, TXT, RTF, and ODT files for documents, and all image types for images.
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
  fileFilter: function (req, file, cb) {
    // Accept .pdf, .doc, .docx, .txt, .rtf, .odt files for documents
    // and all image types for images
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "text/plain" ||
      file.mimetype === "application/rtf" ||
      file.mimetype === "application/vnd.oasis.opendocument.text"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

// The POST route uses the upload.fields function to handle multiple types of files.
// The 'imageFiles' field is used for image uploads and the 'docFiles' field is used for document uploads.
router.post(
  "/",
  isAuthenticated,
  isAdminOrEditor,
  upload.fields([
    { name: "imageFiles", maxCount: 6 },
    { name: "docFiles", maxCount: 3 },
  ]),
  validateProjectCreation,
  projectController.createProject
);

// The PUT route also uses the upload.fields function to handle multiple types of files.
router.put(
  "/:projectId",
  isAuthenticated,
  isAdminOrOwner(Project, "projectId"),
  upload.fields([
    { name: "imageFiles", maxCount: 6 },
    { name: "docFiles", maxCount: 3 },
  ]),
  validateProjectUpdate,
  projectController.updateProject
);

// DELETE
router.delete(
  "/:projectId",
  isAuthenticated,
  isAdminOrOwner(Project, "projectId"),
  projectController.deleteProject
);

// GET
router.get("/", projectController.fetchProjects);
router.get("/:projectId", projectController.fetchSingleProject);

export default router;

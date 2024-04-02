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

const router = Router();
// Setting up multer for file uploads with memory storage and a file size limit of 5MB.
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  isAuthenticated,
  isAdminOrEditor,
  upload.array("imageFiles", 6),
  validateProjectCreation,
  projectController.createProject
);

router.get("/", projectController.fetchProjects);
router.get("/:projectId", projectController.fetchProject);
router.put(
  "/:projectId",
  isAuthenticated,
  isAdminOrOwner(Project),
  validateProjectUpdate,
  projectController.updateProject
);

router.delete(
  "/:projectId",
  isAuthenticated,
  isAdminOrOwner(Project),
  projectController.deleteProject
);

export default router;

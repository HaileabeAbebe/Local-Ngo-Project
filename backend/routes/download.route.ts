import express from "express";
import multer from "multer";
import {
  isAuthenticated,
  isAdminOrEditor,
  isAdminOrOwner,
} from "../middlewares/auth.middleware";
import {
  createDownload,
  getDownloads,
  deleteDownload,
  updateDownload,
} from "../controllers/download.controller";
import Download from "../models/download.model";
import {
  validateDownloadCreation,
  validateDownloadUpdate,
} from "./../validators/download.validator";

const router = express.Router();
const upload = multer();

// Create a new download
router.post(
  "/",
  isAuthenticated,
  isAdminOrEditor,
  upload.single("file"),
  validateDownloadCreation,
  createDownload
);

// Get all downloads
router.get("/", isAuthenticated, getDownloads);

// Update a download
router.put(
  "/:id",
  isAuthenticated,
  isAdminOrOwner(Download, "id"),
  upload.single("file"),
  validateDownloadUpdate,
  updateDownload
);

// Delete a download
router.delete(
  "/:id",
  isAuthenticated,
  isAdminOrOwner(Download, "id"),
  deleteDownload
);

export default router;

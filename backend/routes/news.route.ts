import { Router } from "express";
import multer from "multer";
import * as newsController from "../controllers/news.controller";
import News from "../models/news.model";
import {
  validateNewsCreation,
  validateNewsUpdate,
} from "./../validators/news.validator";
import {
  isAuthenticated,
  isAdminOrEditor,
  isAdminOrOwner,
} from "../middlewares/auth.middleware";

const router = Router();

// setup multer for file upload with memory storage and file size limit of 10mb
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// POST
router.post(
  "/",
  isAuthenticated,
  isAdminOrEditor,
  upload.array("imageFiles", 6),
  validateNewsCreation,
  newsController.createNews
);

// UPDATE
router.put(
  "/:newsId",
  isAuthenticated,
  isAdminOrOwner(News, "newsId"),
  upload.array("imageFiles", 6),
  validateNewsUpdate,
  newsController.updateNews
);

// DELETE
router.delete(
  "/:newsId",
  isAuthenticated,
  isAdminOrOwner(News, "newsId"),
  newsController.deleteNews
);

// GET
router.get("/", newsController.fetchNews);
router.get("/:newsId", newsController.fetchSingleNews);

export default router;

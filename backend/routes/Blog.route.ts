import { Router } from "express";
import multer from "multer";
import * as blogController from "../controllers/blog.controller";
import Blog from "../models/blog.model";
import {
  validateBlogCreation,
  validateBlogUpdate,
} from "../validators/blog.validator";
import {
  isAuthenticated,
  isAdmin,
  isAdminOrOwner,
  isAdminOrEditor,
} from "../middlewares/auth.middleware";

const router = Router();
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
  validateBlogCreation,
  blogController.createBlog
);

router.get("/", blogController.fetchBlogs);
router.get("/:blogId", blogController.fetchBlog);
router.put(
  "/:blogId",
  isAuthenticated,
  isAdminOrOwner(Blog, "blogId"),
  validateBlogUpdate,
  blogController.updateBlog
);

router.delete(
  "/:blogId",
  isAuthenticated,
  isAdminOrOwner(Blog, "blogId"),
  blogController.deleteBlog
);

export default router;

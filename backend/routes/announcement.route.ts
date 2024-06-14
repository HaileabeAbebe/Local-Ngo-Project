import { Router } from "express";
import * as announcementController from "../controllers/announcement.controller";
import Announcement from "../models/announcement.model";
import {
  isAuthenticated,
  isAdminOrEditor,
  isAdminOrOwner,
} from "../middlewares/auth.middleware";
import {
  validateAnnouncementCreation,
  validateAnnouncementUpdate,
} from "./../validators/announcement.validator";

const router = Router();

// POST
router.post(
  "/",
  isAuthenticated,
  isAdminOrEditor,
  validateAnnouncementCreation,
  announcementController.createAnnouncement
);

// UPDATE
router.put(
  "/:announcementId",
  isAuthenticated,
  isAdminOrOwner(Announcement, "announcementId"),
  validateAnnouncementUpdate,
  announcementController.updateAnnouncement
);

// DELETE
router.delete(
  "/:announcementId",
  isAuthenticated,
  isAdminOrOwner(Announcement, "announcementId"),
  announcementController.deleteAnnouncement
);

// GET
router.get("/", announcementController.fetchAnnouncements);
router.get("/:announcementId", announcementController.fetchSingleAnnouncement);

export default router;

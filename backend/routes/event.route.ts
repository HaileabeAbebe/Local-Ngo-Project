import { Router } from "express";
import multer from "multer";
import * as eventController from "../controllers/event.controller";
import Event from "../models/event.model";

import {
  validateEventCreation,
  validateEventUpdate,
} from "./../validators/event.validator";
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
  upload.fields([{ name: "imageFiles", maxCount: 5 }]),
  validateEventCreation,
  eventController.createEvent
);

// UPDATE
router.put(
  "/:eventId",
  isAuthenticated,
  isAdminOrOwner(Event, "eventId"),
  upload.fields([{ name: "imageFiles", maxCount: 5 }]),
  validateEventUpdate,
  eventController.updateEvent
);

// DELETE
router.delete(
  "/:eventId",
  isAuthenticated,
  isAdminOrOwner(Event, "eventId"),
  eventController.deleteEvent
);

// GET
router.get("/", eventController.fetchEvents);
router.get("/:eventId", eventController.fetchSingleEvent);

export default router;

import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import cloudinary from "cloudinary";
import Event from "../models/event.model";
import { IEvent } from "../utils/types";

// Create New Event
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingEvent = await Event.findOne({ title: req.body.title });
    if (existingEvent) {
      return res
        .status(400)
        .json({ message: "An event with this title already exists" });
    }

    const imageFiles = (req.files as any)["imageFiles"];

    const event = new Event({
      ...req.body,
      createdBy: req.userId,
    });

    const imageUrls = await uploadImages(imageFiles);
    event.imageUrls = imageUrls;

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// Fetch All Events
export const fetchEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await Event.find().populate("createdBy");
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// Fetch Single Event By ID
export const fetchSingleEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await Event.findById(req.params.eventId).populate(
      "createdBy"
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};

// Update Event
export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (req.body.title) {
      const existingEvent = await Event.findOne({
        title: req.body.title,
        _id: { $ne: req.params.eventId },
      });
      if (existingEvent) {
        return res
          .status(400)
          .json({ message: "An event with this title already exists" });
      }
    }

    const imageFiles = (req.files as any)["imageFiles"];
    if (imageFiles) {
      const imageUrls = await uploadImages(imageFiles);
      req.body.imageUrls = imageUrls;
    }

    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (error) {
    next(error);
  }
};

// Delete Event
export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    await Event.findByIdAndDelete(req.params.eventId);
    res.json({ message: "Event deleted" });
  } catch (error) {
    next(error);
  }
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

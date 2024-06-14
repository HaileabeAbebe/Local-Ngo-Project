import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Announcement from "../models/announcement.model";
import { IAnnouncement } from "../utils/types";

// Create New Announcement
export const createAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingAnnouncement = await Announcement.findOne({
      title: req.body.title,
    });
    if (existingAnnouncement) {
      return res
        .status(400)
        .json({ message: "An announcement with this title already exists" });
    }

    const announcement = new Announcement({
      ...req.body,
      createdBy: req.userId,
    });

    await announcement.save();
    res.status(201).json(announcement);
  } catch (error) {
    next(error);
  }
};

// Fetch All Announcements
export const fetchAnnouncements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const announcements = await Announcement.find().populate("createdBy");
    res.json(announcements);
  } catch (error) {
    next(error);
  }
};

// Fetch Single Announcement By ID
export const fetchSingleAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const announcement = await Announcement.findById(
      req.params.announcementId
    ).populate("createdBy");
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json(announcement);
  } catch (error) {
    next(error);
  }
};

// Delete Announcement
export const deleteAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const announcement = await Announcement.findById(req.params.announcementId);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    await Announcement.findByIdAndDelete(req.params.announcementId);
    res.json({ message: "Announcement deleted" });
  } catch (error) {
    next(error);
  }
};

// Update Announcement
export const updateAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const announcement = await Announcement.findById(req.params.announcementId);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    if (req.body.title) {
      const existingAnnouncement = await Announcement.findOne({
        title: req.body.title,
        _id: { $ne: req.params.announcementId },
      });
      if (existingAnnouncement) {
        return res
          .status(400)
          .json({ message: "An announcement with this title already exists" });
      }
    }

    Object.assign(announcement, req.body);
    await announcement.save();
    res.json(announcement);
  } catch (error) {
    next(error);
  }
};

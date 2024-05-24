import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";
import Download from "../models/download.model";
import createError from "../utils/createError";

// Create a new download
export const createDownload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, category, type, accessLevel } = req.body;
    const file = req.file;

    if (!file) {
      return next(createError(400, "File is required"));
    }

    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const newDownload = new Download({
      title,
      category,
      type,
      accessLevel,
      fileUrl: uploadResponse.url,
      createdBy: req.userId,
    });

    await newDownload.save();
    res.status(201).json(newDownload);
  } catch (error) {
    next(error);
  }
};

// Get all downloads
export const getDownloads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const downloads = await Download.find().populate(
      "createdBy",
      "username email"
    );
    res.json(downloads);
  } catch (error) {
    next(error);
  }
};

// Update a download
export const updateDownload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, category, type, accessLevel } = req.body;
    const file = req.file;

    const download = await Download.findById(req.params.id);
    if (!download) {
      return next(createError(404, "Download not found"));
    }

    if (title) download.title = title;
    if (category) download.category = category;
    if (type) download.type = type;
    if (accessLevel) download.accessLevel = accessLevel;

    if (file) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;
      const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
      download.fileUrl = uploadResponse.url;
    }

    await download.save();
    res.json(download);
  } catch (error) {
    next(error);
  }
};

// Delete a download
export const deleteDownload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const download = await Download.findByIdAndDelete(req.params.id);
    if (!download) {
      return next(createError(404, "Download not found"));
    }
    res.json({ message: "Download deleted successfully" });
  } catch (error) {
    next(error);
  }
};

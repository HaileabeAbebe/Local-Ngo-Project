import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import cloudinary from "cloudinary";
import News from "../models/news.model";
import { INews } from "../utils/types";

// Create New News Article
export const createNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingNews = await News.findOne({
      title: req.body.title,
    });
    if (existingNews) {
      return res.status(400).json({
        message: "A news article with this title already exists",
      });
    }

    const imageFiles = (req.files as any)["imageFiles"];

    const news = new News({
      ...req.body,
      createdBy: req.userId,
    });

    const imageUrls = await uploadImages(imageFiles);
    news.imageUrls = imageUrls;

    await news.save();
    res.status(201).json(news);
  } catch (error) {
    next(error);
  }
};

// Update News Article
export const updateNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedNews: INews = req.body;

    const imageFiles = (req.files as any)?.["imageFiles"];
    let updatedImageUrls: string[] = [];

    if (imageFiles) {
      updatedImageUrls = await uploadImages(imageFiles);
    }

    const news = await News.findById(req.params.newsId);
    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }

    news.imageUrls = [...updatedImageUrls, ...(news.imageUrls || [])];

    Object.assign(news, updatedNews);

    await news.save();
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

export const deleteNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news = await News.findById(req.params.newsId);
    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }
    await News.findByIdAndDelete(req.params.newsId);
    res.json({ message: "News article deleted" });
  } catch (error) {
    next(error);
  }
};

// Fetch All News Articles
export const fetchNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news = await News.find().populate("createdBy");
    res.json(news);
  } catch (error) {
    next(error);
  }
};

// Fetch Single News Article By id
export const fetchSingleNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news = await News.findById(req.params.newsId).populate("createdBy");
    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }
    res.json(news);
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

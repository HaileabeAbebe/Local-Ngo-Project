import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import cloudinary from "cloudinary";
import Project from "../models/project.model";
import { IProject } from "../utils/types";

// Fetch All Projects
export const fetchProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// Fetch Single Project By id
export const fetchProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// Create New Project
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if a project with the same title already exists for the same user
    const existingProject = await Project.findOne({
      title: req.body.title,
    });
    if (existingProject) {
      return res.status(400).json({
        message: "A project with this title already exists",
      });
    }

    // Extracting the uploaded files and the new project data from t  he request.
    const imageFiles = (req.files as any)["imageFiles"];
    const docFiles = (req.files as any)["docFiles"];

    const project = new Project({
      ...req.body,
      createdBy: req.userId,
    });

    // Uploading each image to Cloudinary and getting the URLs.
    const imageUrls = await uploadImages(imageFiles);
    const docUrls = await uploadDocs(docFiles);
    project.docUrls = docUrls;

    // Adding the image URLs, the last updated date, and the user ID to the new project data.
    project.imageUrls = imageUrls;
    project.lastUpdated = new Date();

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// Update project
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedProject: IProject = req.body;
    updatedProject.lastUpdated = new Date();

    const imageFiles = (req.files as any)?.["imageFiles"];
    const docFiles = (req.files as any)?.["docFiles"];
    let updatedImageUrls: string[] = [];
    let updatedDocUrls: string[] = [];

    if (imageFiles) {
      updatedImageUrls = await uploadImages(imageFiles);
    }
    if (docFiles) {
      updatedDocUrls = await uploadDocs(docFiles);
    }

    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.imageUrls = [...updatedImageUrls, ...(project.imageUrls || [])];
    project.docUrls = [...updatedDocUrls, ...(project.docUrls || [])];

    Object.assign(project, updatedProject);

    await project.save();
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    await Project.findByIdAndDelete(req.params.projectId);
    res.json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    // Each image file is converted into a format called base64. This is a common way to encode binary data, like images, into text.
    const b64 = Buffer.from(image.buffer).toString("base64");

    // A data URI is a string that represents the image data. It includes the image's MIME type (a standard that indicates the nature and format of a document or a file), followed by the base64-encoded image data.
    let dataURI = "data:" + image.mimetype + ";base64," + b64;

    // The data URI is then uploaded to Cloudinary. Cloudinary is a cloud-based service that provides an end-to-end image and video management solution including uploads, storage, manipulations, optimizations and delivery.
    // The 'await' keyword is used to wait for the upload to finish before moving on. This is necessary because uploading an image can take some time, and we don't want to proceed until we know the upload was successful.
    const res = await cloudinary.v2.uploader.upload(dataURI);

    // Once the upload is complete, Cloudinary provides us with a URL where the image can be accessed. We return this URL so it can be used later.
    return res.url;
  });

  // Waiting for all the images to be uploaded.
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

async function uploadDocs(docFiles: Express.Multer.File[]) {
  const uploadPromises = docFiles.map(async (doc) => {
    const b64 = Buffer.from(doc.buffer).toString("base64");

    let dataURI = "data:" + doc.mimetype + ";base64," + b64;

    const res = await cloudinary.v2.uploader.upload(dataURI);

    return res.url;
  });

  const docUrls = await Promise.all(uploadPromises);
  return docUrls;
}

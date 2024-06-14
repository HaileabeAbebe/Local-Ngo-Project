import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import cloudinary from "cloudinary";
import Project from "../models/project.model";
import { IProject } from "../utils/types";

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

    // Check if a project with the same title already exists
    const existingProject = await Project.findOne({ title: req.body.title });
    if (existingProject) {
      return res
        .status(400)
        .json({ message: "A project with this title already exists" });
    }

    // Extract uploaded files and new project data from the request
    const imageFiles = (req.files as any)?.imageFiles;
    const docFiles = (req.files as any)?.docFiles;

    const project = new Project({ ...req.body, createdBy: req.userId });

    // Upload images to Cloudinary and get URLs
    const imageUrls = await uploadFiles(imageFiles);

    // Upload documents to Cloudinary and get URLs, if any
    const docUrls = docFiles ? await uploadFiles(docFiles) : [];
    project.docUrls = docUrls;
    project.imageUrls = imageUrls;

    // Save the new project to the database
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// Delete a Project
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Find the project by ID
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete the project
    await Project.findByIdAndDelete(req.params.projectId);
    res.json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};

// Fetch All Projects
export const fetchProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch all projects and populate the createdBy field
    const projects = await Project.find().populate("createdBy");
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// Fetch Single Project By ID
export const fetchSingleProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Find project by ID and populate the createdBy field
    const project = await Project.findById(req.params.projectId).populate(
      "createdBy"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// Update Project
export const updateProject = async (
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

    // Extract updated project data from the request body
    const updatedProject: IProject = req.body;

    // Extract image and document files from the request
    const imageFiles = (req.files as any)?.imageFiles;
    const docFiles = (req.files as any)?.docFiles;

    // Find the existing project by ID and update it
    const project = await Project.findOneAndUpdate(
      { _id: req.params.projectId },
      updatedProject,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Upload image files to Cloudinary if any
    if (imageFiles && imageFiles.length > 0) {
      const updatedImageUrls = await uploadFiles(imageFiles);
      project.imageUrls = [...updatedProject.imageUrls, ...updatedImageUrls];
    }

    // Upload document files to Cloudinary if any
    if (docFiles && docFiles.length > 0) {
      const updatedDocUrls = await uploadFiles(docFiles);
      project.docUrls = [...project.docUrls, ...updatedDocUrls];
    }

    // Save the updated project
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

async function uploadFiles(files: Express.Multer.File[] | undefined) {
  if (!files || !Array.isArray(files)) {
    return [];
  }

  const uploadPromises = files.map(async (file) => {
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  return await Promise.all(uploadPromises);
}

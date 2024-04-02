// controllers/adminController.ts
import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import createError from "../utils/createError";
import { validationResult } from "express-validator";

export const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (role !== "user" && role !== "editor" && role !== "admin") {
      return next(createError(400, "Invalid role"));
    }

    user.role = role;
    await user.save();

    return res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, role, email } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username, email });
    if (existingUser) {
      return next(createError(409, "User already exists"));
    }

    // Create the user
    const user = new User({
      username,
      password,
      role,
      email,
    });
    await user.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    // Find the user
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Delete the user
    await User.deleteOne({ _id: userId });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

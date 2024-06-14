import { NextFunction, Request, Response } from "express";
import User, { IUser, Role } from "../models/user.model";
import createError from "../utils/createError";

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return next(createError(404, "User not found"));
  }

  res.json(user);
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const fetchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find(
      {},
      "username role email isGoogleUser profilePicture"
    );
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!Object.values(Role).includes(role)) {
    return next(createError(400, "Invalid role"));
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import User, { IUser } from "../models/user.model";
import createError from "../utils/createError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return next(createError(400, "User with this email already exists"));
    }

    user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY as string
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

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

// export const updateProfile = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const user = await User.findById(req.userId);

//   if (!user) {
//     return next(createError(404, "User not found"));
//   }

//   user.username = req.body.username;
//   user.email = req.body.email;
//   user.password = req.body.password;

//   try {
//     await user.save();
//     res.json({ message: "Profile updated successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

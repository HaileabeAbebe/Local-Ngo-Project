import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return next(createError(400, "Invalid Credentials"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      {
        return next(createError(400, "Invalid Credentials"));
      }
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY as string
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    next(error);
  }
};

// This function is used to validate the token of the authenticated user.
export const validateToken = (
  req: Request, // The request object, which contains information about the HTTP request.
  res: Response, // The response object, used to send back the desired HTTP response.
  next: NextFunction // The next function in the middleware chain.
) => {
  try {
    // Check if the userId and role exist in the request object.
    // These should have been set in the isAuthenticated middleware.
    if (!req.userId || !req.role) {
      // If either the userId or role doesn't exist, call the next function with an error.
      // This will skip any remaining route handlers and go straight to the error handling middleware.
      return next(createError(401, "Invalid token"));
    }

    // If the userId and role do exist, send them back in the response.
    // This means the token is valid and the user is authenticated.
    res.status(200).send({ userId: req.userId, role: req.role });
  } catch (error) {
    // If there's an error at any point in the try block, call the next function with the error.
    // This will skip any remaining route handlers and go straight to the error handling middleware.
    next(error);
  }
};

// Sign-Out
export const signOut = async (req: Request, res: Response) => {
  res
    .clearCookie("auth_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

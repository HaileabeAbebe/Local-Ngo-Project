import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import createError from "../utils/createError";

// Sign up
export const signUp = async (
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

// Sign in
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
    if (!user || !user.password) {
      return next(createError(400, "Username or Password is incorrect"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      {
        return next(createError(400, "Username or Password is incorrect"));
      }
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "2w" }
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

// Refresh Token
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const newToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "2w" }
    );

    res.cookie("auth_token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    next(error);
  }
};

// Google Sign-in

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return next(createError(401, "Google sign-in failed: Invalid payload"));
    }

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = new User({
        email: payload.email,
        username: payload.name,
        profilePicture: payload.picture,
        isGoogleUser: true,
      });
      await user.save();
    } else if (!user.isGoogleUser) {
      // Update existing user profile picture and isGoogleUser if not already set
      user.profilePicture = payload.picture;
      user.isGoogleUser = true;
      await user.save();
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "2w" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "User logged in with Google successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      // Added type guard
      next(createError(401, "Google sign-in failed: " + error.message));
    } else {
      next(createError(401, "Google sign-in failed"));
    }
  }
};

// Sign-Out
export const signOut = async (req: Request, res: Response) => {
  res
    .clearCookie("auth_token", {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "User has been logged out." });
};

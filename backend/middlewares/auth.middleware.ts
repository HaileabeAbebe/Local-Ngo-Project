import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import createError from "../utils/createError";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      role: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token from the cookies
    const token = req.cookies.auth_token;

    // Verify the token
    if (!token) {
      return next(createError(401, "Please authenticate"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      userId: string;
      role: string;
    };

    // Store the user information in the req object
    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    next(error);
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "admin") {
    return next(createError(403, "User is not authorized"));
  }
  next();
};

export const isEditor = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "editor") {
    return next(createError(403, "User is not authorized"));
  }
  next();
};

export const isAdminOrEditor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.role !== "admin" && req.role !== "editor") {
    // return next(createError(403, "User is not authorized"));
    return res.status(403).json({ message: "User is not authorized" });
  }
  next();
};

export const isOwner =
  (model: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await model.findById(req.params.id);
      if (!item) {
        return next(createError(404, "Item not found"));
      }

      // Check if the current user is the owner of the item
      if (item.createdBy.toString() !== req.userId) {
        return next(createError(403, "User is not authorized"));
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export const isAdminOrOwner =
  (model: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await model.findById(req.params.projectId);
      if (!item) {
        return next(createError(404, "Item not found"));
      }

      // Check if the current user is the owner of the item or an admin
      if (item.createdBy.toString() !== req.userId && req.role !== "admin") {
        return next(
          createError(
            403,
            "User is not authorized, you should be admin or the owner of this post to perform this action"
          )
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };

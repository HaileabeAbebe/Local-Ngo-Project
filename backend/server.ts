import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import adminRoutes from "./routes/admin.route";
import projectRoutes from "./routes/project.route";
import { CustomError } from "./utils/createError";

// Create an instance of the Express server
const app = express();
// Define the port to run the server on
const port = process.env.PORT || 8000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose.connect(process.env.MONGODB_CONNECTION_STRING_LOCAL as string);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

// handling error
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  res.status(errorStatus).send(errorMessage);
  next();
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

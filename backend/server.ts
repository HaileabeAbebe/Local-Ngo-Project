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
import newsRoutes from "./routes/news.route";
import blogRoutes from "./routes/blog.route";
import eventRoutes from "./routes/event.route";
import announcementRoutes from "./routes/announcement.route";
import downloadRoutes from "./routes/download.route";
import { CustomError } from "./utils/createError";

// Create an instance of the Express server
const app = express();
// Define the port to run the server on
const port = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.split(",")
        : [];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/downloads", downloadRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/announcements", announcementRoutes);

// handling error
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Network Issue your connection is slow";
  res.status(errorStatus).send(errorMessage);
  next();
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

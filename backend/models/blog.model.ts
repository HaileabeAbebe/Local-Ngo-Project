// blog.model.ts
import mongoose from "mongoose";

interface IBlog extends mongoose.Document {
  title: string;
  content: string;
  date: Date;
  createdBy: mongoose.Schema.Types.ObjectId; // Reference to User model
  imageUrls: string[];
  lastUpdated: Date;
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrls: { type: [String] },
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model<IBlog>("Blog", blogSchema);

import mongoose from "mongoose";

interface IBlog extends mongoose.Document {
  title: string;
  content: string;
  date: Date;
  author: mongoose.Schema.Types.ObjectId; // Reference to User model
  imageURL: string;
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageURL: { type: String },
});

export default mongoose.model<IBlog>("Blog", blogSchema);

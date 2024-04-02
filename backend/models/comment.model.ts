import mongoose from "mongoose";

// Define the Comment interface
interface IComment extends mongoose.Document {
  content: string;
  date: Date;
  author: mongoose.Schema.Types.ObjectId; // Reference to User model
  post: mongoose.Schema.Types.ObjectId; // Reference to News/Blog/Project model
  postType: string; // 'news', 'blog', 'project'
}

// Define the Comment schema
const commentSchema = new mongoose.Schema<IComment>({
  // The content field is required
  content: { type: String, required: true },

  // The date field defaults to the current date
  date: { type: Date, default: Date.now },

  // The author field is a reference to the User model
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // The post field is a reference to the post the comment is for
  post: { type: mongoose.Schema.Types.ObjectId, required: true },

  // The postType field indicates whether the comment is for a news article, blog post, or project
  postType: { type: String, enum: ["news", "blog", "project"], required: true },
});

export default mongoose.model<IComment>("Comment", commentSchema);

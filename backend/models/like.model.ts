import mongoose from "mongoose";

// Define the Like interface
interface ILike extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId; // Reference to User model
  post: mongoose.Schema.Types.ObjectId; // Reference to News/Blog/Project model
  postType: string; // 'news', 'blog', 'project'
}

// Define the Like schema
const likeSchema = new mongoose.Schema<ILike>({
  // The user field is a reference to the User model
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // The post field is a reference to the post the like is for
  post: { type: mongoose.Schema.Types.ObjectId, required: true },

  // The postType field indicates whether the like is for a news article, blog post, or project
  postType: { type: String, enum: ["news", "blog", "project"], required: true },
});

export default mongoose.model<ILike>("Like", likeSchema);

import mongoose from "mongoose";

interface INews extends mongoose.Document {
  title: string;
  content: string;
  date: Date;
  author: mongoose.Schema.Types.ObjectId; // Reference to User model
  imageURL: string;
}

const newsSchema = new mongoose.Schema<INews>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageURL: { type: String },
});

export default mongoose.model<INews>("News", newsSchema);

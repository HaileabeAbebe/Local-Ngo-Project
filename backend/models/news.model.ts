import mongoose from "mongoose";

interface INews extends mongoose.Document {
  title: string;
  content: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  imageUrls: string[];
}

const newsSchema = new mongoose.Schema<INews>(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true, minlength: 5 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrls: {
      type: [String],
      validate: [arrayLimit, "{PATH} exceeds the limit of 6 images"],
    },
  },
  { timestamps: true }
);

function arrayLimit(val: string[]) {
  return val.length <= 6;
}

export default mongoose.model<INews>("News", newsSchema);

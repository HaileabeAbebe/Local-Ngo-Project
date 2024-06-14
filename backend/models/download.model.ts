import mongoose from "mongoose";

export interface IDownload extends mongoose.Document {
  title: string;
  category: string;
  type: "manual" | "strategy" | "others";
  accessLevel: "public" | "protected" | "private";
  fileUrl: string;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const downloadSchema = new mongoose.Schema<IDownload>(
  {
    title: { type: String, required: true },
    category: String,
    type: {
      type: String,
      enum: ["manual", "strategy", "others"],
      required: true,
    },
    accessLevel: {
      type: String,
      enum: ["public", "protected", "private"],
      required: true,
    },
    fileUrl: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Download = mongoose.model<IDownload>("Download", downloadSchema);

export default Download;

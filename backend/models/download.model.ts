import mongoose from "mongoose";

export interface IDownload extends mongoose.Document {
  title: string;
  category: string;
  type: "manual" | "strategy";
  accessLevel: "public" | "protected";
  fileUrl: string;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const downloadSchema = new mongoose.Schema<IDownload>(
  {
    title: { type: String, required: true },
    category: String,
    type: { type: String, enum: ["manual", "strategy"], required: true },
    accessLevel: {
      type: String,
      enum: ["public", "protected"],
      required: true,
    },
    fileUrl: { type: String, required: true },
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

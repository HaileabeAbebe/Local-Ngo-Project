import mongoose from "mongoose";

interface IProject extends mongoose.Document {
  title: string;
  description: string;
  status: string; // 'ongoing', 'finished'
  startDate: Date;
  endDate: Date;
  imageUrls: string[];
  docUrls: string[];
  createdBy: mongoose.Schema.Types.ObjectId;
  isApproved: boolean;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["ongoing", "finished"], required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    imageUrls: {
      type: [String],
      validate: [
        imageArrayLimit,
        "{PATH} exceeds the limit of 6 images or does not meet the minimum of 1 image",
      ],
    },
    docUrls: {
      type: [String],
      // validate: [docArrayLimit, "{PATH} exceeds the limit of 3 documents"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

function imageArrayLimit(val: string[]) {
  return val.length >= 1 && val.length <= 6;
}

export default mongoose.model<IProject>("Project", projectSchema);

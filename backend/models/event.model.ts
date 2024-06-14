import mongoose from "mongoose";

interface IEvent extends mongoose.Document {
  title: string;
  description: string;
  date: Date;
  createdBy: mongoose.Schema.Types.ObjectId;
  imageUrls: string[];
}

const eventSchema = new mongoose.Schema<IEvent>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, minlength: 5 },
    date: { type: Date, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrls: {
      type: [String],
      validate: [arrayLimit, "{PATH} exceeds the limit of 5 images"],
    },
  },
  { timestamps: true }
);

function arrayLimit(val: string[]) {
  return val.length <= 5;
}

export default mongoose.model<IEvent>("Event", eventSchema);

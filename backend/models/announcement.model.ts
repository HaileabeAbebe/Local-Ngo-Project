import mongoose from "mongoose";

interface IAnnouncement extends mongoose.Document {
  title: string;
  content: string;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const announcementSchema = new mongoose.Schema<IAnnouncement>(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true, minlength: 5 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAnnouncement>(
  "Announcement",
  announcementSchema
);

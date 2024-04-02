import mongoose from "mongoose";

interface ITestimonial extends mongoose.Document {
  name: string;
  testimonial: string;
  date: Date;
  imageURL: string;
  user: mongoose.Schema.Types.ObjectId; // Reference to User model
}

const testimonialSchema = new mongoose.Schema<ITestimonial>({
  name: { type: String, required: true },
  testimonial: { type: String, required: true },
  date: { type: Date, default: Date.now },
  imageURL: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<ITestimonial>("Testimonial", testimonialSchema);

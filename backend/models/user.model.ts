import mongoose from "mongoose";
import bcrypt from "bcrypt";

export enum Role {
  Admin = "admin",
  Editor = "editor",
  User = "user",
}

export interface IUser extends mongoose.Document {
  username: string;
  password?: string;
  role: Role;
  email: string;
  isGoogleUser: boolean;
  profilePicture?: string;
  [key: string]: any;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String },
    role: { type: String, enum: Object.values(Role), default: Role.User },
    email: { type: String, required: true, unique: true },
    isGoogleUser: { type: Boolean, default: false },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model<IUser>("User", userSchema);

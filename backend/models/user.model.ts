import mongoose from "mongoose";
import bcrypt from "bcrypt";

export enum Role {
  Admin = "admin",
  Editor = "editor",
  User = "user",
}

// Define the User interface
export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  role: Role;
  email: string;
  [key: string]: any;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // The role field can be 'user', 'editor', or 'admin', and defaults to 'user'
  role: { type: String, enum: ["user", "editor", "admin"], default: "user" },
  email: { type: String, required: true, unique: true },
});

/**
 * A pre-save hook that hashes the user's password before saving it to the database.
 * @param next - a function that must be called to continue the save process
 */
userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model<IUser>("User", userSchema);

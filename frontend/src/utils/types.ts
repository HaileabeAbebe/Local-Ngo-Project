export enum Role {
  Admin = "admin",
  Editor = "editor",
  User = "user",
}

// Define the User interface
export interface IUser {
  _id: string;
  username: string;
  password: string;
  role: Role;
  email: string;
}

export interface IProject {
  _id: string;
  title: string;
  description: string;
  status: string; // 'ongoing', 'finished'
  startDate: Date;
  endDate: Date;
  imageUrls: string[];
  docUrls: string[];
  createdBy: IUser;
  isApproved: boolean;
  lastUpdated: Date;
}

// Blog post
export interface IBlog {
  _id: string;
  title: string;
  content: string;
  date: Date;
  createdBy: string;
  imageURLs: string[];
}
// BlogFormData type
export interface BlogFormData {
  _id: string;
  title: string;
  content: string;
  date: Date;
  createdBy: string;
  imageFiles: FileList;
  imageUrls: string[];
}
export interface INews {
  _id: string;
  title: string;
  content: string;
  date: Date;
  createdBy: IUser;
  imageUrls: string[];
  updatedAt: Date;
  createdAt: Date;
}

export interface IDownload {
  _id: string;
  title: string;
  category: string;
  type: "manual" | "strategy";
  accessLevel: "public" | "protected";
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

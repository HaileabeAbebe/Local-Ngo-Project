// User
export enum Role {
  Admin = "admin",
  Editor = "editor",
  User = "user",
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  role: Role;
  email: string;
  isGoogleUser: boolean;
  profilePicture?: string;
}
export type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
};

export type SignInFormData = {
  email: string;
  password: string;
};

// Project
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
  updatedAt: Date;
  createdAt: Date;
}

export type ProjectFormData = {
  _id: string;
  title: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  imageFiles: FileList;
  imageUrls: string[];
  docFiles: FileList;
  docUrls: string[];
  updatedAt?: string;
  createdAt?: string;
};

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

// News
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

// Download
export interface IDownload {
  _id: string;
  title: string;
  category: string;
  type: "manual" | "strategy" | "other";
  accessLevel: "public" | "protected" | "private";
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  date: Date;
  createdBy: IUser;
  imageUrls: string[];
  imageFiles: FileList;
  updatedAt: Date;
  createdAt: Date;
}

export type EventFormData = {
  _id: string;
  title: string;
  description: string;
  date: Date;
  createdBy: IUser;
  imageFiles: FileList;
  imageUrls: string[];
};

export interface IAnnouncement {
  _id: string;
  title: string;
  content: string;
  createdBy: IUser;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

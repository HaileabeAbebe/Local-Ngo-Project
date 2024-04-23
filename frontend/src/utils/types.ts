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
  title: string;
  description: string;
  status: string; // 'ongoing', 'finished'
  startDate: Date;
  endDate: Date;
  imageUrls: string[];
  createdBy: string;
  isApproved: boolean;
  lastUpdated: Date;
}

// Blog post
export interface IBlog {
  _id: string;
  title: string;
  content: string;
  date: Date;
  author: string;
  imageURLs: string[];
}
// BlogFormData type
export interface BlogFormData {
  _id: string;
  title: string;
  content: string;
  date: Date;
  author: string;
  imageFiles: FileList;
  imageUrls: string[];
}

// export interface INews {
//   _id: string;
//   title: string;
//   content: string;
//   date: Date;
//   author: string; // Reference to User model
//   imageURL: string;
// }

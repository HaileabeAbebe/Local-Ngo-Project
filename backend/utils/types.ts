export enum Role {
  Admin = "admin",
  Editor = "editor",
  User = "user",
}

// Define the User interface
export interface IUser {
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
  docUrls: string[];
  createdBy: string;
  isApproved: boolean;
}

export interface INews {
  title: string;
  content: string;
  date: Date;
  createdBy: string;
  imageUrls: string[];
}

export interface IDownload {
  title: string;
  category: string;
  type: "manual" | "strategy" | "other";
  accessLevel: "public" | "protected" | "private";
  fileUrl: string;
  createdBy: string;
  createdAt: string;
}

export interface IEvent {
  title: string;
  description: string;
  date: Date;
  createdBy: string;
  imageUrls: string[];
}

export interface IAnnouncement {
  title: string;
  content: string;
  createdBy: string;
}

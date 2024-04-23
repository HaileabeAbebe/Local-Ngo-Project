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

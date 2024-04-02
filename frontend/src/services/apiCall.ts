import { SignInFormData } from "../pages/SignIn";
import { RegisterFormData } from "../pages/SignUp";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// SignUp
export const signUp = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

// SignIn
export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

// Validate Token
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

// Logout
export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during Sign out");
  }
};

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching projects");
  }
  return response.json();
};

export const fetchProject = async (projectId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching project detail");
  }
  return response.json();
};

// Add Project
export const addProject = async (projectFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: "POST",
    credentials: "include",
    body: projectFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel!");
  }

  return response.json();
};

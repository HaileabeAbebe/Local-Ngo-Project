import { IProject } from "../components/molecules/ProjectCard";
import { SignInFormData } from "../pages/SignIn";
import { RegisterFormData } from "../pages/SignUp";
import { IBlog, INews } from "../utils/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// SignUp
export const signUp = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/sign-up`, {
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
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
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

// SignOut
export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during Sign out");
  }
};

// Validate Token
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

// Get Profile (user)
export const fetchProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// Fetch Projects
export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching projects");
  }
  return response.json();
};

// Fetch Single Project By Id
export const fetchProjectById = async (projectId: string) => {
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
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

// Edit Project
export const updateProjectById = async (
  projectFormData: FormData
): Promise<IProject> => {
  const response = await fetch(
    `${API_BASE_URL}/api/projects/${projectFormData.get("projectId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: projectFormData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  console.log(response);
  return response.json();
};

// Delete a project
export const deleteProjectById = async (projectId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error deleting project");
  }

  // if (!response.ok) {
  //   const errorData = await response.json();
  //   throw new Error(errorData.message);
  // }
};

// fetch Blogs
export const fetchBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/api/blogs`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching blogs");
  }

  return response.json();
};

// fetch Single Blog By Id
export const fetchBlogById = async (blogId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching blog detail");
  }

  return response.json();
};

// Add Blog
export const addBlog = async (blogFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/blogs`, {
    method: "POST",
    credentials: "include",
    body: blogFormData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

// Edit Blog
export const updateBlogById = async (
  blogFormData: FormData
): Promise<IBlog> => {
  const response = await fetch(
    `${API_BASE_URL}/api/blogs/${blogFormData.get("blogId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: blogFormData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  console.log(response);
  return response.json();
};

// Delete a blog
export const deleteBlogById = async (blogId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error deleting blog");
  }

  // if (!response.ok) {
  //   const errorData = await response.json();
  //   throw new Error(errorData.message);
  // }
};

// fetch News
export const fetchNews = async () => {
  const response = await fetch(`${API_BASE_URL}/api/news`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching news");
  }

  return response.json();
};

// fetch single news by id
export const fetchNewsById = async (newsId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/news/${newsId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching news detail");
  }

  return response.json();
};

// Add news

export const addNews = async (newsFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/news`, {
    method: "POST",
    credentials: "include",
    body: newsFormData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

// Edit news
export const updateNewsById = async (
  newsFormData: FormData
): Promise<INews> => {
  const response = await fetch(
    `${API_BASE_URL}/api/news/${newsFormData.get("newsId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: newsFormData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  console.log(response);
  return response.json();
};

// detail news
export const deleteNewsById = async (newsId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/news/${newsId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error deleting news");
  }

  // if (!response.ok) {
  //   const errorData = await response.json();
  //   throw new Error(errorData.message);
  // }
};

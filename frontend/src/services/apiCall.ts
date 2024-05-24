import { IProject } from "../components/projects/ProjectCard";
import { SignInFormData } from "../pages/SignIn";
import { RegisterFormData } from "../pages/SignUp";
import { IBlog, IDownload, INews } from "../utils/types";
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

// Google SignIn

interface TokenResponse {
  credential: string;
}

export const googleSignIn = async (tokenResponse: TokenResponse) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/google-sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokenResponse),
  });

  let responseBody;
  try {
    responseBody = await response.json();
  } catch (error) {
    throw new Error("Failed to parse response");
  }

  if (!response.ok) {
    throw new Error(responseBody.message || "Google sign-in failed");
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
export const createProject = async (projectFormData: FormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      method: "POST",
      credentials: "include",
      body: projectFormData,
    });

    if (!response.ok) {
      // If response status is not OK, handle error
      if (response.status === 500) {
        // Handle 500 Internal Server Error
        throw new Error("Internal Server Error");
      } else {
        // For other error statuses, parse error response
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown Error");
      }
    }

    return response.json();
  } catch (error) {
    // Handle network errors or parsing errors
    throw new Error("Error processing request");
  }
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
export const createNews = async (newsFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/news`, {
    method: "POST",
    credentials: "include",
    body: newsFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add news!");
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};

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
};

// Download

export const createDownload = async (
  downloadFormData: FormData
): Promise<IDownload> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/downloads`, {
      method: "POST",
      credentials: "include",
      body: downloadFormData,
    });

    console.log(response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create download: ${response.status} ${response.statusText} - ${errorText}`
      );
    }
    const data: IDownload = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating download:", error);
    throw new Error(
      "There was a problem creating the download. Please try again later."
    );
  }
};

export const updateDownload = async (
  id: string,
  downloadFormData: FormData
): Promise<IDownload> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/downloads/${id}`, {
      method: "PUT",
      body: downloadFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update download: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data: IDownload = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating download:", error);
    throw new Error(
      "There was a problem updating the download. Please try again later."
    );
  }
};

export const fetchDownloads = async (): Promise<IDownload[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/downloads`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch downloads: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data: IDownload[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching downloads:", error);
    throw new Error(
      "There was a problem fetching the downloads. Please try again later."
    );
  }
};

export const fetchDownloadById = async (id: string): Promise<IDownload> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/downloads/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch download by ID: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data: IDownload = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching download by ID:", error);
    throw new Error(
      "There was a problem fetching the download. Please try again later."
    );
  }
};

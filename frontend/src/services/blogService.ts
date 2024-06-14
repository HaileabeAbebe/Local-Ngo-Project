import { IBlog } from "../utils/types";
import { handleResponse } from "../utils/apiUtils";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/api/blogs`, {
    credentials: "include",
  });

  return handleResponse(response);
};

export const fetchBlogById = async (blogId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}`, {
    credentials: "include",
  });

  return handleResponse(response);
};

export const addBlog = async (blogFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/blogs`, {
    method: "POST",
    credentials: "include",
    body: blogFormData,
  });

  return handleResponse(response);
};

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

  return handleResponse(response);
};

export const deleteBlogById = async (blogId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}`, {
    method: "DELETE",
    credentials: "include",
  });

  await handleResponse(response);
};

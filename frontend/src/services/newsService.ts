import { INews } from "../utils/types";
import { handleResponse } from "../utils/apiUtils";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchNews = async () => {
  const response = await fetch(`${API_BASE_URL}/api/news`, {
    credentials: "include",
  });

  return handleResponse(response);
};

export const fetchNewsById = async (newsId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/news/${newsId}`, {
    credentials: "include",
  });

  return handleResponse(response);
};

export const createNews = async (newsFormData: FormData): Promise<INews> => {
  const response = await fetch(`${API_BASE_URL}/api/news`, {
    method: "POST",
    credentials: "include",
    body: newsFormData,
  });

  return handleResponse(response);
};

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

  return handleResponse(response);
};

export const deleteNewsById = async (newsId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/news/${newsId}`, {
    method: "DELETE",
    credentials: "include",
  });

  await handleResponse(response);
};

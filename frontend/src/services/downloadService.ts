import { IDownload } from "../utils/types";
import { handleResponse } from "../utils/apiUtils";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createDownload = async (
  downloadFormData: FormData
): Promise<IDownload> => {
  const response = await fetch(`${API_BASE_URL}/api/downloads`, {
    method: "POST",
    credentials: "include",
    body: downloadFormData,
  });

  return handleResponse(response);
};

export const updateDownload = async (
  id: string,
  downloadFormData: FormData
): Promise<IDownload> => {
  const response = await fetch(`${API_BASE_URL}/api/downloads/${id}`, {
    method: "PUT",
    credentials: "include",
    body: downloadFormData,
  });

  return handleResponse(response);
};

export const fetchDownloads = async (): Promise<IDownload[]> => {
  const response = await fetch(`${API_BASE_URL}/api/downloads`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response);
};

export const fetchDownloadById = async (
  downloadId: string
): Promise<IDownload> => {
  const response = await fetch(`${API_BASE_URL}/api/downloads/${downloadId}`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response);
};

export const deleteDownloadById = async (downloadId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/downloads/${downloadId}`, {
    method: "DELETE",
    credentials: "include",
  });

  await handleResponse(response);
};

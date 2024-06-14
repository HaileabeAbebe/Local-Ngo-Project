import { IAnnouncement } from "../utils/types";
import { handleResponse } from "../utils/apiUtils";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAnnouncements = async () => {
  const response = await fetch(`${API_BASE_URL}/api/announcements`, {
    credentials: "include",
  });

  return handleResponse(response);
};

export const fetchAnnouncementById = async (announcementId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/announcements/${announcementId}`,
    {
      credentials: "include",
    }
  );

  return handleResponse(response);
};

export const createAnnouncement = async (
  announcementFormData: FormData
): Promise<IAnnouncement> => {
  const response = await fetch(`${API_BASE_URL}/api/announcements`, {
    method: "POST",
    credentials: "include",
    body: announcementFormData,
  });

  return handleResponse(response);
};

export const updateAnnouncementById = async (
  announcementFormData: FormData
): Promise<IAnnouncement> => {
  const response = await fetch(
    `${API_BASE_URL}/api/announcements/${announcementFormData.get(
      "announcementId"
    )}`,
    {
      method: "PUT",
      credentials: "include",
      body: announcementFormData,
    }
  );

  return handleResponse(response);
};

export const deleteAnnouncementById = async (announcementId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/announcements/${announcementId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  await handleResponse(response);
};

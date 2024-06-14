import { IEvent } from "../utils/types";
import { handleResponse } from "../utils/apiUtils";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchEvents = async (): Promise<IEvent[]> => {
  const response = await fetch(`${API_BASE_URL}/api/events`, {
    credentials: "include",
  });

  return handleResponse(response);
};

export const fetchEventById = async (eventId: string): Promise<IEvent> => {
  const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`, {
    credentials: "include",
  });

  return handleResponse(response);
};

export const createEvent = async (eventFormData: FormData): Promise<IEvent> => {
  const response = await fetch(`${API_BASE_URL}/api/events`, {
    method: "POST",
    credentials: "include",
    body: eventFormData,
  });

  return handleResponse(response);
};

export const updateEventById = async (
  eventFormData: FormData
): Promise<IEvent> => {
  const response = await fetch(
    `${API_BASE_URL}/api/events/${eventFormData.get("eventId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: eventFormData,
    }
  );

  return handleResponse(response);
};

export const deleteEventById = async (eventId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`, {
    method: "DELETE",
    credentials: "include",
  });

  await handleResponse(response);
};

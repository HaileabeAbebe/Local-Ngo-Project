import { handleResponse } from "../utils/apiUtils";
import { IProject } from "../utils/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    credentials: "include",
  });

  return handleResponse(response);
};

export const fetchProjectById = async (projectId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
    credentials: "include",
  });

  return handleResponse(response);
};

export const createProject = async (projectFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: "POST",
    credentials: "include",
    body: projectFormData,
  });

  return handleResponse(response);
};

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

  return handleResponse(response);
};

export const deleteProjectById = async (projectId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
    method: "DELETE",
    credentials: "include",
  });

  await handleResponse(response);
};

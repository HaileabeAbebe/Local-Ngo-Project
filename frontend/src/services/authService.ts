import { SignInFormData, RegisterFormData } from "../utils/types";
import { handleResponse } from "../utils/apiUtils";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signUp = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-up`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  await handleResponse(response);
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return handleResponse(response);
};

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

  return handleResponse(response);
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  });

  await handleResponse(response);
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  return handleResponse(response);
};

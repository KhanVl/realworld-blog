const API_URL = "https://realworld.habsida.net/api";

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error("Request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function getAuthToken() {
  return localStorage.getItem("rw_token");
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("rw_token", token);
  } else {
    localStorage.removeItem("rw_token");
  }
}

export async function apiRequest(path, options = {}, withAuth = false) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (withAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Token ${token}`;
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  return handleResponse(response);
}

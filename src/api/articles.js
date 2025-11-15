import { apiRequest } from "./client";

const API_URL = "https://realworld.habsida.net/api";

async function publicRequest(path) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = new Error("Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export function fetchArticles(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  return publicRequest(`/articles?limit=${limit}&offset=${offset}`);
}

export function fetchArticle(slug) {
  return publicRequest(`/articles/${slug}`);
}

export function fetchTags() {
  return publicRequest("/tags");
}

export function createArticle({ title, description, body, tagList }) {
  return apiRequest(
    "/articles",
    {
      method: "POST",
      body: JSON.stringify({ article: { title, description, body, tagList } }),
    },
    true,
  );
}

export function updateArticle(slug, { title, description, body, tagList }) {
  return apiRequest(
    `/articles/${slug}`,
    {
      method: "PUT",
      body: JSON.stringify({ article: { title, description, body, tagList } }),
    },
    true,
  );
}

export function deleteArticle(slug) {
  return apiRequest(`/articles/${slug}`, { method: "DELETE" }, true);
}

export function favoriteArticle(slug) {
  return apiRequest(`/articles/${slug}/favorite`, { method: "POST" }, true);
}

export function unfavoriteArticle(slug) {
  return apiRequest(`/articles/${slug}/favorite`, { method: "DELETE" }, true);
}

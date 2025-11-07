import { apiRequest } from "./client";

export function fetchArticles(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  return apiRequest(`/articles?limit=${limit}&offset=${offset}`);
}

export function fetchArticle(slug) {
  return apiRequest(`/articles/${slug}`);
}

export function createArticle({ title, description, body, tagList }) {
  return apiRequest(
    "/articles",
    {
      method: "POST",
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList,
        },
      }),
    },
    true,
  );
}

export function updateArticle(slug, { title, description, body, tagList }) {
  return apiRequest(
    `/articles/${slug}`,
    {
      method: "PUT",
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList,
        },
      }),
    },
    true,
  );
}

export function deleteArticle(slug) {
  return apiRequest(
    `/articles/${slug}`,
    {
      method: "DELETE",
    },
    true,
  );
}

export function favoriteArticle(slug) {
  return apiRequest(
    `/articles/${slug}/favorite`,
    {
      method: "POST",
    },
    true,
  );
}

export function unfavoriteArticle(slug) {
  return apiRequest(
    `/articles/${slug}/favorite`,
    {
      method: "DELETE",
    },
    true,
  );
}

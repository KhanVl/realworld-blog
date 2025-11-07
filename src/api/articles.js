const API_URL = "https://realworld.habsida.net/api";

export async function fetchArticles(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const response = await fetch(`${API_URL}/articles?limit=${limit}&offset=${offset}`);

    if (!response.ok) {
        throw new Error(`Ошибка загрузки статей: ${response.status}`);
    }

    return response.json();
}

export async function fetchArticle(slug) {
    const response = await fetch(`${API_URL}/articles/${slug}`);

    if (!response.ok) {
        throw new Error(`Ошибка загрузки статьи: ${response.status}`);
    }

    return response.json();
}
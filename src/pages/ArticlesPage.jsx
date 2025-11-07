import React, { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import TagList from "../components/TagList";

const PAGE_LIMIT = 10;

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const loadArticles = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchArticles(page, PAGE_LIMIT);
        if (!isCancelled) {
          setArticles(data.articles);
          setArticlesCount(data.articlesCount);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadArticles();

    return () => {
      isCancelled = true;
    };
  }, [page]);

  const totalPages = Math.ceil(articlesCount / PAGE_LIMIT);

  return (
    <div className="container">
      <TagList />

      {loading && <div className="status">Loading articles...</div>}
      {error && <div className="status status-error">{error}</div>}

      {!loading &&
        !error &&
        articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ArticlesPage;

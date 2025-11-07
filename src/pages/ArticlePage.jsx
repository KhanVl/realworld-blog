import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchArticle } from "../api/articles";

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const loadArticle = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchArticle(slug);
        if (!isCancelled) {
          setArticle(data.article);
        }
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadArticle();

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  if (loading) return <div className="container status">Loading article...</div>;
  if (error) return <div className="container status status-error">{error}</div>;
  if (!article) return null;

  const date = new Date(article.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container article-page">
      <Link to="/articles" className="back-link">
        ← Back to articles
      </Link>

      <div className="article-card">
        <div className="article-card-header">
          <div className="article-meta">
            <div className="author-avatar" />
            <div>
              <div className="author-name">{article.author?.username}</div>
              <div className="article-date">{date}</div>
            </div>
          </div>

          <button className="like-button" disabled>
            ❤ <span>{article.favoritesCount}</span>
          </button>
        </div>

        <h1 className="article-title">{article.title}</h1>
        <p className="article-description">{article.description}</p>

        <div className="tag-list">
          {article.tagList?.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="article-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
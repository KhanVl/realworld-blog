import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchArticle, deleteArticle } from "../api/articles";
import { useAuth } from "../AuthContext";
import ConfirmModal from "../components/ConfirmModal";

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
        if (!isCancelled) setError(err.message || "Failed to load article");
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadArticle();

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  const handleEdit = () => {
    navigate(`/articles/${slug}/edit`);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteArticle(slug);
      navigate("/articles");
    } catch (err) {
      console.error("Delete article error", err);
      alert("Failed to delete article.");
      setDeleting(false);
    }
  };

  if (loading) return <div className="container status">Loading article...</div>;
  if (error) return <div className="container status status-error">{error}</div>;
  if (!article) return null;

  const date = new Date(article.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const isAuthor = user && article.author?.username === user.username;

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

          <div className="article-actions">
            <button className="like-button" disabled>
              ❤ <span>{article.favoritesCount}</span>
            </button>

            {isAuthor && (
              <>
                <button
                  type="button"
                  className="article-edit-btn"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="article-delete-btn"
                  onClick={() => setDeleteOpen(true)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.body}
          </ReactMarkdown>
        </div>
      </div>

      <ConfirmModal
        open={deleteOpen}
        title="Delete article"
        text="Are you sure you want to delete this article?"
        loading={deleting}
        onCancel={() => !deleting && setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ArticlePage;
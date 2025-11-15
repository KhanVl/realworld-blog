import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { fetchArticle, updateArticle } from "../api/articles";

const EditArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(""); // <-- отдельное состояние ошибки загрузки
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState(null); // ошибки валидации при сабмите

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const data = await fetchArticle(slug);
        if (cancelled) return;
        const a = data.article;

        setInitialValues({
          mode: "edit",
          title: a.title,
          description: a.description,
          body: a.body,
          tags: a.tagList?.join(", ") || "",
        });
      } catch {
        if (!cancelled)
          setLoadError("Failed to load article. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setServerErrors(null);

    try {
      const tagList = values.tags
        ? values.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      const data = await updateArticle(slug, {
        title: values.title,
        description: values.description,
        body: values.body,
        tagList,
      });

      navigate(`/articles/${data.article.slug}`);
    } catch (e) {
      const apiErrors = e?.data?.errors;
      setServerErrors(
        apiErrors || {
          _global: ["Failed to update article. Please try again."],
        },
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !loadError) {
    return <div className="container status">Loading article...</div>;
  }

  if (loadError) {
    return (
      <div className="container status status-error">
        <p>{loadError}</p>
        <p style={{ marginTop: 12 }}>
          <Link to="/articles" className="back-link">
            ← Back to articles
          </Link>
        </p>
      </div>
    );
  }

  if (!initialValues) return null;

  return (
    <ArticleForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitting={submitting}
      serverErrors={serverErrors}
    />
  );
};

export default EditArticlePage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { fetchArticle, updateArticle } from "../api/articles";

const EditArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadArticle = async () => {
      setLoading(true);
      setServerErrors(null);

      try {
        const data = await fetchArticle(slug);
        if (cancelled) return;

        const article = data.article;

        setInitialValues({
          mode: "edit",
          title: article.title,
          description: article.description,
          body: article.body,
          tags: article.tagList?.join(", ") || "",
        });
      } catch (error) {
        if (!cancelled) {
          console.error("Load article error", error);
          setServerErrors({
            _global: ["Failed to load article. Please try again."],
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadArticle();

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
    } catch (error) {
      console.error("Update article error", error);
      const apiErrors = error?.data?.errors;

      if (apiErrors) {
        setServerErrors(apiErrors);
      } else {
        setServerErrors({
          _global: ["Failed to update article. Please try again."],
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !initialValues) {
    return <div className="container status">Loading article...</div>;
  }

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

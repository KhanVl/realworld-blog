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

  useEffect(() => {
    let cancelled = false;

    const loadArticle = async () => {
      setLoading(true);
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
        console.error("Load article error", error);
        if (!cancelled) {
          alert("Failed to load article");
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
      alert("Failed to update article. Please try again.");
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
    />
  );
};

export default EditArticlePage;

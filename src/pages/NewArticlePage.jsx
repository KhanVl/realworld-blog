import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { createArticle } from "../api/articles";

const NewArticlePage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const tagList = values.tags
        ? values.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

      const data = await createArticle({
        title: values.title,
        description: values.description,
        body: values.body,
        tagList,
      });

      navigate(`/articles/${data.article.slug}`);
    } catch (error) {
      console.error("Create article error", error);
      alert("Failed to create article. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ArticleForm
      initialValues={{ mode: "create", title: "", description: "", body: "", tags: "" }}
      onSubmit={handleSubmit}
      submitting={submitting}
    />
  );
};

export default NewArticlePage;
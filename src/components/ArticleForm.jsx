// src/components/ArticleForm.jsx
import React from "react";
import { useForm } from "react-hook-form";

const ArticleForm = ({ initialValues, onSubmit, submitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  return (
    <div className="container auth-container">
      <div className="auth-card">
        <h1 className="auth-title">{initialValues.mode === "edit" ? "Edit Article" : "New Article"}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="auth-field">
            <input
              type="text"
              placeholder="Title"
              className="auth-input"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && <p className="auth-error">{errors.title.message}</p>}
          </div>

          <div className="auth-field">
            <input
              type="text"
              placeholder="Short description"
              className="auth-input"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && <p className="auth-error">{errors.description.message}</p>}
          </div>

          <div className="auth-field">
            <textarea
              placeholder="Body"
              rows={10}
              className="auth-textarea"
              {...register("body", {
                required: "Body is required",
              })}
            />
            {errors.body && <p className="auth-error">{errors.body.message}</p>}
          </div>

          <div className="auth-field">
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="auth-input"
              {...register("tags")}
            />
          </div>

          <div className="auth-footer">
            <button type="submit" className="auth-button" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;
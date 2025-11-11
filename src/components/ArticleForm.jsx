import React from "react";
import { useForm } from "react-hook-form";

const ArticleForm = ({
  initialValues,
  onSubmit,
  submitting,
  serverErrors = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const fieldServerErrors = serverErrors || {};

  return (
    <div className="container auth-container">
      <div className="auth-card">
        <h1 className="auth-title">
          {initialValues.mode === "edit" ? "Edit Article" : "New Article"}
        </h1>

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
            {errors.title && (
              <p className="auth-error">{errors.title.message}</p>
            )}
            {fieldServerErrors.title && (
              <p className="auth-error">{fieldServerErrors.title.join(", ")}</p>
            )}
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
            {errors.description && (
              <p className="auth-error">{errors.description.message}</p>
            )}
            {fieldServerErrors.description && (
              <p className="auth-error">
                {fieldServerErrors.description.join(", ")}
              </p>
            )}
          </div>

          {/* Body */}
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
            {fieldServerErrors.body && (
              <p className="auth-error">{fieldServerErrors.body.join(", ")}</p>
            )}
          </div>

          <div className="auth-field">
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="auth-input"
              {...register("tags")}
            />
          </div>

          {fieldServerErrors._global && (
            <div className="auth-error-list">
              {fieldServerErrors._global.map((msg, idx) => (
                <p key={idx} className="auth-error">
                  {msg}
                </p>
              ))}
            </div>
          )}

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

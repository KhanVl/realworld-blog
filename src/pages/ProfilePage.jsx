import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthContext";

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      newPassword: "",
      image: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        email: user.email || "",
        newPassword: "",
        image: user.image || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (values) => {
    const payload = {
      username: values.username,
      email: values.email,
      image: values.image || null,
    };

    if (values.newPassword) {
      payload.password = values.newPassword;
    }

    try {
      await updateProfile(payload);
    } catch (error) {
      const serverErrors = error.data?.errors;

      if (serverErrors) {
        Object.entries(serverErrors).forEach(([field, messages]) => {
          const msg = messages.join(", ");

          if (
            field === "email" ||
            field === "username" ||
            field === "password" ||
            field === "image"
          ) {
            const formField = field === "password" ? "newPassword" : field;
            setError(formField, { type: "server", message: msg });
          } else {
            setError("root", { type: "server", message: msg });
          }
        });
      } else {
        setError("root", {
          type: "server",
          message: "Server error. Try again later.",
        });
      }
    }
  };

  return (
    <div className="container auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="auth-field">
            <input
              type="text"
              placeholder="Username"
              className="auth-input"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="auth-error">{errors.username.message}</p>
            )}
          </div>

          <div className="auth-field">
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="auth-error">{errors.email.message}</p>
            )}
          </div>

          <div className="auth-field">
            <input
              type="password"
              placeholder="New password"
              className="auth-input"
              {...register("newPassword", {
                minLength: { value: 6, message: "Min length is 6" },
                maxLength: { value: 40, message: "Max length is 40" },
              })}
            />
            {errors.newPassword && (
              <p className="auth-error">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="auth-field">
            <input
              type="url"
              placeholder="Avatar image URL"
              className="auth-input"
              {...register("image", {
                pattern: {
                  value: /^https?:\/\/\S+$/i,
                  message: "Invalid URL",
                },
              })}
            />
            {errors.image && (
              <p className="auth-error">{errors.image.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="auth-error center">{errors.root.message}</p>
          )}

          <div className="auth-footer">
            <button
              type="submit"
              className="auth-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

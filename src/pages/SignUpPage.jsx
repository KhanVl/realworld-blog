import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const SignUpPage = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (values) => {
    if (values.password !== values.repeatPassword) {
      setError("repeatPassword", {
        type: "validate",
        message: "Passwords must match",
      });
      return;
    }

    try {
      await signUp({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      navigate("/articles");
    } catch (error) {
      const serverErrors = error.data?.errors;

      if (serverErrors) {
        Object.entries(serverErrors).forEach(([field, messages]) => {
          const msg = messages.join(", ");

          if (field === "email" || field === "username" || field === "password") {
            setError(field, { type: "server", message: msg });
          } else {
            setError("root", { type: "server", message: msg });
          }
        });
      } else {
        setError("root", { type: "server", message: "Server error. Try again later." });
      }
    }
  };

  return (
    <div className="container auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="auth-field">
            <input
              type="text"
              placeholder="Username"
              className="auth-input"
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 20, message: "Max length is 20" },
              })}
            />
            {errors.username && <p className="auth-error">{errors.username.message}</p>}
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
            {errors.email && <p className="auth-error">{errors.email.message}</p>}
          </div>

          <div className="auth-field">
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min length is 6" },
                maxLength: { value: 40, message: "Max length is 40" },
              })}
            />
            {errors.password && <p className="auth-error">{errors.password.message}</p>}
          </div>

          <div className="auth-field">
            <input
              type="password"
              placeholder="Repeat password"
              className="auth-input"
              {...register("repeatPassword", {
                required: "Repeat password",
                validate: (value) =>
                  value === watch("password") || "Passwords must match",
              })}
            />
            {errors.repeatPassword && (
              <p className="auth-error">{errors.repeatPassword.message}</p>
            )}
          </div>

          <label className="auth-checkbox">
            <input
              type="checkbox"
              {...register("acceptTerms", {
                required: "You must accept personal data processing",
              })}
            />
            <span>I agree to personal data processing</span>
          </label>
          {errors.acceptTerms && (
            <p className="auth-error">{errors.acceptTerms.message}</p>
          )}

          {errors.root && <p className="auth-error center">{errors.root.message}</p>}

          <div className="auth-footer">
            <button type="submit" className="auth-button" disabled={isSubmitting}>
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          <p className="auth-subtext">
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
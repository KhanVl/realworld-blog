import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const SignInPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await signIn(values);
      navigate("/articles");
    } catch (error) {
      const serverErrors = error.data?.errors;

      if (serverErrors?.["email or password"]) {
        const message = serverErrors["email or password"].join(", ");
        setError("root", {
          type: "server",
          message: message || "Email or password is invalid",
        });
      } else {
        setError("root", {
          type: "server",
          message: "Login failed. Please check your credentials.",
        });
      }
    }
  };

  return (
    <div className="container auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Sign In</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
              placeholder="Password"
              className="auth-input"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="auth-error">{errors.password.message}</p>
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
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </div>

          <p className="auth-subtext">
            Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

import React from "react";
import type { AuthFormProps } from "../types/auth";

const AuthForm: React.FC<AuthFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  isLoading,
  isLoginMode,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="auth-form-redesigned" noValidate>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Minimum 6 characters"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
          minLength={6}
        />
      </div>

      {error && <div className="error-message-redesigned">{error}</div>}

      <button
        type="submit"
        className="submit-button"
        disabled={isLoading || !email || password.length < 6}
      >
        {isLoading ? "Loading..." : isLoginMode ? "Sign In" : "Create Account"}
      </button>
    </form>
  );
};

export default AuthForm;

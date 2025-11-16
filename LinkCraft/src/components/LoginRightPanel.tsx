import React from "react";
import AuthForm from "./AuthForm";
import type { AuthFormProps } from "../types/auth";

interface LoginRightPanelProps extends AuthFormProps {
  onToggleMode: () => void;
}

const LoginRightPanel: React.FC<LoginRightPanelProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  isLoading,
  isLoginMode,
  onSubmit,
  onToggleMode,
}) => {
  return (
    <div className="login-right">
      <div className="login-form-container">
        <div className="login-form-header">
          <h2>{isLoginMode ? "Welcome Back" : "Get Started"}</h2>
          <p>
            {isLoginMode ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>

        <AuthForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          isLoading={isLoading}
          isLoginMode={isLoginMode}
          onSubmit={onSubmit}
        />

        <div className="form-footer">
          <p>
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={onToggleMode}
              disabled={isLoading}
              className="toggle-link"
            >
              {isLoginMode ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRightPanel;

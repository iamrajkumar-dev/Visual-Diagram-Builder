import React, { useState } from 'react';
import { loginUser, signupUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import LoginLeftPanel from '../components/LoginLeftPanel';
import LoginRightPanel from '../components/LoginRightPanel';

const LoginPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError(null);
  };

  const toggleMode =() => {
    setIsLoginMode(prev => !prev);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);

      try {
        if (isLoginMode) {
          await loginUser(email.trim(), password);
        } else {
          await signupUser(email.trim(), password);
        }
        navigate('/dashboard', { replace: true });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err ?? 'Unexpected error');
        setError(message);
        console.error('Authentication error:', err);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <div className="login-wrapper">
      <LoginLeftPanel />
      <LoginRightPanel
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        isLoading={isLoading}
        isLoginMode={isLoginMode}
        onSubmit={handleSubmit}
        onToggleMode={toggleMode}
      />
    </div>
  );
};

export default LoginPage;

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from '../components/AuthForm';
import type { AuthFormProps } from '../types/auth';

describe('AuthForm', () => {
  const baseProps: AuthFormProps = {
    email: '',
    setEmail: jest.fn(),
    password: '',
    setPassword: jest.fn(),
    error: null,
    isLoading: false,
    isLoginMode: true,
    onSubmit: jest.fn() as unknown as (e: React.FormEvent) => Promise<void>,
  };

  it('renders inputs and submit button', () => {
    render(<AuthForm {...baseProps} />);
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('disables submit when email is empty or password too short', () => {
    render(<AuthForm {...baseProps} />);
    const btn = screen.getByRole('button', { name: /Sign In/i });
    expect(btn).toBeDisabled();
  });

  it('shows loading text and disabled button when isLoading is true', () => {
    render(<AuthForm {...baseProps} isLoading={true} />);
    expect(screen.getByRole('button', { name: /Loading\.\.\./i })).toBeDisabled();
  });

  it('calls setEmail and setPassword when typing', async () => {
    const user = userEvent.setup();
    const setEmail = jest.fn();
    const setPassword = jest.fn();

    render(<AuthForm {...baseProps} setEmail={setEmail} setPassword={setPassword} />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    await user.type(emailInput, 'a@b.com');
    await user.type(passwordInput, 'abcdef');

    expect(setEmail).toHaveBeenCalled();
    expect(setPassword).toHaveBeenCalled();
  });

  it('renders error message when error prop provided', () => {
    render(<AuthForm {...baseProps} error="Bad creds" />);
    expect(screen.getByText(/Bad creds/i)).toBeInTheDocument();
  });

  it('calls onSubmit when form submitted (click submit)', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn(async (e: React.FormEvent) => {
      e.preventDefault();
    });

    render(
      <AuthForm
        {...baseProps}
        email="a@b.com"
        password="abcdef"
        onSubmit={onSubmit as unknown as (e: React.FormEvent) => Promise<void>}
      />
    );

    const btn = screen.getByRole('button', { name: /Sign In/i });
    await user.click(btn);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});

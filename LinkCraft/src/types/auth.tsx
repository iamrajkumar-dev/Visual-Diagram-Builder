export type UserRole = 'Editor' | 'Viewer';

export interface AppUser {
  uid: string; 
  email: string; 
  role: UserRole; 
}

export interface AuthFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  isLoading: boolean;
  isLoginMode: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
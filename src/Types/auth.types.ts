export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface AuthApiResponse {
  message: string;
  user: User;
  token: string;
}

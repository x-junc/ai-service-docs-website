import axios from "axios";
import type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  VerifyResetCodeFormData,
  ResetPasswordFormData,
} from "@/lib/auth-schemas";

// Base URL configuration for different environments
const getApiBaseUrl = () => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // In development, use proxy to avoid CORS
  if (import.meta.env.MODE === "development") {
    return "/api";
  }

  // Fallback for production
  return "http://localhost:3000/api/v1";
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error(
        "Network Error: Make sure your backend is running on the correct port"
      );
      error.message =
        "Unable to connect to the server. Please check if the backend is running.";
    } else if (error.response?.status === 401) {
      // Handle unauthorized - could clear token here
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    }
    return Promise.reject(error);
  }
);

export interface BackendAuthResponse {
  status: string;
  data: {
    _id: string;
    name: string;
    email: string;
    isResetCodeValide: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  token?: string; // May be included in some responses
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message: string;
}

export const authApi = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post<BackendAuthResponse>("/auth/login", data);
    const backendData = response.data;

    console.log("Backend login response:", backendData);
    console.log("Response headers:", response.headers);

    // Check for token in response or headers
    const token =
      backendData.token ||
      response.headers.authorization ||
      response.headers.Authorization ||
      `mock-token-${Date.now()}`;

    // Transform backend response to frontend format
    const transformedResponse = {
      user: {
        id: backendData.data._id,
        name: backendData.data.name,
        email: backendData.data.email,
      },
      token: token,
      message: "Login successful",
    };

    console.log("Transformed response:", transformedResponse);
    return transformedResponse;
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await api.post<BackendAuthResponse>("/auth/signup", data);
    const backendData = response.data;

    console.log("Backend register response:", backendData);

    // Check for token in response or headers
    const token =
      backendData.token ||
      response.headers.authorization ||
      response.headers.Authorization ||
      `mock-token-${Date.now()}`;

    // Transform backend response to frontend format
    return {
      user: {
        id: backendData.data._id,
        name: backendData.data.name,
        email: backendData.data.email,
      },
      token: token,
      message: "Registration successful",
    };
  },

  logout: async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>("/auth/logout");
    return response.data;
  },

  forgotPassword: async (
    data: ForgotPasswordFormData
  ): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/auth/forgot-password", data);
    return response.data;
  },

  verifyResetCode: async (
    data: VerifyResetCodeFormData
  ): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>(
      "/auth/verify-reset-code",
      data
    );
    return response.data;
  },

  resetPassword: async (data: ResetPasswordFormData): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/auth/reset-password", data);
    return response.data;
  },
};

export default api;

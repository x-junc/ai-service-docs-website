import React, { createContext, useState, useEffect, ReactNode } from "react";
import { authApi } from "@/lib/auth-api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token on app load
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    console.log("AuthContext initialization:", { token, userData });

    if (token && userData && userData !== "undefined" && userData !== "null") {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("Parsed user from localStorage:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        console.log("Clearing corrupted localStorage data");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
      }
    } else {
      console.log("No valid auth data found, clearing localStorage");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    }

    setIsLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    console.log("AuthContext login called with:", { token, userData });
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
    console.log("User set in context:", userData);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

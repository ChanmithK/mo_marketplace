import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../types";
import { authApi } from "../api/auth.api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("user", JSON.stringify(response.user));
    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

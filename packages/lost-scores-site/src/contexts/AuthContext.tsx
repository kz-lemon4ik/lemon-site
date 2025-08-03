import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: number;
  username: string;
  osu_user_id: number;
  avatar_url: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/me`, {
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        setUser({
          id: userData.id,
          username: userData.username,
          osu_user_id: userData.osu_user_id,
          avatar_url: `https://a.ppy.sh/${userData.osu_user_id}`,
        });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    window.location.href = `${API_BASE_URL}/api/auth/web-login`;
  };

  const logout = async () => {
    try {
      document.cookie = "lost_scores_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

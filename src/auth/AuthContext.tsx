import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, logoutUser, checkSession, type AuthUser } from "../lib/authService";

type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const u = await checkSession();
      setUser(u);
      setLoading(false);
    };
    verify();
  }, []);

  const login = async (email: string, pass: string) => {
    const result = await loginUser(email, pass);
    if (result) {
      setUser(result.user);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      login,
      logout,
    }),
    [user]
  );

  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

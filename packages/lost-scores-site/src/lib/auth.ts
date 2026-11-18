import { createContext, useContext } from "react";
import type { Me } from "@/lib/api";

export interface Auth {
  me: Me | null;
  ready: boolean;
  logout: () => Promise<void>;
  refresh: () => void;
}

export const AuthContext = createContext<Auth | null>(null);

export function useAuth(): Auth {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth needs an AuthProvider above it");
  }
  return auth;
}

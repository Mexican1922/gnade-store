import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { authAPI } from "../services/api";
import type { User } from "../services/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("gnade_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("gnade_token"),
  );

  function persist(user: User, access: string) {
    setUser(user);
    setToken(access);
    localStorage.setItem("gnade_user", JSON.stringify(user));
    localStorage.setItem("gnade_token", access);
  }

  const login = useCallback(async (email: string, password: string) => {
    const { user, tokens } = await authAPI.login(email, password);
    persist(user, tokens.access);
  }, []);

  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    ) => {
      const { user, tokens } = await authAPI.register(
        firstName,
        lastName,
        email,
        password,
      );
      persist(user, tokens.access);
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("gnade_user");
    localStorage.removeItem("gnade_token");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

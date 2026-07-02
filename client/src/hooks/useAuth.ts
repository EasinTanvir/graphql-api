import { useMemo, useState } from "react";
import { blogApi } from "../api/blogApi";
import type { AuthMode, AuthPayload, User } from "../types/blog";

const TOKEN_KEY = "token";
const USER_KEY = "user";

const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? (JSON.parse(storedUser) as User) : null;
};

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  const isLoggedIn = useMemo(() => Boolean(token && user), [token, user]);

  const saveAuth = (payload: AuthPayload) => {
    localStorage.setItem(TOKEN_KEY, payload.token);
    localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
    setToken(payload.token);
    setUser(payload.user);
  };

  const submitAuth = async (
    mode: AuthMode,
    input: { name: string; email: string; password: string },
  ) => {
    const payload =
      mode === "register"
        ? (await blogApi.register(input)).register
        : (await blogApi.login({ email: input.email, password: input.password })).login;

    saveAuth(payload);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken("");
    setUser(null);
  };

  return {
    isLoggedIn,
    logout,
    submitAuth,
    token,
    user,
  };
}

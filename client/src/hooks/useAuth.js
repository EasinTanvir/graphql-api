import { useMemo, useState } from "react";
import { blogApi } from "../api/blogApi";

const TOKEN_KEY = "token";
const USER_KEY = "user";

const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => getStoredUser());

  const isLoggedIn = useMemo(() => Boolean(token && user), [token, user]);

  const saveAuth = (payload) => {
    localStorage.setItem(TOKEN_KEY, payload.token);
    localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
    setToken(payload.token);
    setUser(payload.user);
  };

  const submitAuth = async (mode, input) => {
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

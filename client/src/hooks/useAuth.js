import { useMemo, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { LOGIN, REGISTER } from "../api/graphqlOperations";

const TOKEN_KEY = "token";
const USER_KEY = "user";

const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export function useAuth() {
  const client = useApolloClient();
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => getStoredUser());
  const [loginMutation] = useMutation(LOGIN);
  const [registerMutation] = useMutation(REGISTER);

  const isLoggedIn = useMemo(() => Boolean(token && user), [token, user]);

  const saveAuth = (payload) => {
    localStorage.setItem(TOKEN_KEY, payload.token);
    localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
    setToken(payload.token);
    setUser(payload.user);
  };

  const submitAuth = async (mode, input) => {
    const result =
      mode === "register"
        ? await registerMutation({ variables: { input } })
        : await loginMutation({
            variables: {
              input: {
                email: input.email,
                password: input.password,
              },
            },
          });

    const payload = mode === "register" ? result.data.register : result.data.login;

    saveAuth(payload);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken("");
    setUser(null);
    client.clearStore().catch(() => {});
  };

  return {
    isLoggedIn,
    logout,
    submitAuth,
    token,
    user,
  };
}

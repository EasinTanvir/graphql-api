import { useState } from "react";

export function AuthPanel({ onSubmit }) {
  const [authMode, setAuthMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(authMode, form);
  };

  return (
    <>
      <div className="tabs" aria-label="Auth mode">
        <button
          type="button"
          className={authMode === "login" ? "active" : ""}
          onClick={() => setAuthMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={authMode === "register" ? "active" : ""}
          onClick={() => setAuthMode("register")}
        >
          Register
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {authMode === "register" && (
          <label>
            Name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
        )}
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            minLength={6}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
          />
        </label>
        <button type="submit">{authMode === "register" ? "Create account" : "Login"}</button>
      </form>
    </>
  );
}

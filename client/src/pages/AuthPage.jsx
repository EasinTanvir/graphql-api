import { AuthPanel } from "../components/AuthPanel";

export function AuthPage({ auth, runAction }) {
  if (auth.isLoggedIn) {
    return (
      <section className="panel page-panel">
        <h2>You are logged in</h2>
        <p className="muted">Current user: {auth.user.name}</p>
      </section>
    );
  }

  return (
    <section className="panel page-panel">
      <h2>Login or register</h2>
      <p className="muted">
        Register and login both send GraphQL mutations to `/graphql`.
      </p>
      <AuthPanel
        onSubmit={(mode, input) =>
          runAction(
            () => auth.submitAuth(mode, input),
            mode === "register" ? "Registered and logged in." : "Logged in.",
          )
        }
      />
    </section>
  );
}

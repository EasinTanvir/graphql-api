import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { AuthPanel } from "./components/AuthPanel";
import { PostFeed } from "./components/PostFeed";
import { PostForm } from "./components/PostForm";
import { useAuth } from "./hooks/useAuth";
import { usePosts } from "./hooks/usePosts";
import "./style.css";

function App() {
  const [message, setMessage] = useState("");
  const auth = useAuth();
  const posts = usePosts(auth.token);

  const runAction = async (action: () => Promise<void>, successMessage?: string) => {
    try {
      setMessage("");
      await action();
      if (successMessage) setMessage(successMessage);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <main className="app-shell">
      <AppHeader
        user={auth.user}
        onLogout={() => {
          auth.logout();
          setMessage("Logged out.");
        }}
      />

      {message && <p className="notice">{message}</p>}

      <div className="layout">
        <aside className="panel">
          {!auth.isLoggedIn ? (
            <AuthPanel
              onSubmit={(mode, input) =>
                runAction(
                  () => auth.submitAuth(mode, input),
                  mode === "register" ? "Registered and logged in." : "Logged in.",
                )
              }
            />
          ) : (
            <PostForm
              onSubmit={(input) =>
                runAction(() => posts.createPost(input), "Post published.")
              }
            />
          )}
        </aside>

        <PostFeed
          canComment={auth.isLoggedIn}
          isLoading={posts.isLoading}
          onCreateComment={(input) =>
            runAction(() => posts.createComment(input), "Comment added.")
          }
          posts={posts.posts}
        />
      </div>
    </main>
  );
}

export default App;

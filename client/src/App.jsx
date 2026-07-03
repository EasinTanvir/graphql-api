import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { useAuth } from "./hooks/useAuth";
import { usePosts } from "./hooks/usePosts";
import { ApiGuidePage } from "./pages/ApiGuidePage";
import { AuthPage } from "./pages/AuthPage";
import { CreatePostPage } from "./pages/CreatePostPage";
import { PostsPage } from "./pages/PostsPage";
import "./style.css";

function App() {
  const [message, setMessage] = useState("");
  const auth = useAuth();
  const posts = usePosts(auth.token);
  const navigate = useNavigate();

  const runAction = async (action, successMessage) => {
    try {
      setMessage("");
      await action();
      if (successMessage) setMessage(successMessage);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  const handleLogout = () => {
    auth.logout();
    setMessage("Logged out.");
    navigate("/auth");
  };

  return (
    <main className="app-shell">
      <AppHeader user={auth.user} onLogout={handleLogout} />
      {message && <p className="notice">{message}</p>}

      <Routes>
        <Route
          path="/"
          element={
            <PostsPage
              auth={auth}
              posts={posts}
              runAction={runAction}
            />
          }
        />
        <Route
          path="/auth"
          element={<AuthPage auth={auth} runAction={runAction} />}
        />
        <Route
          path="/create"
          element={
            auth.isLoggedIn ? (
              <CreatePostPage posts={posts} runAction={runAction} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route path="/api-guide" element={<ApiGuidePage token={auth.token} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;

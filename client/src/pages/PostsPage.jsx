import { Link } from "react-router-dom";
import { PostFeed } from "../components/PostFeed";

export function PostsPage({ auth, posts, runAction }) {
  return (
    <section className="page-grid">
      <aside className="panel">
        <h2>Posts</h2>
        <p className="muted">
          This page sends the `Posts` query and renders the response from the backend.
        </p>
        <div className="action-list">
          <button type="button" onClick={() => runAction(posts.loadPosts, "Posts refreshed.")}>
            Refresh posts
          </button>
          <Link className="button-link" to={auth.isLoggedIn ? "/create" : "/auth"}>
            {auth.isLoggedIn ? "Create a post" : "Login to create"}
          </Link>
        </div>
      </aside>

      <PostFeed
        canComment={auth.isLoggedIn}
        isLoading={posts.isLoading}
        onCreateComment={(input) =>
          runAction(() => posts.createComment(input), "Comment added.")
        }
        posts={posts.posts}
      />
      {posts.error && (
        <section className="feed-state error-state">
          {posts.error.message}
        </section>
      )}
    </section>
  );
}

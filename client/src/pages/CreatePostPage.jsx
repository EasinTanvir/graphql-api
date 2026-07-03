import { PostForm } from "../components/PostForm";

export function CreatePostPage({ posts, runAction }) {
  return (
    <section className="panel page-panel">
      <h2>Create post</h2>
      <p className="muted">
        This form sends the `CreatePost` mutation with your JWT in the Authorization header.
      </p>
      <PostForm
        onSubmit={(input) =>
          runAction(() => posts.createPost(input), "Post published.")
        }
      />
    </section>
  );
}

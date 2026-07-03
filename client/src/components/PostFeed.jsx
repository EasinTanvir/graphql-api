import { PostCard } from "./PostCard";

export function PostFeed({ canComment, isLoading, onCreateComment, posts }) {
  if (isLoading) {
    return <section className="feed-state">Loading posts...</section>;
  }

  if (posts.length === 0) {
    return <section className="feed-state">No posts yet.</section>;
  }

  return (
    <section className="feed">
      {posts.map((post) => (
        <PostCard
          canComment={canComment}
          key={post.id}
          onCreateComment={onCreateComment}
          post={post}
        />
      ))}
    </section>
  );
}

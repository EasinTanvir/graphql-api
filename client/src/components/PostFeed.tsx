import { PostCard } from "./PostCard";
import type { Post } from "../types/blog";

type PostFeedProps = {
  canComment: boolean;
  isLoading: boolean;
  onCreateComment: (input: { postId: string; content: string }) => Promise<void>;
  posts: Post[];
};

export function PostFeed({ canComment, isLoading, onCreateComment, posts }: PostFeedProps) {
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

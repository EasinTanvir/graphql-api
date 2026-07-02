import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import type { Post } from "../types/blog";

type PostCardProps = {
  canComment: boolean;
  onCreateComment: (input: { postId: string; content: string }) => Promise<void>;
  post: Post;
};

export function PostCard({ canComment, onCreateComment, post }: PostCardProps) {
  return (
    <article className="post">
      <div className="post-header">
        <h2>{post.title}</h2>
        <span>by {post.author.name}</span>
      </div>
      <p>{post.content}</p>
      <CommentList comments={post.comments} />
      {canComment && <CommentForm postId={post.id} onSubmit={onCreateComment} />}
    </article>
  );
}

import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

export function PostCard({ canComment, onCreateComment, post }) {
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

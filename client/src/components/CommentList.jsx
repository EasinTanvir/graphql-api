export function CommentList({ comments }) {
  return (
    <div className="comments">
      <h3>Comments</h3>
      {comments.length === 0 && <p className="muted">No comments yet.</p>}
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <strong>{comment.author.name}</strong>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}

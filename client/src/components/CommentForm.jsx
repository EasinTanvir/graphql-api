import { useState } from "react";

export function CommentForm({ postId, onSubmit }) {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    await onSubmit({ postId, content: trimmedContent });
    setContent("");
  };

  return (
    <div className="comment-form">
      <input
        placeholder="Write a comment"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <button type="button" onClick={handleSubmit}>
        Comment
      </button>
    </div>
  );
}

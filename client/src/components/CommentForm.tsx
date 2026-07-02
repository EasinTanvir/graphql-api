import { useState } from "react";

type CommentFormProps = {
  postId: string;
  onSubmit: (input: { postId: string; content: string }) => Promise<void>;
};

export function CommentForm({ postId, onSubmit }: CommentFormProps) {
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

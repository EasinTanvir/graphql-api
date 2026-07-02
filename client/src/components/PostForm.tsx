import { useState } from "react";
import type { FormEvent } from "react";

type PostFormProps = {
  onSubmit: (input: { title: string; content: string }) => Promise<void>;
};

export function PostForm({ onSubmit }: PostFormProps) {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
    setForm({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create post</h2>
      <label>
        Title
        <input
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          required
        />
      </label>
      <label>
        Content
        <textarea
          rows={6}
          value={form.content}
          onChange={(event) => setForm({ ...form, content: event.target.value })}
          required
        />
      </label>
      <button type="submit">Publish</button>
    </form>
  );
}

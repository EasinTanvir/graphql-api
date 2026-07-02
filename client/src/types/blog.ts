export type User = {
  id: string;
  name: string;
  email: string;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  author: User;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: User;
  comments: Comment[];
};

export type AuthPayload = {
  token: string;
  user: User;
};

export type AuthMode = "login" | "register";

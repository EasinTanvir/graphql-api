import { graphqlRequest } from "./graphqlClient";
import type { AuthPayload, Post, User } from "../types/blog";

const AUTH_FIELDS = `
  token
  user {
    id
    name
    email
  }
`;

const POST_FIELDS = `
  id
  title
  content
  createdAt
  author {
    id
    name
    email
  }
  comments {
    id
    content
    createdAt
    author {
      id
      name
      email
    }
  }
`;

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type CreatePostInput = {
  title: string;
  content: string;
};

export type CreateCommentInput = {
  postId: string;
  content: string;
};

export const blogApi = {
  getMe: (token: string) =>
    graphqlRequest<{ me: User | null }>(
      `query Me {
        me {
          id
          name
          email
        }
      }`,
      {},
      token,
    ),

  getPosts: () =>
    graphqlRequest<{ posts: Post[] }>(
      `query Posts {
        posts {
          ${POST_FIELDS}
        }
      }`,
    ),

  register: (input: RegisterInput) =>
    graphqlRequest<{ register: AuthPayload }>(
      `mutation Register($input: RegisterInput!) {
        register(input: $input) {
          ${AUTH_FIELDS}
        }
      }`,
      { input },
    ),

  login: (input: LoginInput) =>
    graphqlRequest<{ login: AuthPayload }>(
      `mutation Login($input: LoginInput!) {
        login(input: $input) {
          ${AUTH_FIELDS}
        }
      }`,
      { input },
    ),

  createPost: (input: CreatePostInput, token: string) =>
    graphqlRequest<{ createPost: Post }>(
      `mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
          ${POST_FIELDS}
        }
      }`,
      { input },
      token,
    ),

  createComment: (input: CreateCommentInput, token: string) =>
    graphqlRequest<{ createComment: { id: string } }>(
      `mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
          id
        }
      }`,
      { input },
      token,
    ),
};

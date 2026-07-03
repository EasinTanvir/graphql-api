import { graphqlRequest } from "./graphqlClient";

export const AUTH_FIELDS = `
  token
  user {
    id
    name
    email
  }
`;

export const POST_FIELDS = `
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

export const blogApi = {
  getMe: (token) =>
    graphqlRequest(
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
    graphqlRequest(
      `query Posts {
        posts {
          ${POST_FIELDS}
        }
      }`,
    ),

  register: (input) =>
    graphqlRequest(
      `mutation Register($input: RegisterInput!) {
        register(input: $input) {
          ${AUTH_FIELDS}
        }
      }`,
      { input },
    ),

  login: (input) =>
    graphqlRequest(
      `mutation Login($input: LoginInput!) {
        login(input: $input) {
          ${AUTH_FIELDS}
        }
      }`,
      { input },
    ),

  createPost: (input, token) =>
    graphqlRequest(
      `mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
          ${POST_FIELDS}
        }
      }`,
      { input },
      token,
    ),

  createComment: (input, token) =>
    graphqlRequest(
      `mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
          id
        }
      }`,
      { input },
      token,
    ),
};

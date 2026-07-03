import { gql } from "@apollo/client";

export const AUTH_FIELDS = gql`
  fragment AuthFields on AuthPayload {
    token
    user {
      id
      name
      email
    }
  }
`;

export const POST_FIELDS = gql`
  fragment PostFields on Post {
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
  }
`;

export const GET_POSTS = gql`
  ${POST_FIELDS}

  query Posts {
    posts {
      ...PostFields
    }
  }
`;

export const REGISTER = gql`
  ${AUTH_FIELDS}

  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      ...AuthFields
    }
  }
`;

export const LOGIN = gql`
  ${AUTH_FIELDS}

  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...AuthFields
    }
  }
`;

export const CREATE_POST = gql`
  ${POST_FIELDS}

  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFields
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`;

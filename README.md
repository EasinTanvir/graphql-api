# GraphQL Blog API

This project has a Vite React client and an Express + Apollo Server GraphQL API backed by Prisma ORM and MongoDB.

## Project Structure

```text
client/
  src/
    api/          GraphQL request client and API functions
    components/   React UI components
    hooks/        Auth and post state hooks
    types/        Shared frontend TypeScript types
server/
  prisma/         Prisma MongoDB schema
  src/
    controllers/  Resolver adapter layer
    graphql/      GraphQL typeDefs and resolvers
    middlewares/  Auth helpers
    services/     Business logic
    utils/        Prisma and JWT utilities
```

## Setup

Install dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

Configure the API environment in `server/.env`:

```env
DATABASE_URL="mongodb://localhost:27017/graphql_blog"
JWT_SECRET="replace-with-a-strong-secret"
JWT_EXPIRES_IN="7d"
PORT=4000
CLIENT_URL="http://localhost:5173"
```

Push the Prisma schema after MongoDB is running:

```bash
cd server
npm run prisma:generate
npm run prisma:push
```

Run the apps:

```bash
cd server
npm run dev

cd ../client
npm run dev
```

Default URLs:

- Client: `http://localhost:5173`
- GraphQL API: `http://localhost:4000/graphql`

## Authentication

Protected mutations require a JWT in the `Authorization` header:

```http
Authorization: Bearer <token>
```

Get a token from either `register` or `login`.

## GraphQL Schema

### Types

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  comments: [Comment!]!
  createdAt: String!
  updatedAt: String!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
  createdAt: String!
  updatedAt: String!
}

type Comment {
  id: ID!
  content: String!
  post: Post!
  author: User!
  createdAt: String!
  updatedAt: String!
}
```

### Queries

#### Get Current User

Requires auth. Returns `null` if no valid token is provided.

```graphql
query Me {
  me {
    id
    name
    email
  }
}
```

#### List Posts

Public.

```graphql
query Posts {
  posts {
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
      }
    }
  }
}
```

#### Get One Post

Public.

```graphql
query Post($id: ID!) {
  post(id: $id) {
    id
    title
    content
    author {
      id
      name
    }
    comments {
      id
      content
      author {
        id
        name
      }
    }
  }
}
```

Variables:

```json
{
  "id": "POST_ID"
}
```

## Mutations

### Register

Public. Returns a JWT token.

```graphql
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    token
    user {
      id
      name
      email
    }
  }
}
```

Variables:

```json
{
  "input": {
    "name": "Demo User",
    "email": "demo@example.com",
    "password": "password123"
  }
}
```

### Login

Public. Returns a JWT token.

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      name
      email
    }
  }
}
```

Variables:

```json
{
  "input": {
    "email": "demo@example.com",
    "password": "password123"
  }
}
```

### Create Post

Protected.

```graphql
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    content
    createdAt
    author {
      id
      name
    }
  }
}
```

Variables:

```json
{
  "input": {
    "title": "First GraphQL Post",
    "content": "This post was created through a protected GraphQL mutation."
  }
}
```

### Create Comment

Protected.

```graphql
mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    content
    createdAt
    author {
      id
      name
    }
    post {
      id
      title
    }
  }
}
```

Variables:

```json
{
  "input": {
    "postId": "POST_ID",
    "content": "Nice post."
  }
}
```

## Postman

Import `postman_collection.json` from the project root. The collection includes:

- Register
- Login
- Me
- List Posts
- Get Post By ID
- Create Post
- Create Comment

The collection uses these variables:

- `baseUrl`: defaults to `http://localhost:4000/graphql`
- `token`: set automatically by Register/Login test scripts
- `postId`: paste a real post id after creating or listing posts

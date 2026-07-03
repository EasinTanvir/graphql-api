import { API_URL } from "../api/graphqlClient";

const postsQuery = `query Posts {
  posts {
    id
    title
    content
    author {
      name
      email
    }
    comments {
      id
      content
      author {
        name
      }
    }
  }
}`;

const loginMutation = `mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      name
      email
    }
  }
}`;

const createPostMutation = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    content
    author {
      name
    }
  }
}`;

function CodeBlock({ children }) {
  return <pre><code>{children}</code></pre>;
}

export function ApiGuidePage({ token }) {
  const fetchExample = `await fetch("${API_URL}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_JWT_TOKEN"
  },
  body: JSON.stringify({
    query: CREATE_POST_MUTATION,
    variables: {
      input: {
        title: "Hello GraphQL",
        content: "This came from the React client."
      }
    }
  })
});`;

  return (
    <section className="guide">
      <div className="panel page-panel">
        <h2>How requests go to the backend</h2>
        <p className="muted">
          The React app sends every operation as a POST request to <strong>{API_URL}</strong>.
          Public queries do not need a token. Create post and comment mutations need
          `Authorization: Bearer token`.
        </p>
        {token && (
          <p className="notice inline-notice">
            You are logged in, so protected requests will include your saved token.
          </p>
        )}
      </div>

      <article className="panel page-panel">
        <h2>1. Fetch all posts</h2>
        <CodeBlock>{postsQuery}</CodeBlock>
      </article>

      <article className="panel page-panel">
        <h2>2. Login</h2>
        <CodeBlock>{loginMutation}</CodeBlock>
        <CodeBlock>{`variables: {
  input: {
    email: "test@example.com",
    password: "password123"
  }
}`}</CodeBlock>
      </article>

      <article className="panel page-panel">
        <h2>3. Create post with token</h2>
        <CodeBlock>{createPostMutation}</CodeBlock>
        <CodeBlock>{fetchExample}</CodeBlock>
      </article>
    </section>
  );
}

import { API_URL } from "../api/apolloClient";

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
  const apolloSetup = `import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "${API_URL}",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token ? { Authorization: \`Bearer \${token}\` } : {}),
    }
  }));

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});`;

  const mutationHookExample = `const [createPost] = useMutation(CREATE_POST);

await createPost({
  variables: {
    input: {
      title: "Hello GraphQL",
      content: "This came from Apollo Client."
    }
  }
});`;

  return (
    <section className="guide">
      <div className="panel page-panel">
        <h2>How requests go to the backend</h2>
        <p className="muted">
          The React app uses Apollo Client to send operations to <strong>{API_URL}</strong>.
          Apollo sends the HTTP request, caches query results, and attaches the saved
          JWT token for protected mutations.
        </p>
        {token && (
          <p className="notice inline-notice">
            You are logged in, so protected requests will include your saved token.
          </p>
        )}
      </div>

      <article className="panel page-panel">
        <h2>1. Apollo client setup</h2>
        <CodeBlock>{apolloSetup}</CodeBlock>
      </article>

      <article className="panel page-panel">
        <h2>2. Fetch all posts</h2>
        <CodeBlock>{postsQuery}</CodeBlock>
      </article>

      <article className="panel page-panel">
        <h2>3. Login</h2>
        <CodeBlock>{loginMutation}</CodeBlock>
        <CodeBlock>{`variables: {
  input: {
    email: "test@example.com",
    password: "password123"
  }
}`}</CodeBlock>
      </article>

      <article className="panel page-panel">
        <h2>4. Create post with Apollo mutation</h2>
        <CodeBlock>{createPostMutation}</CodeBlock>
        <CodeBlock>{mutationHookExample}</CodeBlock>
      </article>
    </section>
  );
}

import { NavLink } from "react-router-dom";

export function AppHeader({ user, onLogout }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Apollo GraphQL + Prisma MongoDB</p>
        <h1>GraphQL Blog Client</h1>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/">Posts</NavLink>
        <NavLink to="/auth">Auth</NavLink>
        <NavLink to="/create">Create Post</NavLink>
        <NavLink to="/api-guide">API Guide</NavLink>
      </nav>

      {user && (
        <div className="session">
          <span>{user.name}</span>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

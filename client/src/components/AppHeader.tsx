import type { User } from "../types/blog";

type AppHeaderProps = {
  user: User | null;
  onLogout: () => void;
};

export function AppHeader({ user, onLogout }: AppHeaderProps) {
  return (
    <section className="topbar">
      <div>
        <p className="eyebrow">Apollo GraphQL + Prisma MongoDB</p>
        <h1>Posts and comments</h1>
      </div>
      {user && (
        <div className="session">
          <span>{user.name}</span>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </section>
  );
}

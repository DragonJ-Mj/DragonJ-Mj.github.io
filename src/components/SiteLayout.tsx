import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAdmin, logout } from "@/lib/auth";
import { exportJSON, getNav, getProfile, isOnline, type NavItem, type Profile } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const admin = useAdmin();
  const { location } = useRouterState();
  const [nav, setNav] = useState<NavItem[]>(getNav());
  const [profile, setProfile] = useState<Profile>(getProfile());
  const [online, setOnline] = useState(isOnline());

  useEffect(() => {
    const refresh = () => {
      setNav(getNav());
      setProfile(getProfile());
    };
    const onOnline = () => setOnline(isOnline());
    refresh();
    window.addEventListener("dragon-data-change", refresh);
    window.addEventListener("dragon-online-change", onOnline);
    return () => {
      window.removeEventListener("dragon-data-change", refresh);
      window.removeEventListener("dragon-online-change", onOnline);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="max-w-3xl mx-auto w-full px-6 pt-10 pb-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl font-semibold tracking-tight hover:text-primary">
          {profile.name}<span className="text-primary">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-mono text-sm">
          {nav.map((n) => {
            const active = location.pathname === n.to;
            return (
              <Link
                key={n.id}
                to={n.to}
                data-active={active}
                className={"nav-link " + (active ? "text-primary" : "text-muted-foreground hover:text-foreground")}
              >
                {n.label}
              </Link>
            );
          })}
          {admin ? (
            <>
              <Link to="/dashboard" className="nav-link text-muted-foreground hover:text-foreground">dashboard</Link>
              <button onClick={() => exportJSON()} className="nav-link text-muted-foreground hover:text-foreground">export</button>
              <button onClick={() => logout()} className="nav-link text-muted-foreground hover:text-foreground">logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-link text-muted-foreground hover:text-foreground">login</Link>
          )}
        </nav>
      </header>

      <main key={location.pathname} className="flex-1 max-w-3xl mx-auto w-full px-6 pb-24 slide-enter-content">
        {children}
      </main>

      <footer className="max-w-3xl mx-auto w-full px-6 py-10 border-t border-border">
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>© 2026 {profile.name}. Crafted with care.</span>
          <span className={online ? "text-primary" : "text-muted-foreground"}>
            {online ? "● connected to server" : "○ offline (using local cache)"}
          </span>
        </div>
        {admin && (
          <div className="mt-4 p-3 rounded-md bg-accent/40 font-mono text-xs text-muted-foreground">
            ✏️ admin mode — edits {online ? "save to your server.js" : "save locally; start server.js to sync"}.{" "}
            <button onClick={() => exportJSON()} className="underline text-foreground">export db.json</button>
          </div>
        )}
      </footer>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <h1 className="font-serif text-5xl md:text-6xl font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-3 text-muted-foreground italic font-serif text-lg">{subtitle}</p>}
    </div>
  );
}

export function AdminButton(props: React.ComponentProps<typeof Button>) {
  const admin = useAdmin();
  if (!admin) return null;
  return <Button variant="outline" size="sm" {...props} />;
}

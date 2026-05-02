import { Link } from "@tanstack/react-router";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="size-9 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-glow">
            <Code2 className="size-5 text-accent-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-lg">
            Dragon<span className="text-accent">.xyz</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-accent bg-accent/10" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-surface" }}
              className="px-3 py-1.5 rounded-md text-sm font-medium font-mono uppercase tracking-wider transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden size-10 rounded-md hover:bg-surface flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background/95">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-accent bg-accent/10" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="px-4 py-2.5 rounded-md text-sm font-medium font-mono uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

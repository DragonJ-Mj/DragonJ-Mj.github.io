import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/lib/auth";
import { getNav, getProfile, updateNav, updateProfile, type NavItem, type Profile } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Dragon" }] }),
  component: Dashboard,
});

function Dashboard() {
  const admin = useAdmin();
  const nav = useNavigate();
  const [profile, setProfile] = useState<Profile>(getProfile());
  const [navItems, setNavItems] = useState<NavItem[]>(getNav());

  useEffect(() => {
    if (!admin) nav({ to: "/login" });
  }, [admin, nav]);

  if (!admin) return null;

  return (
    <SiteLayout>
      <PageHeader title="Dashboard" subtitle="edit your profile, navigation and content." />

      <section className="mb-16">
        <h2 className="font-serif text-2xl mb-4">Profile</h2>
        <div className="space-y-3 max-w-lg">
          <Input
            placeholder="Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <Input
            placeholder="Designation"
            value={profile.designation}
            onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
          />
          <Textarea
            placeholder="Bio"
            value={profile.bio ?? ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
          <Button onClick={() => updateProfile(profile)}>Save profile</Button>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-serif text-2xl mb-4">Navigation</h2>
        <div className="space-y-2 max-w-lg">
          {navItems.map((item, i) => (
            <div key={item.id} className="flex gap-2">
              <Input
                placeholder="label"
                value={item.label}
                onChange={(e) => {
                  const next = [...navItems];
                  next[i] = { ...item, label: e.target.value };
                  setNavItems(next);
                }}
              />
              <Input
                placeholder="/url"
                value={item.to}
                onChange={(e) => {
                  const next = [...navItems];
                  next[i] = { ...item, to: e.target.value };
                  setNavItems(next);
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setNavItems(navItems.filter((_, j) => j !== i))}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setNavItems([
                  ...navItems,
                  { id: crypto.randomUUID(), to: "/", label: "new" },
                ])
              }
            >
              <Plus className="w-4 h-4 mr-1" /> add link
            </Button>
            <Button onClick={() => updateNav(navItems)}>Save navigation</Button>
          </div>
          <p className="font-mono text-xs text-muted-foreground pt-2">
            Tip: only links matching real route files (/, /projects, /blog, /about, /notes, /sponsors, /uses, /dashboard) will load — the others 404.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">Content</h2>
        <p className="text-muted-foreground">
          Visit any page (home, projects, blog, etc.) and use the inline <span className="font-mono">add new</span> /
          edit / delete controls — they save through the same backend.
        </p>
      </section>
    </SiteLayout>
  );
}

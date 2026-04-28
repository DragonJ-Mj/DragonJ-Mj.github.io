import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login, useAdmin } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Dragon" },
      { name: "description", content: "Admin login." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const admin = useAdmin();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  if (admin) {
    return (
      <SiteLayout>
        <PageHeader title="Logged in" subtitle="you have admin access on every page." />
        <p className="text-muted-foreground">Hover any item to see edit/delete. Click <span className="font-mono text-foreground">add new</span> at the top of any section.</p>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader title="Login" subtitle="admin only." />
      <form
        className="max-w-sm space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (login(u, p)) nav({ to: "/" });
          else setErr("Invalid credentials");
        }}
      >
        <Input placeholder="username" value={u} onChange={(e) => setU(e.target.value)} autoFocus />
        <Input type="password" placeholder="password" value={p} onChange={(e) => setP(e.target.value)} />
        {err && <p className="text-sm text-destructive font-mono">{err}</p>}
        <Button type="submit" className="w-full">Sign in</Button>
      </form>
    </SiteLayout>
  );
}

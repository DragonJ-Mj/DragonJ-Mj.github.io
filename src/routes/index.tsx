import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { EditableSection } from "@/components/EditableSection";
import { getProfile, type Profile } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dragon — personal site" },
      { name: "description", content: "Writing, projects and notes from Dragon." },
    ],
  }),
  component: Index,
});

function Index() {
  const [p, setP] = useState<Profile>(getProfile());
  useEffect(() => {
    const r = () => setP(getProfile());
    r();
    window.addEventListener("dragon-data-change", r);
    return () => window.removeEventListener("dragon-data-change", r);
  }, []);

  return (
    <SiteLayout>
      <PageHeader title={p.name} subtitle={p.designation} />
      {p.bio && (
        <p className="text-lg leading-relaxed text-foreground/90 mb-12 max-w-prose">{p.bio}</p>
      )}
      <EditableSection section="home" variant="compact" />
    </SiteLayout>
  );
}

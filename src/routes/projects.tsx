import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { EditableSection } from "@/components/EditableSection";
import { EditablePageHeader } from "@/components/EditablePageHeader";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Dragon" },
      { name: "description", content: "Selected projects and experiments." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <EditablePageHeader section="projects" fallbackTitle="Projects" fallbackSubtitle="things I've built, shipped, or abandoned." />
      <EditableSection section="projects" variant="grid" showTags />
    </SiteLayout>
  ),
});

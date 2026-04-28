import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { EditableSection } from "@/components/EditableSection";
import { EditablePageHeader } from "@/components/EditablePageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Dragon" }] }),
  component: () => (
    <SiteLayout>
      <EditablePageHeader section="about" fallbackTitle="About" fallbackSubtitle="a bit about me." />
      <EditableSection section="about" />
    </SiteLayout>
  ),
});

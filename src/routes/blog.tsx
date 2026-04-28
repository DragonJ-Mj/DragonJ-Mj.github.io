import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { EditableSection } from "@/components/EditableSection";
import { EditablePageHeader } from "@/components/EditablePageHeader";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog — Dragon" }] }),
  component: () => (
    <SiteLayout>
      <EditablePageHeader section="blog" fallbackTitle="Blog" fallbackSubtitle="long-form thinking, occasionally." />
      <EditableSection section="blog" />
    </SiteLayout>
  ),
});

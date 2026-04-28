import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { EditableSection } from "@/components/EditableSection";
import { EditablePageHeader } from "@/components/EditablePageHeader";

export const Route = createFileRoute("/notes")({
  head: () => ({ meta: [{ title: "Notes — Dragon" }] }),
  component: () => (
    <SiteLayout>
      <EditablePageHeader section="notes" fallbackTitle="Notes" fallbackSubtitle="small thoughts." />
      <EditableSection section="notes" variant="compact" />
    </SiteLayout>
  ),
});

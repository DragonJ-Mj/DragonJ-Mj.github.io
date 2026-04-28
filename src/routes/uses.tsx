import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { EditableSection } from "@/components/EditableSection";
import { EditablePageHeader } from "@/components/EditablePageHeader";

export const Route = createFileRoute("/uses")({
  head: () => ({ meta: [{ title: "Uses — Dragon" }] }),
  component: () => (
    <SiteLayout>
      <EditablePageHeader section="uses" fallbackTitle="Uses" fallbackSubtitle="the tools behind the work." />
      <EditableSection section="uses" variant="compact" />
    </SiteLayout>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { EditableSection } from "@/components/EditableSection";
import { EditablePageHeader } from "@/components/EditablePageHeader";

export const Route = createFileRoute("/sponsors")({
  head: () => ({ meta: [{ title: "Sponsors — Dragon" }] }),
  component: () => (
    <SiteLayout>
      <EditablePageHeader section="sponsors" fallbackTitle="Sponsors" fallbackSubtitle="thank you, sincerely." />
      <EditableSection section="sponsors" variant="grid" />
    </SiteLayout>
  ),
});

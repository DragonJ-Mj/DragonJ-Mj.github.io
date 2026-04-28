import { useEffect, useState } from "react";
import { PageHeader } from "@/components/SiteLayout";
import { useAdmin } from "@/lib/auth";
import { getPage, updatePage, type PageMeta } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, X } from "lucide-react";

export function EditablePageHeader({
  section,
  fallbackTitle,
  fallbackSubtitle,
}: {
  section: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
}) {
  const admin = useAdmin();
  const [meta, setMeta] = useState<PageMeta>(() => getPage(section));
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<PageMeta>(meta);

  useEffect(() => {
    const refresh = () => setMeta(getPage(section));
    refresh();
    window.addEventListener("dragon-data-change", refresh);
    return () => window.removeEventListener("dragon-data-change", refresh);
  }, [section]);

  useEffect(() => { setDraft(meta); }, [meta]);

  const title = meta.title || fallbackTitle;
  const subtitle = meta.subtitle ?? fallbackSubtitle;

  if (admin && editing) {
    return (
      <div className="mb-12 space-y-2 max-w-xl">
        <Input
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          className="font-serif text-3xl h-14"
          placeholder="Page title"
        />
        <Input
          value={draft.subtitle ?? ""}
          onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
          placeholder="Subtitle"
        />
        <div className="flex gap-2">
          <Button size="sm" onClick={() => { updatePage(section, draft); setEditing(false); }}>
            <Check className="w-4 h-4 mr-1" /> save
          </Button>
          <Button size="sm" variant="ghost" onClick={() => { setDraft(meta); setEditing(false); }}>
            <X className="w-4 h-4 mr-1" /> cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <PageHeader title={title} subtitle={subtitle} />
      {admin && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0 h-7 w-7 opacity-0 group-hover:opacity-100 transition"
          onClick={() => setEditing(true)}
        >
          <Pencil className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
  );
}

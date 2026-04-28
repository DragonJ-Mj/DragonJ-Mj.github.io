import { useEffect, useState } from "react";
import { useAdmin } from "@/lib/auth";
import { addItem, deleteItem, getSection, updateItem } from "@/lib/store";
import type { Item } from "@/data/seed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

type Props = {
  section: string;
  variant?: "list" | "grid" | "compact";
  showTags?: boolean;
};

export function EditableSection({ section, variant = "list", showTags }: Props) {
  const admin = useAdmin();
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const refresh = () => setItems(getSection(section));
    refresh();
    window.addEventListener("dragon-data-change", refresh);
    return () => window.removeEventListener("dragon-data-change", refresh);
  }, [section]);

  const wrapperCls =
    variant === "grid"
      ? "grid sm:grid-cols-2 gap-4"
      : variant === "compact"
        ? "space-y-3"
        : "space-y-8";

  return (
    <div>
      {admin && (
        <div className="mb-6">
          <Button variant="outline" size="sm" onClick={() => setAdding(true)}>
            <Plus className="w-4 h-4 mr-1" /> add new
          </Button>
        </div>
      )}

      <div className={wrapperCls + " slide-enter-content"}>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            variant={variant}
            showTags={showTags}
            admin={admin}
            onEdit={() => setEditing(item)}
            onDelete={() => {
              if (confirm(`Delete "${item.title}"?`)) deleteItem(section, item.id);
            }}
          />
        ))}
        {items.length === 0 && (
          <p className="font-mono text-sm text-muted-foreground italic">Nothing here yet.</p>
        )}
      </div>

      <ItemDialog
        open={adding || !!editing}
        item={editing}
        onClose={() => {
          setAdding(false);
          setEditing(null);
        }}
        onSave={(data) => {
          if (editing) updateItem(section, editing.id, data);
          else addItem(section, data);
          setAdding(false);
          setEditing(null);
        }}
      />
    </div>
  );
}

function ItemCard({
  item,
  variant,
  showTags,
  admin,
  onEdit,
  onDelete,
}: {
  item: Item;
  variant: "list" | "grid" | "compact";
  showTags?: boolean;
  admin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const isCompact = variant === "compact";
  const isGrid = variant === "grid";

  return (
    <article
      className={
        "group relative " +
        (isGrid
          ? "p-5 rounded-lg border border-border hover:border-primary/40 hover:shadow-sm transition"
          : isCompact
            ? "py-2"
            : "border-b border-border pb-7")
      }
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className={isCompact ? "font-serif text-lg" : "font-serif text-xl font-semibold"}>
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary inline-flex items-center gap-1.5"
            >
              {item.title}
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </a>
          ) : (
            item.title
          )}
        </h3>
        {item.meta && (
          <span className="font-mono text-xs text-muted-foreground shrink-0">{item.meta}</span>
        )}
      </div>
      {item.description && (
        <p className="mt-1.5 text-muted-foreground leading-relaxed">{item.description}</p>
      )}
      {item.body && <p className="mt-2 text-sm text-muted-foreground/80">{item.body}</p>}
      {showTags && item.tags && item.tags.length > 0 && (
        <div className="mt-2 flex gap-2 flex-wrap">
          {item.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2 py-0.5 rounded bg-accent/60 text-accent-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {admin && (
        <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}>
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </article>
  );
}

function ItemDialog({
  open,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  item: Item | null;
  onClose: () => void;
  onSave: (data: Omit<Item, "id">) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [meta, setMeta] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(item?.title ?? "");
      setDescription(item?.description ?? "");
      setUrl(item?.url ?? "");
      setMeta(item?.meta ?? "");
      setTags(item?.tags?.join(", ") ?? "");
    }
  }, [open, item]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{item ? "Edit" : "Add"} item</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="URL (optional)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Input
            placeholder="Meta (e.g. date, category)"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
          />
          <Input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              onSave({
                title: title || "Untitled",
                description: description || undefined,
                url: url || undefined,
                meta: meta || undefined,
                tags: tags
                  ? tags
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  : undefined,
              })
            }
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

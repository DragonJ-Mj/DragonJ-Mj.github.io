import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Blog — Dragon.xyz" },
      { name: "description", content: "Thoughts on code, design, and building better tools." },
    ],
  }),
});

type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  status: "draft" | "published" | "pending";
  tags: string[];
};

const posts: Post[] = [
  {
    id: "1",
    title: "Building a Local-First Note App",
    excerpt: "How I architected a notes app that works offline, syncs seamlessly, and respects user data.",
    date: "02/05/2026",
    readTime: "8 min",
    status: "draft",
    tags: ["Architecture", "Local-First"],
  },
  {
    id: "2",
    title: "Why Tailwind v4 Changed My Workflow",
    excerpt: "A deep dive into the new CSS-first config, native cascade layers, and why I'm not going back.",
    date: "01/20/2026",
    readTime: "5 min",
    status: "published",
    tags: ["CSS", "Tailwind"],
  },
  {
    id: "3",
    title: "Lessons from Shipping My First SaaS",
    excerpt: "What I learned about pricing, customer support, and saying no after launching to 1000+ users.",
    date: "12/15/2025",
    readTime: "12 min",
    status: "published",
    tags: ["SaaS", "Lessons"],
  },
  {
    id: "4",
    title: "The Hidden Cost of useEffect",
    excerpt: "An honest look at when useEffect is the right tool and the patterns that have replaced it for me.",
    date: "11/10/2025",
    readTime: "6 min",
    status: "pending",
    tags: ["React", "Performance"],
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "published", label: "Published" },
  { id: "draft", label: "Draft" },
  { id: "pending", label: "Pending" },
];

const statusColors = {
  draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  published: "bg-green-500/10 text-green-400 border-green-500/30",
  pending: "bg-blue-500/10 text-blue-400 border-blue-500/30",
};

function Blog() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? posts : posts.filter((p) => p.status === filter);

  return (
    <div className="container mx-auto px-6 py-16">
      <SectionHeader
        label="Blog"
        title="Things I write"
        description="Notes, tutorials, and the occasional rant about the state of web development."
      />

      <div className="flex flex-wrap items-center gap-2 mb-8">
        {filters.map((f) => {
          const count = f.id === "all" ? posts.length : posts.filter((p) => p.status === f.id).length;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 rounded-md text-sm font-mono uppercase tracking-wider transition-all ${
                filter === f.id
                  ? "bg-accent text-accent-foreground shadow-glow"
                  : "bg-surface border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-4 max-w-3xl">
        {filtered.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glow-card rounded-xl p-6 group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="font-display font-bold text-xl group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <span className={`shrink-0 px-2 py-0.5 rounded-md text-xs font-mono uppercase border ${statusColors[post.status]}`}>
                {post.status}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{post.excerpt}</p>
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {post.readTime}
                </span>
                <div className="flex gap-1.5">
                  {post.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-secondary uppercase">{t}</span>
                  ))}
                </div>
              </div>
              <span className="flex items-center gap-1 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Read <ArrowRight className="size-3" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

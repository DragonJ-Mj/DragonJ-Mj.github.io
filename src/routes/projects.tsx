import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ExternalLink, Github, FileText, Folder, Cpu, Layers, Globe, Bot } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: () => ({
    meta: [
      { title: "Projects — Dragon.xyz" },
      { name: "description", content: "Things I've built — tools, apps, and experiments." },
    ],
  }),
});

type Project = {
  id: string;
  icon: typeof FileText;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  features: string[];
  stack: string[];
  links: { label: string; href: string; icon: typeof Github }[];
  color: string;
};

const projects: Project[] = [
  {
    id: "code-notes",
    icon: FileText,
    name: "Code Notes",
    tagline: "Hierarchical knowledge base",
    description: "Hierarchical knowledge base with code blocks, nested topics and a powerful editor.",
    longDescription: "A blazing-fast note-taking app built for developers. Features a tree-structured topic system, syntax-highlighted code blocks for 100+ languages, full-text search, and a markdown-first editor that gets out of your way.",
    tags: ["Notes", "React"],
    category: "Tool",
    features: ["Nested hierarchical topics", "Code block syntax highlighting", "Full-text search", "Markdown-first editor", "Local-first storage"],
    stack: ["React", "TypeScript", "Tailwind", "IndexedDB"],
    links: [
      { label: "Live Demo", href: "#", icon: ExternalLink },
      { label: "Source", href: "#", icon: Github },
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "project-manager",
    icon: Folder,
    name: "Project Manager",
    tagline: "Notion-style projects",
    description: "Notion-style projects with table, board and list views, custom properties and nested subtasks.",
    longDescription: "A flexible project management tool inspired by Notion. Switch between table, kanban, and list views. Define custom properties per project, nest subtasks infinitely, and collaborate in real-time.",
    tags: ["Kanban", "PM"],
    category: "Productivity",
    features: ["Multiple view modes (Table/Board/List)", "Custom properties per project", "Infinite subtask nesting", "Real-time collaboration", "Drag and drop"],
    stack: ["Next.js", "TypeScript", "Postgres", "tRPC"],
    links: [
      { label: "Live Demo", href: "#", icon: ExternalLink },
      { label: "Source", href: "#", icon: Github },
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "whatsapp-ai",
    icon: Bot,
    name: "WhatsApp AI Bot",
    tagline: "Conversational AI on WhatsApp",
    description: "Advanced automation and LLM integration brought to WhatsApp.",
    longDescription: "A WhatsApp bot powered by GPT-4 with custom personality and memory. Handles 1000+ daily users, supports voice notes, image generation, and integrates with external APIs for tasks like booking, reminders, and translations.",
    tags: ["AI", "Bot", "Python"],
    category: "AI",
    features: ["GPT-4 powered conversations", "Voice note transcription", "Image generation", "Persistent memory per user", "Multi-language support"],
    stack: ["Python", "FastAPI", "OpenAI", "Twilio"],
    links: [
      { label: "Source", href: "#", icon: Github },
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "translator",
    icon: Globe,
    name: "Real-time Translator",
    tagline: "Cross-language API bridge",
    description: "Real-time cross-language API bridging with sub-200ms latency.",
    longDescription: "A real-time translation service that bridges APIs in different languages. Uses WebSockets for instant delivery and supports 50+ language pairs with high accuracy.",
    tags: ["API", "Real-time"],
    category: "Backend",
    features: ["50+ language pairs", "Sub-200ms latency", "WebSocket streaming", "Auto language detection"],
    stack: ["Node.js", "WebSockets", "Redis"],
    links: [
      { label: "Source", href: "#", icon: Github },
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    id: "design-system",
    icon: Layers,
    name: "Atom Design System",
    tagline: "Component library",
    description: "A production-ready React component library with 60+ accessible components.",
    longDescription: "An open-source design system used by 200+ developers. Built on Radix primitives with full keyboard navigation, ARIA support, and dark mode out of the box.",
    tags: ["UI", "OSS"],
    category: "Library",
    features: ["60+ components", "Full a11y compliance", "Dark mode", "Storybook docs", "Tree-shakeable"],
    stack: ["React", "Radix", "Tailwind", "TypeScript"],
    links: [
      { label: "Live Demo", href: "#", icon: ExternalLink },
      { label: "Source", href: "#", icon: Github },
    ],
    color: "from-indigo-500 to-violet-500",
  },
  {
    id: "ai-pipeline",
    icon: Cpu,
    name: "AI Pipeline Engine",
    tagline: "ML workflow orchestration",
    description: "Visual workflow builder for chaining AI models and data transformations.",
    longDescription: "A no-code platform for building complex AI pipelines. Drag and drop nodes to chain LLMs, image models, and custom Python functions. Used internally to ship AI features 10x faster.",
    tags: ["AI", "ML", "Tools"],
    category: "AI",
    features: ["Drag and drop workflow builder", "Chain multiple AI models", "Custom Python nodes", "Visual debugging", "Export to API"],
    stack: ["Python", "React Flow", "FastAPI"],
    links: [
      { label: "Live Demo", href: "#", icon: ExternalLink },
    ],
    color: "from-yellow-500 to-orange-500",
  },
];

const categories = ["All", "Tool", "AI", "Productivity", "Backend", "Library"];

function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="container mx-auto px-6 py-16">
      <SectionHeader
        label="Projects"
        title="What I've built"
        description="A selection of tools, apps, and experiments. Click any project to see the details."
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-md text-sm font-mono uppercase tracking-wider transition-all ${
              filter === cat
                ? "bg-accent text-accent-foreground shadow-glow"
                : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-accent/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.button
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(project)}
                whileHover={{ y: -4 }}
                className="glow-card rounded-2xl p-6 text-left group cursor-pointer"
              >
                <div className={`size-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon className="size-6 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-display font-bold text-xl mb-1.5">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-secondary text-xs font-mono uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-accent text-sm font-mono flex items-center gap-1 group-hover:gap-2 transition-all">
                  Open {project.name} →
                </div>
              </motion.button>
            );
          })}

          {/* Add project placeholder */}
          <motion.div
            layout
            key="add"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border-2 border-dashed border-border p-6 flex flex-col items-center justify-center min-h-[260px] text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors cursor-pointer"
          >
            <div className="size-12 rounded-xl border-2 border-dashed border-current flex items-center justify-center mb-3 text-2xl">+</div>
            <span className="font-mono text-sm uppercase tracking-wider">More coming soon</span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl max-w-2xl w-full my-8 overflow-hidden shadow-elegant"
            >
              <div className={`h-32 bg-gradient-to-br ${selected.color} relative`}>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 size-9 rounded-full bg-background/30 backdrop-blur hover:bg-background/50 flex items-center justify-center text-white"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
                <div className="absolute -bottom-8 left-6 size-16 rounded-2xl bg-gradient-to-br from-card to-surface border-4 border-card flex items-center justify-center">
                  <selected.icon className="size-7 text-accent" strokeWidth={2.5} />
                </div>
              </div>

              <div className="pt-12 p-6">
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-1">{selected.category}</div>
                <h2 className="font-display font-bold text-3xl mb-2">{selected.name}</h2>
                <p className="text-muted-foreground mb-6">{selected.longDescription}</p>

                <div className="mb-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Features</h3>
                  <ul className="space-y-2">
                    {selected.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm">
                        <span className="text-accent">▸</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Stack</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.stack.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-xs font-mono border border-accent/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  {selected.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-primary text-accent-foreground font-medium text-sm hover:shadow-glow transition-all"
                    >
                      <link.icon className="size-4" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

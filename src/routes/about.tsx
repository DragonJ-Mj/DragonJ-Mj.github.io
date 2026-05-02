import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Mail, Code, Palette, Brain, Gamepad2, Music, BookOpen, Camera, Coffee } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Dragon.xyz" },
      { name: "description", content: "Developer building unified workspaces. Skills, interests, and the story behind the code." },
    ],
  }),
});

const skills = [
  { name: "TypeScript", level: 95 },
  { name: "React / Next.js", level: 92 },
  { name: "Python", level: 88 },
  { name: "Node.js", level: 85 },
  { name: "Tailwind CSS", level: 95 },
  { name: "PostgreSQL", level: 80 },
  { name: "Docker", level: 75 },
  { name: "AI / LLMs", level: 82 },
];

const interests = [
  { icon: Code, label: "Open Source" },
  { icon: Brain, label: "AI & ML" },
  { icon: Palette, label: "Design Systems" },
  { icon: Gamepad2, label: "Game Dev" },
  { icon: Music, label: "Lo-fi Music" },
  { icon: BookOpen, label: "Sci-fi Books" },
  { icon: Camera, label: "Photography" },
  { icon: Coffee, label: "Coffee Brewing" },
];

function About() {
  return (
    <div className="container mx-auto px-6 py-16">
      <SectionHeader
        label="About"
        title="Who I am"
        description="Developer, builder, and lifelong learner. Here's what makes me tick."
      />

      <div className="grid lg:grid-cols-3 gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glow-card rounded-2xl p-8"
        >
          <h2 className="font-display font-bold text-2xl mb-4">My Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Hi! I'm a developer building a unified workspace for notes, projects, and ideas.
              I love crafting tools that feel inevitable — the kind that make you wonder how you ever
              worked without them.
            </p>
            <p>
              My focus is on the intersection of <span className="text-foreground">developer experience</span>,
              <span className="text-foreground"> AI</span>, and <span className="text-foreground">elegant interfaces</span>.
              When I'm not shipping code, I'm probably reading sci-fi or pulling espresso shots.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4 text-accent" /> Pune, Maharashtra
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="size-4 text-accent" /> imdragonmj@gmail.com
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glow-card rounded-2xl p-8"
        >
          <h2 className="font-display font-bold text-2xl mb-1">Currently</h2>
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Now</p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><span className="text-accent">▸</span> Building Code Notes</li>
            <li className="flex gap-3"><span className="text-accent">▸</span> Learning Rust</li>
            <li className="flex gap-3"><span className="text-accent">▸</span> Reading Project Hail Mary</li>
            <li className="flex gap-3"><span className="text-accent">▸</span> Exploring local LLMs</li>
          </ul>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glow-card rounded-2xl p-8"
        >
          <div className="section-label mb-2">Skills</div>
          <h2 className="font-display font-bold text-2xl mb-6">Tech I work with</h2>
          <div className="space-y-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex justify-between mb-1.5 text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="font-mono text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="h-full bg-gradient-to-r from-accent to-primary"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glow-card rounded-2xl p-8"
        >
          <div className="section-label mb-2">Interests</div>
          <h2 className="font-display font-bold text-2xl mb-6">Things I love</h2>
          <div className="grid grid-cols-2 gap-3">
            {interests.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border hover:border-accent/50 hover:bg-surface-elevated transition-all"
              >
                <div className="size-9 rounded-md bg-accent/10 flex items-center justify-center text-accent">
                  <Icon className="size-4" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

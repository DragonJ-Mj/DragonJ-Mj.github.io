import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/experience")({
  component: Experience,
  head: () => ({
    meta: [
      { title: "Experience — Dragon.xyz" },
      { name: "description", content: "Professional and academic timeline — work, education, and milestones." },
    ],
  }),
});

type TimelineItem = {
  type: "work" | "education" | "achievement" | "project";
  title: string;
  org: string;
  date: string;
  description: string;
  tags: string[];
};

const timeline: TimelineItem[] = [
  {
    type: "work",
    title: "Software Engineer",
    org: "IT Company Pvt. Ltd.",
    date: "11/2023 — Present",
    description: "Architecting data-driven solutions using Python and Django. Implementing AI/ML models and visualizing complex datasets with Matplotlib, Pandas, and NumPy.",
    tags: ["Python", "Django", "Data Science", "AI/ML", "Pandas"],
  },
  {
    type: "achievement",
    title: "Hackathon Winner",
    org: "TechFest 2023",
    date: "08/2023",
    description: "Won 1st place building an AI-powered code review assistant in 36 hours. Beat 120+ teams.",
    tags: ["AI", "Hackathon", "Team Lead"],
  },
  {
    type: "education",
    title: "B-Tech — Computer Science & Engineering",
    org: "Malwa Institute of Technology",
    date: "06/2018 — 04/2022",
    description: "Major Project: WhatsApp AI Bot — advanced automation and LLM integration. Minor Project: Real-time cross-language API bridging.",
    tags: ["WhatsApp AI", "Translator", "Capstone"],
  },
  {
    type: "education",
    title: "Information Security & Ethical Hacking",
    org: "Appin Technology Lab",
    date: "05/2021 — 11/2021",
    description: "Conducted advanced reconnaissance and social engineering simulations. Earned certification in offensive security.",
    tags: ["Security", "Pentesting", "Certified"],
  },
  {
    type: "project",
    title: "First Open Source Release",
    org: "GitHub",
    date: "03/2020",
    description: "Published my first open source library — a Python utility that's now used by 500+ developers.",
    tags: ["OSS", "Python", "Community"],
  },
];

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Award,
  project: Rocket,
};

const colorMap = {
  work: "from-accent to-primary",
  education: "from-green-500 to-emerald-600",
  achievement: "from-yellow-500 to-orange-500",
  project: "from-purple-500 to-pink-500",
};

function Experience() {
  return (
    <div className="container mx-auto px-6 py-16">
      <SectionHeader
        label="Journey"
        title="My Path"
        description="A timeline of what I've worked on, where I've studied, and the milestones that shaped me."
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/0 via-border to-accent/0 md:-translate-x-px" />

        <div className="space-y-12">
          {timeline.map((item, i) => {
            const Icon = iconMap[item.type];
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className={`relative flex md:items-center gap-6 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className={`size-12 rounded-xl bg-gradient-to-br ${colorMap[item.type]} flex items-center justify-center shadow-glow ring-4 ring-background`}>
                    <Icon className="size-5 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block flex-1" />

                {/* Card */}
                <div className="flex-1 ml-20 md:ml-0">
                  <div className="glow-card rounded-xl p-6">
                    <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                      {item.date}
                    </div>
                    <h3 className="font-display font-bold text-xl mb-1">{item.title}</h3>
                    <div className="text-sm text-muted-foreground mb-3 font-medium">{item.org}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-mono border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type Item = {
  id: string;
  title: string;
  description?: string;
  url?: string;
  meta?: string;
  tags?: string[];
  body?: string;
};

export const seedData: Record<string, Item[]> = {
  home: [
    {
      id: "intro-1",
      title: "Hi, I'm Dragon 🐉",
      description: "I build delightful interfaces, write about the craft, and tinker with open source.",
      meta: "Based in the cloud · Available for work",
    },
    {
      id: "intro-2",
      title: "What I'm doing now",
      description: "Shipping a design system, learning Rust, and exploring local-first apps.",
      meta: "Updated this week",
    },
  ],
  projects: [
    { id: "p1", title: "Nebula UI", description: "A minimal React component kit with serif headlines and editorial spacing.", url: "https://example.com/nebula", tags: ["react", "design-system"] },
    { id: "p2", title: "Inkwell", description: "A markdown-first writing app focused on quiet typography.", url: "https://example.com/inkwell", tags: ["editor", "typescript"] },
    { id: "p3", title: "Pulsar CLI", description: "Tiny, fast scaffolding tool for greenfield TypeScript projects.", url: "https://example.com/pulsar", tags: ["cli", "node"] },
    { id: "p4", title: "Lantern", description: "Self-hosted analytics with a single binary deploy.", url: "https://example.com/lantern", tags: ["analytics", "go"] },
  ],
  blog: [
    { id: "b1", title: "Writing CSS that ages well", description: "Naming, layering, and the discipline of restraint.", meta: "Apr 2026 · 8 min read", body: "Some thoughts on building style systems that survive five years of product churn." },
    { id: "b2", title: "On being a generalist", description: "The quiet superpower of breadth.", meta: "Mar 2026 · 5 min read", body: "Why a wide foundation makes deep work possible." },
    { id: "b3", title: "Local-first, finally", description: "What CRDTs actually changed.", meta: "Feb 2026 · 12 min read", body: "A grounded look at where local-first works today." },
  ],
  about: [
    { id: "t1", title: "Designing the invisible", description: "JSConf EU", meta: "Berlin · 2025", url: "https://example.com/talk1" },
    { id: "t2", title: "The shape of a good API", description: "Render Conf", meta: "Bristol · 2024", url: "https://example.com/talk2" },
    { id: "t3", title: "Rendering the web in 2030", description: "ReactiveConf", meta: "Prague · 2024", url: "https://example.com/talk3" },
  ],
  sponsors: [
    { id: "s1", title: "Acme Corp", description: "Platinum sponsor since 2023", url: "https://example.com/acme", meta: "💎 Platinum" },
    { id: "s2", title: "Globex", description: "Gold sponsor", url: "https://example.com/globex", meta: "🥇 Gold" },
    { id: "s3", title: "Initech", description: "Silver sponsor", url: "https://example.com/initech", meta: "🥈 Silver" },
    { id: "s4", title: "Hooli", description: "Bronze sponsor", url: "https://example.com/hooli", meta: "🥉 Bronze" },
  ],
  notes: [
    { id: "n1", title: "Tiny wins compound", description: "A 1% improvement to your daily loop is worth more than a quarterly heroic.", meta: "Apr 24" },
    { id: "n2", title: "Read the source", description: "Twenty minutes inside a library beats two hours of tutorials.", meta: "Apr 18" },
    { id: "n3", title: "Boring tech, sharp ideas", description: "Spend novelty on the problem, not the stack.", meta: "Apr 10" },
  ],
  uses: [
    { id: "u1", title: "MacBook Pro 14\" M3", description: "Daily driver", meta: "Hardware" },
    { id: "u2", title: "VS Code + Vim mode", description: "Editor of choice with a custom serif theme", meta: "Editor" },
    { id: "u3", title: "Arc Browser", description: "For the sidebar tabs alone", meta: "Browser" },
    { id: "u4", title: "Raycast", description: "Spotlight, but actually useful", meta: "Productivity" },
    { id: "u5", title: "Linear", description: "Issue tracking that doesn't get in the way", meta: "Tools" },
  ],
};

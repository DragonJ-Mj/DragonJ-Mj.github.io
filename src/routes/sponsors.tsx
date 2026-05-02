import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Coffee, Github, Star, Plus, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/sponsors")({
  component: Sponsors,
  head: () => ({
    meta: [
      { title: "Sponsors — Dragon.xyz" },
      { name: "description", content: "Friends of the project — sponsors who keep the lights on." },
    ],
  }),
});

const sponsors: { name: string; tier: string; logo: string }[] = [
  // Empty for now — shows the empty state with calls to action
];

const tiers = [
  {
    name: "Coffee",
    icon: Coffee,
    price: "$5",
    perks: ["Buy me a coffee", "Name in supporters list", "My eternal gratitude"],
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "Believer",
    icon: Heart,
    price: "$25/mo",
    perks: ["Logo on this page", "Early access to projects", "Monthly newsletter", "Discord access"],
    color: "from-pink-500 to-rose-500",
    featured: true,
  },
  {
    name: "Champion",
    icon: Star,
    price: "$100/mo",
    perks: ["Premium logo placement", "Direct line for feedback", "Custom integrations", "All Believer perks"],
    color: "from-accent to-primary",
  },
];

function Sponsors() {
  return (
    <div className="container mx-auto px-6 py-16">
      <SectionHeader
        label="Sponsors"
        title="Friends of the project"
        description="Sponsors and supporters who help keep my open-source work going."
      />

      {sponsors.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl border-2 border-dashed border-border p-12 text-center mb-16 overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative">
            <div className="size-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-5 shadow-glow">
              <Sparkles className="size-7 text-accent-foreground" />
            </div>
            <h2 className="font-display font-bold text-2xl mb-2">No sponsors yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Be the first to support my open-source work. Your name (or logo) lives right here.
            </p>
            <a
              href="#tiers"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-primary text-accent-foreground font-semibold px-6 py-3 rounded-lg shadow-glow hover:shadow-elegant transition-all"
            >
              <Heart className="size-4" /> Become a sponsor
            </a>
          </div>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {sponsors.map((s) => (
            <div key={s.name} className="glow-card rounded-xl p-6 text-center">
              <div className="font-display font-bold text-xl">{s.name}</div>
              <div className="font-mono text-xs uppercase text-accent mt-1">{s.tier}</div>
            </div>
          ))}
        </div>
      )}

      <div id="tiers">
        <div className="text-center mb-10">
          <div className="section-label mb-2">Support</div>
          <h2 className="heading-display text-3xl md:text-4xl mb-2">Choose your tier</h2>
          <p className="text-muted-foreground">Every contribution helps. Pick what feels right.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-6 ${
                  tier.featured
                    ? "bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/50 shadow-glow"
                    : "glow-card"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-primary text-accent-foreground text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full">
                    Most loved
                  </div>
                )}
                <div className={`size-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="size-5 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-display font-bold text-xl mb-1">{tier.name}</h3>
                <div className="font-display font-bold text-3xl text-gradient mb-5">{tier.price}</div>
                <ul className="space-y-2 mb-6">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="text-accent">▸</span> {perk}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                    tier.featured
                      ? "bg-gradient-to-r from-accent to-primary text-accent-foreground hover:shadow-glow"
                      : "bg-surface border border-border hover:border-accent/50"
                  }`}
                >
                  Sponsor
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm font-mono"
          >
            <Github className="size-4" /> Or sponsor via GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Send, Sparkles, Github, Twitter, Linkedin } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Dragon.xyz — Coder · Creator · Hacker" },
      { name: "description", content: "I build tools, write code, and ship things that make my workflow faster." },
    ],
  }),
});

function Home() {
  return (
    <div className="bg-grid">
      <section className="container mx-auto px-6 pt-20 pb-32 relative">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label mb-5 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Coder · Creator · Hacker
            </div>
            <h1 className="heading-display text-6xl md:text-8xl mb-6">
              Dragon<span className="text-gradient">.xyz</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              I build tools, write code, and ship things that make my workflow faster.
              Currently architecting unified workspaces and exploring the boundaries of AI.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-accent to-primary text-accent-foreground font-semibold px-6 py-3 rounded-lg shadow-glow hover:shadow-elegant transition-all"
              >
                See Projects
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-border bg-surface px-6 py-3 rounded-lg font-medium hover:border-accent/50 hover:bg-surface-elevated transition-all"
              >
                <Send className="size-4" />
                Get in Touch
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-10 pt-8 border-t border-border">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Follow</span>
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="size-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square max-w-md mx-auto w-full"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/30 to-primary/30 blur-3xl rounded-full" />
            <div className="relative h-full rounded-3xl bg-card border border-border p-8 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-50" />
              <div className="absolute top-4 right-4 flex gap-1.5">
                <div className="size-2.5 rounded-full bg-destructive/80" />
                <div className="size-2.5 rounded-full bg-yellow-500/80" />
                <div className="size-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="relative font-mono text-sm leading-relaxed">
                <div className="text-muted-foreground">// dragon.xyz</div>
                <div><span className="text-accent">const</span> <span className="text-primary">dev</span> = {"{"}</div>
                <div className="pl-4"><span className="text-accent">role</span>: <span className="text-green-400">"Builder"</span>,</div>
                <div className="pl-4"><span className="text-accent">stack</span>: [<span className="text-green-400">"TS"</span>, <span className="text-green-400">"Py"</span>],</div>
                <div className="pl-4"><span className="text-accent">passion</span>: <span className="text-green-400">"∞"</span>,</div>
                <div>{"};"}</div>
                <div className="mt-2 text-muted-foreground">
                  <Sparkles className="inline size-3 text-accent" /> shipping...
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { num: "20+", label: "Projects Shipped" },
            { num: "5+", label: "Years Coding" },
            { num: "∞", label: "Cups of Coffee" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glow-card rounded-xl p-6"
            >
              <div className="font-display font-bold text-4xl text-gradient mb-1">{stat.num}</div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

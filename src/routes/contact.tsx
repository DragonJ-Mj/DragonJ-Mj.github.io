import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Twitter, Linkedin, Youtube, Globe, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Dragon.xyz" },
      { name: "description", content: "Get in touch — email, social, or direct message." },
    ],
  }),
});

const directContact = [
  { icon: Mail, label: "Email", value: "imdragonmj@gmail.com", href: "mailto:imdragonmj@gmail.com" },
  { icon: MapPin, label: "Location", value: "Pune, Maharashtra, India", href: "#" },
  { icon: Phone, label: "Phone", value: "Available on request", href: "#" },
];

const socials = [
  { icon: Github, label: "GitHub", handle: "@dragonxyz", href: "#", color: "hover:text-foreground" },
  { icon: Twitter, label: "Twitter", handle: "@dragonxyz", href: "#", color: "hover:text-blue-400" },
  { icon: Linkedin, label: "LinkedIn", handle: "/in/dragonxyz", href: "#", color: "hover:text-blue-500" },
  { icon: Youtube, label: "YouTube", handle: "@dragonxyz", href: "#", color: "hover:text-red-500" },
  { icon: MessageCircle, label: "Discord", handle: "dragonxyz", href: "#", color: "hover:text-indigo-400" },
  { icon: Globe, label: "Website", handle: "dragon.xyz", href: "#", color: "hover:text-accent" },
];

function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <SectionHeader
        label="Contact"
        title="Let's talk"
        description="Have an idea, a project, or just want to say hi? My inbox is always open."
      />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 max-w-6xl">
        {/* Left column: contact + socials */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glow-card rounded-2xl p-6"
          >
            <h2 className="font-display font-bold text-xl mb-1">Direct Contact</h2>
            <p className="text-sm text-muted-foreground mb-5">Reach out directly — I read everything.</p>
            <div className="space-y-3">
              {directContact.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border hover:border-accent/50 hover:bg-surface-elevated transition-all group"
                >
                  <div className="size-9 rounded-md bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
                    <div className="text-sm font-medium truncate">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glow-card rounded-2xl p-6"
          >
            <h2 className="font-display font-bold text-xl mb-1">Social Links</h2>
            <p className="text-sm text-muted-foreground mb-5">Find me around the web.</p>
            <div className="grid grid-cols-2 gap-2">
              {socials.map(({ icon: Icon, label, handle, href, color }) => (
                <a
                  key={label}
                  href={href}
                  className={`flex items-center gap-3 p-3 rounded-lg bg-surface border border-border hover:border-accent/50 transition-all text-muted-foreground ${color}`}
                >
                  <Icon className="size-4 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground">{label}</div>
                    <div className="text-xs font-mono truncate">{handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column: form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glow-card rounded-2xl p-6 md:p-8"
        >
          <h2 className="font-display font-bold text-2xl mb-1">Send me a message</h2>
          <p className="text-sm text-muted-foreground mb-6">I'll get back to you within 24 hours.</p>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your Name" name="name" placeholder="John Doe" required />
              <Field label="Email" name="email" type="email" placeholder="john@example.com" required />
            </div>
            <Field label="Subject" name="subject" placeholder="Let's collaborate" required />
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                required
                rows={6}
                placeholder="Tell me about your idea..."
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sent}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-primary text-accent-foreground font-semibold py-3 rounded-lg shadow-glow hover:shadow-elegant transition-all disabled:opacity-70"
            >
              {sent ? "Message sent ✓" : (<><Send className="size-4" /> Send Message</>)}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
      />
    </div>
  );
}

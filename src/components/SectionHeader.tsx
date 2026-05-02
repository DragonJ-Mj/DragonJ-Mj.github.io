import { motion } from "framer-motion";

export function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="section-label mb-3 flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-accent shadow-glow" />
        {label}
      </div>
      <h1 className="heading-display text-4xl md:text-6xl mb-4">{title}</h1>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl">{description}</p>
      )}
    </motion.div>
  );
}

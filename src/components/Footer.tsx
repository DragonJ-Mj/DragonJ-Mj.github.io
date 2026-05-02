import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-mono">
        <p>© {new Date().getFullYear()} Dragon.xyz — All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Built with <Heart className="size-3.5 fill-accent text-accent" /> & lots of coffee
        </p>
      </div>
    </footer>
  );
}

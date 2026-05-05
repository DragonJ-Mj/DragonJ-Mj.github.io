// Blog post data — add HTML in `content` for rich formatting
window.POSTS = [
  {
    slug: 'building-a-local-first-note-app',
    title: 'Building a Local-First Note App',
    excerpt: 'How I architected a notes app that works offline, syncs seamlessly, and respects user data.',
    date: '02/05/2026', readTime: '8 min', status: 'draft',
    tags: ['Architecture', 'Local-First'], author: 'Dragon',
    content: `
      <p>The web has spent the last decade convincing us that everything must live on a server. I'm here to push back. <strong>Local-first</strong> software keeps your data on your device, syncs when it can, and never holds you hostage.</p>
      <h2>Why Local-First?</h2>
      <p>When I started building Code Notes, I had three goals:</p>
      <ul>
        <li>Instant load times — no spinners.</li>
        <li>Full offline support without weird states.</li>
        <li>The user's data is theirs, period.</li>
      </ul>
      <h2>The Stack</h2>
      <p>Under the hood, I use <code>IndexedDB</code> via Dexie for storage and a custom CRDT layer for sync.</p>
      <pre><code>const db = new Dexie("notes");
db.version(1).stores({
  notes: "id, updatedAt, parent",
  ops:   "++id, ts"
});</code></pre>
      <blockquote>"The best sync conflict is the one you never had." — every offline-first dev, eventually.</blockquote>
      <h2>Takeaways</h2>
      <p>If you're building anything personal-data heavy, start local-first. The UX is night-and-day.</p>`,
  },
  {
    slug: 'why-tailwind-v4-changed-my-workflow',
    title: 'Why Tailwind v4 Changed My Workflow',
    excerpt: 'A deep dive into the new CSS-first config, native cascade layers, and why I\'m not going back.',
    date: '01/20/2026', readTime: '5 min', status: 'published',
    tags: ['CSS', 'Tailwind'], author: 'Dragon',
    content: `
      <p>Tailwind v4 dropped the JavaScript config. I'll admit — I was skeptical. Now I'm a convert.</p>
      <h2>CSS-first Config</h2>
      <p>Everything lives in your stylesheet now:</p>
      <pre><code>@theme {
  --color-brand: oklch(0.65 0.2 240);
  --font-display: "Space Grotesk", sans-serif;
}</code></pre>
      <h2>Performance</h2>
      <p>Build times are <em>5–10× faster</em>. The new Oxide engine is written in Rust and it shows.</p>
      <h2>Verdict</h2>
      <p>If you haven't upgraded, do it. The migration is mostly mechanical, and the DX improvements are real.</p>`,
  },
  {
    slug: 'lessons-from-shipping-my-first-saas',
    title: 'Lessons from Shipping My First SaaS',
    excerpt: 'What I learned about pricing, customer support, and saying no after launching to 1000+ users.',
    date: '12/15/2025', readTime: '12 min', status: 'published',
    tags: ['SaaS', 'Lessons'], author: 'Dragon',
    content: `
      <p>One year, 1,000 users, 47 angry emails, and a lot of coffee later, here's everything I wish I knew on day one.</p>
      <h2>1. Pricing is psychology, not math</h2>
      <p>I launched at $5/month because I was scared. Six months in, I tripled it. Churn went <em>down</em>.</p>
      <h2>2. Say no to features</h2>
      <p>For every "wouldn't it be cool if…" email, ask: <strong>does this serve my core user?</strong> Usually no.</p>
      <h2>3. Support is product</h2>
      <p>Every support reply is a chance to learn what's broken. The product is better for it.</p>`,
  },
  {
    slug: 'the-hidden-cost-of-useeffect',
    title: 'The Hidden Cost of useEffect',
    excerpt: 'An honest look at when useEffect is the right tool and the patterns that have replaced it for me.',
    date: '11/10/2025', readTime: '6 min', status: 'pending',
    tags: ['React', 'Performance'], author: 'Dragon',
    content: `
      <p><code>useEffect</code> is a fire extinguisher, not a hammer. Most of the time you reach for it, there's a better option.</p>
      <h2>You probably don't need an effect</h2>
      <ul>
        <li>Derived state? Compute during render.</li>
        <li>Reset state on prop change? Use a <code>key</code>.</li>
        <li>Event handler logic? Put it in the handler.</li>
      </ul>
      <h2>The new toolkit</h2>
      <p>Server components, <code>useSyncExternalStore</code>, and TanStack Query handle 90% of what we used effects for.</p>`,
  },
];

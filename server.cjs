// Standalone Node HTTP server for the Dragon site.
// Run locally:  node server.js
// Stores all data in ./database/db.json
//
// Endpoints:
//   GET    /api/db                            -> full db
//   GET    /api/profile                       -> { name, designation, ... }
//   PUT    /api/profile                       -> update profile
//   GET    /api/nav                           -> [{ id, to, label }]
//   PUT    /api/nav                           -> replace nav array
//   GET    /api/sections/:name                -> [items]
//   POST   /api/sections/:name                -> create item
//   PUT    /api/sections/:name/:id            -> update item
//   DELETE /api/sections/:name/:id            -> delete item

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3747;
const DB_DIR = path.join(__dirname, "database");
const DB_PATH = path.join(DB_DIR, "db.json");

const SEED = {
  profile: {
    name: "Dragon-J",
    designation: ", developer, generalist.",
    bio: "I make things on the web — mostly with React, TypeScript, and an unreasonable amount of attention to typography.",
  },
  nav: [
    { id: "projects", to: "/projects", label: "projects" },
    { id: "blog", to: "/blog", label: "blog" },
    { id: "about", to: "/about", label: "about" },
    { id: "notes", to: "/notes", label: "notes" },
    { id: "sponsors", to: "/sponsors", label: "sponsors" },
    { id: "uses", to: "/uses", label: "uses" },
  ],
  sections: {
    home: [
      {
        id: "intro-1",
        title: "Hi, I'm Dragon 🐉",
        description:
          "I build delightful interfaces, write about the craft, and tinker with open source.",
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
      {
        id: "p1",
        title: "Nebula UI",
        description: "A minimal React component kit.",
        url: "https://example.com/nebula",
        tags: ["react", "design-system"],
      },
      {
        id: "p2",
        title: "Inkwell",
        description: "A markdown-first writing app.",
        url: "https://example.com/inkwell",
        tags: ["editor", "typescript"],
      },
    ],
    blog: [
      {
        id: "b1",
        title: "Writing CSS that ages well",
        description: "Naming, layering, and restraint.",
        meta: "Apr 2026 · 8 min read",
      },
    ],
    about: [
      {
        id: "t1",
        title: "Designing the invisible",
        description: "JSConf EU",
        meta: "Berlin · 2025",
        url: "https://example.com/talk1",
      },
    ],
    notes: [
      {
        id: "n1",
        title: "Tiny wins compound",
        description: "A 1% daily improvement beats a quarterly hero effort.",
        meta: "Apr 24",
      },
    ],
    sponsors: [
      {
        id: "s1",
        title: "Acme Corp",
        description: "Platinum sponsor since 2023",
        url: "https://example.com/acme",
        meta: "💎 Platinum",
      },
    ],
    uses: [
      { id: "u1", title: 'MacBook Pro 14" M3', description: "Daily driver", meta: "Hardware" },
    ],
  },
  pages: {
    projects: { title: 'Projects', subtitle: "things I've built, shipped, or abandoned." },
    blog:     { title: 'Blog',     subtitle: 'long-form thinking, occasionally.' },
    about:    { title: 'About',    subtitle: 'Hi I\'m Dragon-J , a Software Engineer & Security Researcher. Currently scaling infrastructure at IT Company in Pune. Specializing in Python-driven AI and defensive infrastructure' },
    notes:    { title: 'Notes',    subtitle: 'small thoughts.' },
    sponsors: { title: 'Sponsors', subtitle: 'thank you, sincerely.' },
    uses:     { title: 'Uses',     subtitle: 'the tools behind the work.' },
  },
};

function initDB() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify(SEED, null, 2));
}

function readDB() {
  try {
    const data = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    // shallow-merge seed for any missing top-level keys
    return {
      profile: { ...SEED.profile, ...(data.profile || {}) },
      nav: data.nav || SEED.nav,
      sections: { ...SEED.sections, ...(data.sections || {}) },
      pages: { ...SEED.pages, ...(data.pages || {}) },
    };
  } catch {
    return JSON.parse(JSON.stringify(SEED));
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json", ...CORS });
  res.end(JSON.stringify(data));
}

function getBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const p = url.pathname;
  const m = req.method;

  if (m === "OPTIONS") {
    res.writeHead(204, CORS);
    return res.end();
  }

  const db = readDB();

  if (m === "GET" && p === "/api/db") return sendJSON(res, 200, db);

  // ---------- profile ----------
  if (p === "/api/profile") {
    if (m === "GET") return sendJSON(res, 200, db.profile);
    if (m === "PUT") {
      const b = await getBody(req);
      db.profile = { ...db.profile, ...b };
      writeDB(db);
      return sendJSON(res, 200, db.profile);
    }
  }

  // ---------- pages (per-section title/subtitle) ----------
  if (p === '/api/pages') {
    if (m === 'GET') return sendJSON(res, 200, db.pages || {});
    if (m === 'PUT') {
      const b = await getBody(req);
      db.pages = { ...(db.pages || {}), ...b };
      writeDB(db);
      return sendJSON(res, 200, db.pages);
    }
  }
  const pageItem = p.match(/^\/api\/pages\/([^/]+)$/);
  if (pageItem) {
    const name = pageItem[1];
    if (m === 'GET') return sendJSON(res, 200, (db.pages || {})[name] || {});
    if (m === 'PUT') {
      const b = await getBody(req);
      db.pages = db.pages || {};
      db.pages[name] = { ...(db.pages[name] || {}), ...b };
      writeDB(db);
      return sendJSON(res, 200, db.pages[name]);
    }
  }

  // ---------- nav ----------
  if (p === "/api/nav") {
    if (m === "GET") return sendJSON(res, 200, db.nav);
    if (m === "PUT") {
      const b = await getBody(req);
      if (!Array.isArray(b)) return sendJSON(res, 400, { error: "Expected array" });
      db.nav = b.map((n) => ({
        id: n.id || crypto.randomUUID(),
        to: n.to || "/",
        label: n.label || "untitled",
      }));
      writeDB(db);
      return sendJSON(res, 200, db.nav);
    }
  }

  // ---------- sections ----------
  const secList = p.match(/^\/api\/sections\/([^/]+)$/);
  if (secList) {
    const name = secList[1];
    if (m === "GET") return sendJSON(res, 200, db.sections[name] || []);
    if (m === "POST") {
      const b = await getBody(req);
      const item = { id: crypto.randomUUID(), ...b };
      if (!db.sections[name]) db.sections[name] = [];
      db.sections[name].unshift(item);
      writeDB(db);
      return sendJSON(res, 201, item);
    }
  }

  const secItem = p.match(/^\/api\/sections\/([^/]+)\/([^/]+)$/);
  if (secItem) {
    const [, name, id] = secItem;
    const list = db.sections[name] || [];
    const i = list.findIndex((x) => x.id === id);
    if (i < 0) return sendJSON(res, 404, { error: "Item not found" });
    if (m === "PUT") {
      const b = await getBody(req);
      list[i] = { ...list[i], ...b, id: list[i].id };
      writeDB(db);
      return sendJSON(res, 200, list[i]);
    }
    if (m === "DELETE") {
      list.splice(i, 1);
      writeDB(db);
      return sendJSON(res, 200, { success: true });
    }
  }

  sendJSON(res, 404, { error: "Route not found" });
});

initDB();
server.listen(PORT, () => {
  console.log(`\x1b[32m🐉 Dragon site server running at http://localhost:${PORT}\x1b[0m`);
  console.log(`\x1b[36m   Data file: ${DB_PATH}\x1b[0m`);
});

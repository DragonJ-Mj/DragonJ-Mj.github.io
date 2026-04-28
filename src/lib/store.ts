import { seedData, type Item } from "@/data/seed";
import { api } from "@/lib/api";

const KEY = "dragon-site-data-v2";
const PROFILE_KEY = "dragon-profile-v1";
const NAV_KEY = "dragon-nav-v1";
const PAGES_KEY = "dragon-pages-v1";

export type Profile = { name: string; designation: string; bio?: string };
export type NavItem = { id: string; to: string; label: string };
export type PageMeta = { title: string; subtitle?: string };

const DEFAULT_PROFILE: Profile = {
  name: "Dragon",
  designation: "designer, developer, generalist.",
  bio: "I make things on the web — mostly with React, TypeScript, and an unreasonable amount of attention to typography.",
};

const DEFAULT_NAV: NavItem[] = [
  { id: "projects", to: "/projects", label: "projects" },
  { id: "blog", to: "/blog", label: "blog" },
  { id: "about", to: "/about", label: "about" },
  { id: "notes", to: "/notes", label: "notes" },
  { id: "sponsors", to: "/sponsors", label: "sponsors" },
  { id: "uses", to: "/uses", label: "uses" },
];

const DEFAULT_PAGES: Record<string, PageMeta> = {
  projects: { title: "Projects", subtitle: "things I've built, shipped, or abandoned." },
  blog:     { title: "Blog",     subtitle: "long-form thinking, occasionally." },
  about:    { title: "About",    subtitle: "a bit about me." },
  notes:    { title: "Notes",    subtitle: "small thoughts." },
  sponsors: { title: "Sponsors", subtitle: "thank you, sincerely." },
  uses:     { title: "Uses",     subtitle: "the tools behind the work." },
};

// ---------- online flag ----------
let online = false;
export const isOnline = () => online;

function emit() {
  window.dispatchEvent(new CustomEvent("dragon-data-change"));
}

// ---------- local cache (used when server is unreachable) ----------
function loadSections(): Record<string, Item[]> {
  if (typeof window === "undefined") return seedData;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(seedData);
    return { ...structuredClone(seedData), ...JSON.parse(raw) };
  } catch {
    return structuredClone(seedData);
  }
}
function saveSections(data: Record<string, Item[]>) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
function loadProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  } catch { return DEFAULT_PROFILE; }
}
function saveProfile(p: Profile) { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); }
function loadNav(): NavItem[] {
  if (typeof window === "undefined") return DEFAULT_NAV;
  try {
    const raw = localStorage.getItem(NAV_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_NAV;
  } catch { return DEFAULT_NAV; }
}
function saveNav(n: NavItem[]) { localStorage.setItem(NAV_KEY, JSON.stringify(n)); }
function loadPages(): Record<string, PageMeta> {
  if (typeof window === "undefined") return DEFAULT_PAGES;
  try {
    const raw = localStorage.getItem(PAGES_KEY);
    return raw ? { ...DEFAULT_PAGES, ...JSON.parse(raw) } : DEFAULT_PAGES;
  } catch { return DEFAULT_PAGES; }
}
function savePages(p: Record<string, PageMeta>) { localStorage.setItem(PAGES_KEY, JSON.stringify(p)); }

// ---------- bootstrap from server ----------
export async function bootstrap() {
  if (typeof window === "undefined") return;
  try {
    const [profile, nav] = await Promise.all([api.getProfile(), api.getNav()]);
    online = true;
    saveProfile(profile);
    saveNav(nav);
    try {
      const pages = await api.getPages();
      if (pages && typeof pages === "object") savePages({ ...DEFAULT_PAGES, ...pages });
    } catch {/* ignore */}
    // pre-warm sections we know about
    const names = ["home", "projects", "blog", "about", "notes", "sponsors", "uses"];
    const cache = loadSections();
    await Promise.all(
      names.map(async (n) => {
        try {
          cache[n] = await api.getSection(n);
        } catch {/* keep cached */}
      }),
    );
    saveSections(cache);
    emit();
    window.dispatchEvent(new CustomEvent("dragon-online-change"));
  } catch {
    online = false;
    window.dispatchEvent(new CustomEvent("dragon-online-change"));
  }
}

// ---------- sections ----------
export function getSection(section: string): Item[] {
  return loadSections()[section] ?? [];
}

export async function addItem(section: string, item: Omit<Item, "id">) {
  if (online) {
    try {
      const created = await api.addItem(section, item);
      const data = loadSections();
      data[section] = [created, ...(data[section] ?? [])];
      saveSections(data);
      emit();
      return;
    } catch { online = false; }
  }
  const data = loadSections();
  const newItem: Item = { ...item, id: crypto.randomUUID() };
  data[section] = [newItem, ...(data[section] ?? [])];
  saveSections(data);
  emit();
}

export async function updateItem(section: string, id: string, patch: Partial<Item>) {
  if (online) {
    try {
      await api.updateItem(section, id, patch);
    } catch { online = false; }
  }
  const data = loadSections();
  data[section] = (data[section] ?? []).map((i) => (i.id === id ? { ...i, ...patch } : i));
  saveSections(data);
  emit();
}

export async function deleteItem(section: string, id: string) {
  if (online) {
    try { await api.deleteItem(section, id); } catch { online = false; }
  }
  const data = loadSections();
  data[section] = (data[section] ?? []).filter((i) => i.id !== id);
  saveSections(data);
  emit();
}

// ---------- profile ----------
export function getProfile(): Profile { return loadProfile(); }
export async function updateProfile(patch: Partial<Profile>) {
  const next = { ...loadProfile(), ...patch };
  saveProfile(next);
  emit();
  if (online) { try { await api.putProfile(next); } catch { online = false; } }
}

// ---------- nav ----------
export function getNav(): NavItem[] { return loadNav(); }
export async function updateNav(items: NavItem[]) {
  saveNav(items);
  emit();
  if (online) { try { await api.putNav(items); } catch { online = false; } }
}

// ---------- pages ----------
export function getPages(): Record<string, PageMeta> { return loadPages(); }
export function getPage(name: string): PageMeta {
  return loadPages()[name] ?? { title: name, subtitle: "" };
}
export async function updatePage(name: string, patch: Partial<PageMeta>) {
  const all = loadPages();
  const next = { ...(all[name] ?? { title: name }), ...patch };
  all[name] = next;
  savePages(all);
  emit();
  if (online) { try { await api.putPage(name, next); } catch { online = false; } }
}

// ---------- export ----------
export function exportJSON() {
  const blob = new Blob(
    [JSON.stringify({ profile: loadProfile(), nav: loadNav(), sections: loadSections(), pages: loadPages() }, null, 2)],
    { type: "application/json" },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "db.json";
  a.click();
  URL.revokeObjectURL(url);
}

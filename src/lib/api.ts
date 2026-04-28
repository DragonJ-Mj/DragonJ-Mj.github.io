// Frontend API client for the standalone Node server (server.js).
// Configure URL via VITE_API_URL, defaults to http://localhost:3747.

export const API_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_URL) ||
  "http://localhost:3747";

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  ping: () => req<unknown>("/api/db"),
  getProfile: () => req<any>("/api/profile"),
  putProfile: (data: any) => req<any>("/api/profile", { method: "PUT", body: JSON.stringify(data) }),
  getNav: () => req<any[]>("/api/nav"),
  putNav: (items: any[]) => req<any[]>("/api/nav", { method: "PUT", body: JSON.stringify(items) }),
  getSection: (name: string) => req<any[]>(`/api/sections/${name}`),
  addItem: (name: string, item: any) =>
    req<any>(`/api/sections/${name}`, { method: "POST", body: JSON.stringify(item) }),
  updateItem: (name: string, id: string, patch: any) =>
    req<any>(`/api/sections/${name}/${id}`, { method: "PUT", body: JSON.stringify(patch) }),
  deleteItem: (name: string, id: string) =>
    req<any>(`/api/sections/${name}/${id}`, { method: "DELETE" }),
  getPages: () => req<Record<string, any>>("/api/pages"),
  putPage: (name: string, data: any) =>
    req<any>(`/api/pages/${name}`, { method: "PUT", body: JSON.stringify(data) }),
};

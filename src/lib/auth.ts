import { useEffect, useState } from "react";

const KEY = "dragon-admin";
const USER = "dragon";
const PASS = "DragonAccess";

export function login(u: string, p: string) {
  if (u === USER && p === PASS) {
    localStorage.setItem(KEY, "1");
    window.dispatchEvent(new CustomEvent("dragon-auth-change"));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("dragon-auth-change"));
}

export function isAdmin() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
}

export function useAdmin() {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    setAdmin(isAdmin());
    const h = () => setAdmin(isAdmin());
    window.addEventListener("dragon-auth-change", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("dragon-auth-change", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return admin;
}

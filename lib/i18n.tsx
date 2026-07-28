"use client";

// Client-side i18n for the static-export site (no server = no locale routing).
// A tiny language context: detects the browser language on first load, then
// persists the user's choice in localStorage. Two locales: English + PT-BR.

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

export type Lang = "en" | "pt";

// A string that exists in both locales. Resolve with `tx(value, lang)`.
export type L = { en: string; pt: string };
export const tx = (v: L, lang: Lang) => v[lang];

const STORAGE_KEY = "lang";

function detectLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "pt") return stored;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("pt") ? "pt" : "en";
}

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: "en", setLang: () => {} });

// useLayoutEffect warns when React renders this provider on the server.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// What the viewport is parked on: the deepest element under the top edge of the
// screen. React reuses these DOM nodes across a language change, so the node
// stays valid — only its text (and position) changes. Falls back to the section
// covering the top edge when the point lands on a gap.
function anchorElement(): HTMLElement | null {
  const hit = document.elementFromPoint(Math.round(window.innerWidth / 2), 2);
  if (hit instanceof HTMLElement && hit !== document.body) return hit;
  const sections = Array.from(document.querySelectorAll<HTMLElement>("section"));
  return sections.find((s) => s.getBoundingClientRect().bottom > 0) ?? null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start with "en" for SSR/first paint to keep hydration deterministic, then
  // sync to the detected language on mount.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  // PT-BR runs ~10% longer than English, so every block of copy above the fold
  // can gain a line on switch and shove the content below it down — on mobile
  // the cards you were reading visibly jump. Pin whatever is under the viewport
  // top and re-align the scroll to it after the re-render, so the page swaps
  // languages in place.
  const anchor = useRef<{ el: HTMLElement; top: number } | null>(null);

  useIsoLayoutEffect(() => {
    const pinned = anchor.current;
    anchor.current = null;
    if (!pinned || !pinned.el.isConnected) return;
    const delta = pinned.el.getBoundingClientRect().top - pinned.top;
    if (Math.abs(delta) > 0.5) window.scrollBy(0, delta);
  }, [lang]);

  const setLang = (l: Lang) => {
    if (l !== lang && window.scrollY > 0) {
      const el = anchorElement();
      if (el) anchor.current = { el, top: el.getBoundingClientRect().top };
    }
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

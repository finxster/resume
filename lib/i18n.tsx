"use client";

// Client-side i18n for the static-export site (no server = no locale routing).
// A tiny language context: detects the browser language on first load, then
// persists the user's choice in localStorage. Two locales: English + PT-BR.

import { createContext, useContext, useEffect, useState } from "react";

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

  const setLang = (l: Lang) => {
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

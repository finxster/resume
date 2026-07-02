"use client";

import { useLang } from "@/lib/i18n";

// Compact EN | PT text toggle — no flags (flags are countries, not languages,
// and render inconsistently across platforms). The active locale is highlighted.
export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-card/80 backdrop-blur px-1 py-1 text-sm shadow-sm ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-2.5 py-0.5 font-medium transition-colors ${
          lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("pt")}
        aria-pressed={lang === "pt"}
        className={`rounded-full px-2.5 py-0.5 font-medium transition-colors ${
          lang === "pt" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        PT
      </button>
    </div>
  );
}

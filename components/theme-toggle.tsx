"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// Compact icon toggle mirroring the LanguageSwitcher pill: translucent card
// background, rounded-full, so the two controls read as a matched pair in the
// fixed top-right corner. Guards against hydration mismatch (theme is only
// known client-side) by rendering a stable placeholder until mounted.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Until mounted, `resolvedTheme` is unknown — treat as light so the label and
  // icon match the server render and hydrate cleanly.
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex items-center justify-center h-[34px] w-[34px] rounded-full border border-border bg-card/80 backdrop-blur text-muted-foreground shadow-sm transition-colors hover:text-foreground ${className}`}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}

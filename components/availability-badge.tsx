"use client";

import { availability } from "@/lib/availability";
import { useLang, tx } from "@/lib/i18n";
import { getDict } from "@/lib/dictionary";
import { cn } from "@/lib/utils";

// Dot + label pill. Rendered in the hero (first scan) and again next to the
// contact form (where the decision happens). Links to #contact so it's an
// entry point, not decoration.
const dotColor = {
  available: "bg-emerald-500",
  limited: "bg-amber-500",
  unavailable: "bg-muted-foreground",
} as const;

export default function AvailabilityBadge({ className }: { className?: string }) {
  const { lang } = useLang();
  const t = getDict(lang).availability;
  const { enabled, status, from, href } = availability;

  if (!enabled) return null;

  // Only the "available" state carries a start date; the others read oddly with one.
  const label =
    status === "available" && from ? t.availableFrom.replace("{date}", tx(from, lang)) : t[status];

  return (
    <a
      href={href}
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5",
        "text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground",
        className,
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {status === "available" && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:hidden",
              dotColor[status],
            )}
          />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", dotColor[status])} />
      </span>
      {label}
    </a>
  );
}

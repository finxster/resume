"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Languages } from "lucide-react";
import RecommendationAvatar from "@/components/recommendation-avatar";
import { useLang, tx, type Lang } from "@/lib/i18n";
import { getDict } from "@/lib/dictionary";
import { LINKEDIN_SOURCE_URL, recSlug, type Recommendation } from "@/lib/recommendations";
import { cn } from "@/lib/utils";

export default function RecommendationCard({
  rec,
  lang,
  compact = false,
}: {
  rec: Recommendation;
  lang: Lang;
  compact?: boolean;
}) {
  const t = getDict(lang).recommendations;
  // Translatable = original language differs from the site language. When it
  // does, the site shows its translation by default (visitor's preference) and
  // offers the original; when it matches, there's nothing to translate.
  const translatable = rec.lang !== lang;
  const [showOriginal, setShowOriginal] = useState(false);
  const showingOriginal = !translatable || showOriginal;
  const text = showingOriginal ? rec.quote : rec.quoteTranslated;

  return (
    <figure
      id={recSlug(rec.name)}
      className="flex h-full scroll-mt-24 flex-col rounded-xl border border-border bg-card p-5"
    >
      <figcaption className="mb-3 flex items-center gap-3">
        <RecommendationAvatar name={rec.name} photo={rec.photo} size={40} />
        <div className="min-w-0">
          {rec.profileUrl ? (
            <a
              href={rec.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 truncate font-medium text-foreground hover:text-primary"
            >
              {rec.name}
              <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
            </a>
          ) : (
            <div className="truncate font-medium text-foreground">{rec.name}</div>
          )}
          <div className="truncate text-xs text-muted-foreground">{tx(rec.context, lang)}</div>
        </div>
      </figcaption>

      {/* lang on the quote keeps hyphenation/screen-readers correct: it tracks
          whichever text is currently shown (original vs translation). */}
      <blockquote
        lang={showingOriginal ? rec.lang : lang}
        className={cn(
          "flex-1 text-sm leading-relaxed text-muted-foreground",
          compact && "line-clamp-5",
        )}
      >
        {text}
      </blockquote>

      {translatable && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Languages className="h-3.5 w-3.5 shrink-0" />
          {showingOriginal ? (
            <button
              type="button"
              onClick={() => setShowOriginal(false)}
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              {t.seeTranslation}
            </button>
          ) : (
            <>
              <span>{t.translatedFrom.replace("{lang}", t.langNames[rec.lang])}</span>
              <span aria-hidden>·</span>
              <button
                type="button"
                onClick={() => setShowOriginal(true)}
                className="underline-offset-2 hover:text-foreground hover:underline"
              >
                {t.seeOriginal}
              </button>
            </>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <a
          href={LINKEDIN_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {t.source}
          <ExternalLink className="h-3 w-3" />
        </a>
        {compact && (
          <Link
            href={`/recommendations/#${recSlug(rec.name)}`}
            className="text-xs font-medium text-primary hover:text-primary/80"
          >
            {t.readFull}
          </Link>
        )}
      </div>
    </figure>
  );
}

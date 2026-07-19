"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getDict } from "@/lib/dictionary";
import { recommendations } from "@/lib/recommendations";
import RecommendationCard from "@/components/recommendation-card";

export default function Recommendations() {
  const { lang } = useLang();
  const t = getDict(lang).recommendations;
  const featured = recommendations.filter((r) => r.featured);

  return (
    <section id="recommendations" className="py-16 md:py-20 bg-background border-t border-border">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">{t.subtitle}</p>
          </div>
          <Link
            href="/recommendations"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            {t.seeAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((rec) => (
            <RecommendationCard key={rec.name} rec={rec} lang={lang} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

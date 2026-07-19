"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getDict } from "@/lib/dictionary";
import { recommendations } from "@/lib/recommendations";
import RecommendationCard from "@/components/recommendation-card";

export default function RecommendationsPage() {
  const { lang } = useLang();
  const t = getDict(lang).recommendations;

  return (
    <main className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-12 md:py-20 max-w-5xl">
        <Link
          href="/#recommendations"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" /> {t.backHome}
        </Link>

        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          {t.title}
        </h1>
        <p className="text-muted-foreground md:text-lg mb-12 max-w-3xl">{t.pageSubtitle}</p>

        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.name} rec={rec} lang={lang} />
          ))}
        </div>
      </div>
    </main>
  );
}

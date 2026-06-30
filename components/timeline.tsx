"use client"

import { useState, useEffect } from "react";
import { experiences } from "@/lib/data";
import type { Experience } from "@/lib/data";

// ─── Theme ────────────────────────────────────────────────────────────────────
const theme = {
  bg:           "#f9fafb",
  surface:      "#ffffff",
  surfaceHover: "#f8fafc",
  border:       "#e5e7eb",
  text:         "#111827",
  textSecond:   "#6b7280",
  textMuted:    "#9ca3af",
  axis:         "#e5e7eb",
  tick:         "#d1d5db",
  tickLabel:    "#9ca3af",
};

const typeConfig: Record<string, { color: string; label: string }> = {
  job:       { color: "#6366f1", label: "Employment" },
  startup:   { color: "#10b981", label: "Startup"    },
  education: { color: "#8b5cf6", label: "Education"  },
};

const PX_PER_YEAR = 80;
const MIN_HEIGHT  = 76;
const HALF_GAP    = 20;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Segment {
  spanStart: number;
  spanEnd: number;
  left: Experience | null;
  leftIsFirst: boolean;
  right: Experience | null;
  rightIsFirst: boolean;
}

// ─── Layout engine ────────────────────────────────────────────────────────────
function buildLayout(exps: Experience[]) {
  const globalStart = Math.min(...exps.map(e => e.startYear));
  const globalEnd   = Math.max(...exps.map(e => e.endYear));
  const totalYears  = globalEnd - globalStart;

  const leftExps  = exps.filter(e => e.type === "job")
                        .sort((a, b) => b.startYear - a.startYear);
  const rightExps = exps.filter(e => e.type !== "job")
                        .sort((a, b) => b.startYear - a.startYear);

  const boundaries = new Set<number>();
  exps.forEach(e => { boundaries.add(e.startYear); boundaries.add(e.endYear); });
  const sortedB = [...boundaries].sort((a, b) => b - a);

  const segments: Segment[] = [];
  for (let i = 0; i < sortedB.length - 1; i++) {
    const spanEnd   = sortedB[i];
    const spanStart = sortedB[i + 1];
    const mid       = (spanEnd + spanStart) / 2;
    segments.push({
      spanStart, spanEnd,
      left:  leftExps.find(e  => e.startYear <= mid && e.endYear > mid)  ?? null,
      leftIsFirst: false,
      right: rightExps.find(e => e.startYear <= mid && e.endYear > mid) ?? null,
      rightIsFirst: false,
    });
  }

  const merged: Segment[] = [];
  for (const seg of segments) {
    const prev = merged[merged.length - 1];
    if (prev && prev.left?.id === seg.left?.id && prev.right?.id === seg.right?.id) {
      prev.spanStart = seg.spanStart;
    } else {
      merged.push({ ...seg });
    }
  }

  // Mark the first occurrence of each experience in the merged list
  const seenLeft  = new Set<string>();
  const seenRight = new Set<string>();
  for (const seg of merged) {
    if (seg.left  && !seenLeft.has(seg.left.id))  { seg.leftIsFirst  = true; seenLeft.add(seg.left.id); }
    if (seg.right && !seenRight.has(seg.right.id)) { seg.rightIsFirst = true; seenRight.add(seg.right.id); }
  }

  return { segments: merged, globalStart, globalEnd, totalYears };
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  const { color, label } = typeConfig[exp.type] ?? typeConfig.job;
  const duration  = exp.endYear - exp.startYear;
  const isOngoing = exp.endYear >= 2026;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(17, 24, 39, 0.45)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.15s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "32px",
          maxWidth: 520,
          width: "100%",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.06)",
          position: "relative",
          animation: "slideUp 0.2s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            width: 30, height: 30, borderRadius: "50%",
            border: `1px solid ${theme.border}`,
            background: theme.bg,
            cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 18, color: theme.textMuted, lineHeight: 1,
          }}
        >×</button>

        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 12px", borderRadius: 999,
          fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
          textTransform: "uppercase",
          color, border: `1px solid ${color}30`,
          background: `${color}0f`,
          marginBottom: 16,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
          {label}
        </span>

        <h3 style={{
          fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em",
          color: theme.text, lineHeight: 1.3,
          marginBottom: 4,
        }}>
          {exp.title}
        </h3>
        <div style={{ fontSize: 15, color, fontWeight: 600, marginBottom: 4 }}>
          {exp.company}
        </div>
        <div style={{ fontSize: 14, color: theme.textMuted, marginBottom: 24 }}>
          {exp.startYear} – {isOngoing ? "present" : exp.endYear}
          <span style={{ margin: "0 8px", color: theme.tick }}>·</span>
          {duration === 1 ? "1 year" : `${duration} years`}
        </div>

        <div style={{ height: 1, background: theme.border, marginBottom: 24 }} />

        <p style={{
          fontSize: 15, color: theme.textSecond,
          lineHeight: 1.75, marginBottom: 24,
        }}>
          {exp.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {exp.tags.map(t => (
            <span key={t} style={{
              padding: "4px 12px", borderRadius: 999,
              fontSize: 12, fontWeight: 500,
              background: theme.bg, color: theme.textSecond,
              border: `1px solid ${theme.border}`,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ExperienceCard({ exp, pxHeight, onClick, isFirst }: {
  exp: Experience | null;
  pxHeight: number;
  onClick: () => void;
  isFirst: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  if (!exp) return <div style={{ flex: 1 }} />;

  const { color } = typeConfig[exp.type] ?? typeConfig.job;

  // Continuation thread — same job still active, shown as a subtle line only
  if (!isFirst) {
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flex: 1, height: Math.max(pxHeight, MIN_HEIGHT),
          position: "relative", cursor: "pointer",
        }}
      >
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: 3, borderRadius: "0 2px 2px 0",
          background: color,
          opacity: hovered ? 0.5 : 0.2,
          transition: "opacity 0.15s",
        }} />
      </div>
    );
  }

  const duration  = exp.endYear - exp.startYear;
  const isOngoing = exp.endYear >= 2026;
  const cardH     = Math.max(pxHeight, MIN_HEIGHT);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        height: cardH,
        background: hovered ? theme.surfaceHover : theme.surface,
        border: `1px solid ${hovered ? color + "50" : theme.border}`,
        borderRadius: 12,
        padding: "18px 18px 16px 22px",
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "relative",
        transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s",
        boxShadow: hovered
          ? `0 4px 16px rgba(0,0,0,0.08), 0 0 0 2px ${color}18`
          : "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 12, bottom: 12,
        width: 3, borderRadius: "0 2px 2px 0",
        background: color, opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.15s",
      }} />

      {/* Type badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
        textTransform: "uppercase", color,
      }}>
        {typeConfig[exp.type]?.label}
      </div>

      <div style={{
        fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em",
        color: theme.text, lineHeight: 1.3,
      }}>
        {exp.title}
      </div>

      <div style={{ fontSize: 13, color: theme.textSecond, fontWeight: 500 }}>
        {exp.company}
      </div>

      {/* Description excerpt — only shown when card is tall enough */}
      {cardH >= 160 && (
        <p style={{
          fontSize: 13,
          color: theme.textMuted,
          lineHeight: 1.6,
          flex: 1,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: Math.floor((cardH - 130) / 21),
          WebkitBoxOrient: "vertical",
        } as React.CSSProperties}>
          {exp.description}
        </p>
      )}

      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: theme.textMuted }}>
          {exp.startYear}–{isOngoing ? "now" : exp.endYear}
          <span style={{ margin: "0 5px", color: theme.tick }}>·</span>
          {duration === 1 ? "1 yr" : `${duration} yrs`}
        </span>
        <span style={{
          fontSize: 12, fontWeight: 500,
          color: hovered ? color : "transparent",
          transition: "color 0.15s",
        }}>
          details →
        </span>
      </div>
    </div>
  );
}

// ─── Year tick ────────────────────────────────────────────────────────────────
function YearTick({ year, top }: { year: number; top: number }) {
  return (
    <div style={{
      position: "absolute", top, left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      zIndex: 5, pointerEvents: "none",
    }}>
      <div style={{
        width: 9, height: 9, borderRadius: "50%",
        background: "#fff", border: `1.5px solid ${theme.tick}`,
        boxShadow: `0 0 0 4px ${theme.bg}`,
      }} />
      <span style={{ fontSize: 11, color: theme.tickLabel, letterSpacing: "0.04em", fontWeight: 500 }}>
        {year}
      </span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Timeline() {
  const [active, setActive] = useState<Experience | null>(null);
  const { segments, globalStart, globalEnd, totalYears } = buildLayout(experiences);

  const yearToY = (y: number) => ((globalEnd - y) / totalYears) * totalYears * PX_PER_YEAR;
  const canvasH = totalYears * PX_PER_YEAR + 60;

  const ticks: number[] = [];
  for (let y = Math.ceil(globalStart / 5) * 5; y <= globalEnd; y += 5) ticks.push(y);

  return (
    <>
      <div style={{ background: theme.bg, padding: "64px 24px 96px" }}>
        {/* Section header — matches site's left-aligned pattern */}
        <div style={{ maxWidth: 1200, margin: "0 auto 48px" }}>
          <h2 style={{
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: theme.text,
            marginBottom: 16,
            lineHeight: 1.1,
          }}>
            Experience
          </h2>
          <p style={{ fontSize: 18, color: theme.textSecond, maxWidth: 640, lineHeight: 1.6 }}>
            My career path has included both traditional roles and parallel entrepreneurial ventures.
          </p>
        </div>

        {/* Column labels */}
        <div style={{
          maxWidth: 1200, margin: "0 auto 10px",
          display: "flex", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 12, color: theme.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
            ← Employment
          </span>
          <span style={{ fontSize: 12, color: theme.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
            Other roles →
          </span>
        </div>

        {/* Canvas */}
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", height: canvasH }}>
          {/* Center axis */}
          <div style={{
            position: "absolute", left: "50%", top: 0, height: canvasH, width: 1,
            background: `linear-gradient(to bottom, transparent, ${theme.axis} 5%, ${theme.axis} 95%, transparent)`,
            transform: "translateX(-50%)", zIndex: 1,
          }} />

          {ticks.map(y => <YearTick key={y} year={y} top={yearToY(y)} />)}

          {segments.map((seg, i) => {
            const top   = yearToY(seg.spanEnd);
            const spanH = (seg.spanEnd - seg.spanStart) * PX_PER_YEAR;

            return (
              <div key={i} style={{
                position: "absolute", top,
                left: 0, right: 0,
                display: "flex", gap: HALF_GAP * 2,
                height: spanH,
              }}>
                <div style={{ flex: 1 }}>
                  <ExperienceCard
                    exp={seg.left}
                    pxHeight={spanH}
                    onClick={() => seg.left && setActive(seg.left)}
                    isFirst={seg.leftIsFirst}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <ExperienceCard
                    exp={seg.right}
                    pxHeight={spanH}
                    onClick={() => seg.right && setActive(seg.right)}
                    isFirst={seg.rightIsFirst}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {active && <Modal exp={active} onClose={() => setActive(null)} />}
    </>
  );
}

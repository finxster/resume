"use client";

// Subway / git-graph career map. A full-time trunk runs left→right across time
// with side ventures forking off as parallel branches. Hover dims the rest and
// shows a tooltip; clicking a station opens an inline detail panel below the map.
//
// Ported from the design handoff "BART" production preset (proportional time,
// uniform line color, slant branches, country zones, client containers, year
// grid) — all the prototype's tweak options are hard-coded to that config.

import { useState, useMemo, useRef, useEffect } from "react";
import {
  experiences as EXPERIENCES,
  YEAR_MIN,
  YEAR_MAX,
  COUNTRY_PERIODS,
  COUNTRY_PALETTE,
  type Experience,
} from "@/lib/data";
import { useTheme } from "next-themes";
import { useLang, tx, type Lang } from "@/lib/i18n";
import { getDict, type Dictionary } from "@/lib/dictionary";

// The timeline slice of the dictionary, threaded through the sub-components.
type TL = Dictionary["timeline"];

// ── Production preset (BART) ────────────────────────────────────────────────
// Colors follow the "Cool Graphite" brand: graphite ink neutrals, brand
// indigo (#4457E8) for the full-time trunk stations, and a soft graphite for
// side ventures so indigo stays the only saturated accent on the page.
const lightPreset = {
  bg: "#F7F8FA", // brand canvas

  surface: "#FFFFFF",
  ink: "#14161A",
  // 0.65, not 0.55: at 0.55 this lands on 3.9:1 over the canvas and 3.8:1 over
  // the toggle track, both under the 4.5:1 WCAG AA floor. The dark twin below
  // clears AA at 0.55 already, so only the light value moves.
  muted: "rgba(20,22,26,0.65)",
  hairline: "rgba(20,22,26,0.10)",
  fte: "#4457E8",
  side: "#4B5563",
  chip: "rgba(20,22,26,0.04)", // subtle fill for chips / toggle track / hovers
  lineWeight: 7,
  stationStroke: 3,
};

// Dark twin of the preset — mirrors the "Cool Graphite" dark tokens: canvas
// #14161A, surface #1B1E24, ink lifts to the light canvas, and the accent uses
// the lighter indigo (#6E7BFF) the brand book reserves for ink backgrounds.
const darkPreset: typeof lightPreset = {
  bg: "#14161A",
  surface: "#1B1E24",
  ink: "#F7F8FA",
  muted: "rgba(247,248,250,0.55)",
  hairline: "rgba(247,248,250,0.12)",
  fte: "#6E7BFF",
  side: "#9AA3B2",
  chip: "rgba(247,248,250,0.06)",
  lineWeight: 7,
  stationStroke: 3,
};

// Active preset for the current render. The sub-components (SVG stations,
// trunks, tooltips) all read this module binding directly, so the Timeline
// component reassigns it from the resolved theme at the top of its render —
// synchronous top-down rendering guarantees they observe the current value.
let preset = lightPreset;

// ── Layout constants ────────────────────────────────────────────────────────
// Side ventures sit ABOVE the trunk — parallel/entrepreneurial work reads as
// something that rises and adds to the career, not a dip below it.
const PAD_X = 64;
const MAIN_Y = 196; // full-time trunk
const CLIENT_Y = 244; // base Y for client labels — BELOW the trunk (row 1 sits 24px lower)
const SIDE_Y = 56; // side-venture lane — above the trunk
const YEAR_Y = 300; // year-tick ruler
const SVG_H = 320;
const MAP_MIN_WIDTH = 900; // horizontal-scroll floor on narrow screens

// ── Scale (proportional) ────────────────────────────────────────────────────
function range(a: number, b: number) {
  const out: number[] = [];
  for (let i = a; i <= b; i++) out.push(i);
  return out;
}

function buildScale(width: number) {
  const innerW = width - PAD_X * 2;
  return {
    yearToX: (y: number) => PAD_X + ((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * innerW,
    years: range(YEAR_MIN, Math.floor(YEAR_MAX)),
  };
}
type Scale = ReturnType<typeof buildScale>;

// FTE discs sit on the MIDPOINT of the role band; side discs on their point year.
function getStationX(scale: Scale, exp: Experience) {
  if (exp.track === "side") return scale.yearToX(exp.pointYear ?? exp.start);
  return (scale.yearToX(exp.start) + scale.yearToX(exp.end)) / 2;
}
function getLabelX(scale: Scale, exp: Experience) {
  if (exp.track !== "fte") return getStationX(scale, exp);
  return (scale.yearToX(exp.start) + scale.yearToX(exp.end)) / 2;
}
function getSegment(scale: Scale, exp: Experience): [number, number] {
  return [scale.yearToX(exp.start), scale.yearToX(exp.end)];
}

// Branch horizontal extents. Merge-back branches need a wide platform; open
// (ongoing) branches keep a narrow footprint and trail off into a dashed tail.
function branchExtents(exp: Experience, scale: Scale): [number, number] {
  let x1 = scale.yearToX(exp.start);
  let x2 = scale.yearToX(exp.end);
  const MIN_W = exp.mergesBack !== false ? 156 : 72;
  const w = x2 - x1;
  if (w < MIN_W) {
    if (exp.mergesBack === false) {
      x2 = x1 + MIN_W; // widen rightward; keep the fork at the true start year
    } else {
      const cx = (x1 + x2) / 2;
      x1 = cx - MIN_W / 2;
      x2 = cx + MIN_W / 2;
    }
  }
  return [x1, x2];
}
function branchMidX(exp: Experience, scale: Scale) {
  const [a, b] = branchExtents(exp, scale);
  return (a + b) / 2;
}

function formatYears(exp: Experience, t: TL) {
  if (exp.pointYear && exp.end - exp.start <= 1) return String(exp.pointYear);
  if (exp.start === exp.end) return String(exp.start);
  return `${exp.start} – ${exp.end >= 2026 ? t.now : exp.end}`;
}
function formatRange(exp: Experience, t: TL) {
  if (exp.pointYear && exp.end - exp.start <= 1) return String(exp.pointYear);
  if (exp.start === exp.end) return String(exp.start);
  const end = exp.end >= 2026 ? t.present : exp.end;
  return `${exp.start} – ${end}`;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function CountryZones({ scale, yTop, yBottom, lang }: { scale: Scale; yTop: number; yBottom: number; lang: Lang }) {
  return (
    <g style={{ pointerEvents: "none" }}>
      {COUNTRY_PERIODS.map((p, i) => {
        const x1 = scale.yearToX(p.start);
        const x2 = scale.yearToX(Math.min(p.end, YEAR_MAX));
        const pal = COUNTRY_PALETTE[p.code] || ({} as (typeof COUNTRY_PALETTE)[string]);
        const w = x2 - x1;
        return (
          <g key={i}>
            <rect x={x1} y={yTop} width={w} height={yBottom - yTop} fill={pal.zone || "rgba(0,0,0,0.04)"} />
            {i > 0 && (
              <line
                x1={x1}
                y1={yTop}
                x2={x1}
                y2={yBottom}
                stroke={pal.ink || preset.muted}
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.3"
              />
            )}
            <text
              x={x1 + w / 2}
              y={yTop + 15}
              textAnchor="middle"
              fontSize="9.5"
              fill={pal.ink || preset.muted}
              opacity="0.8"
              fontWeight="600"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}
            >
              {w > 64 ? tx(p.label, lang).toUpperCase() : p.code}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function YearGrid({ scale, yTop, yBottom }: { scale: Scale; yTop: number; yBottom: number }) {
  const xs = scale.years.filter((y) => y % 5 === 0).map((y) => scale.yearToX(y));
  return (
    <g style={{ pointerEvents: "none" }}>
      {xs.map((x, i) => (
        <line key={i} x1={x} y1={yTop} x2={x} y2={yBottom} stroke={preset.ink} strokeOpacity="0.06" strokeWidth="1" />
      ))}
    </g>
  );
}

function YearTickAxis({ scale, W, y }: { scale: Scale; W: number; y: number }) {
  return (
    <g>
      <line x1={PAD_X * 0.7} y1={y} x2={W - PAD_X * 0.45} y2={y} stroke={preset.hairline} strokeWidth="1" />
      {scale.years.map((yr) => {
        const x = scale.yearToX(yr);
        const isFive = yr % 5 === 0;
        return (
          <g key={yr} transform={`translate(${x}, ${y})`}>
            <circle cx="0" cy="0" r={isFive ? 2 : 1.1} fill={isFive ? preset.muted : preset.hairline} />
            {isFive && (
              <text
                y={14}
                textAnchor="middle"
                fontSize="9.5"
                fill={preset.muted}
                style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
              >
                {yr}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

function PresentChip({ x, y, t }: { x: number; y: number; t: TL }) {
  const cx = x - 38;
  const fill = preset.fte;
  return (
    <g>
      <rect x={cx - 30} y={y - 32} rx="3" ry="3" width="60" height="20" fill={fill} />
      <text
        x={cx}
        y={y - 18}
        textAnchor="middle"
        fontSize="10"
        fill="#fff"
        letterSpacing="0.14em"
        fontWeight="600"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {t.today}
      </text>
      <path d={`M ${cx},${y - 11} L ${cx - 4},${y - 16} L ${cx + 4},${y - 16} Z`} fill={fill} />
    </g>
  );
}

// Side branch path — a dotted "scoop" off the trunk. Finite ventures (fleeber,
// PayAqui) rise to the side lane and curve back down; the ongoing venture
// (AtipicALI) rises and trails off into a dotted, open-ended tail.
function BranchPath({ exp, scale, dimmed, arrowTipX }: { exp: Experience; scale: Scale; dimmed: boolean; arrowTipX: number }) {
  const [x1, x2] = branchExtents(exp, scale);
  const midX = (x1 + x2) / 2;
  const lw = preset.lineWeight;
  const paint = preset.ink; // uniform mode — trunk + branches share neutral ink
  // Ventures render in the lighter "current" shade — same as AtipicALI's open
  // tail and the trunk's dashed open end, so parallel work reads as secondary.
  const paintOpacity = 0.78 * 0.7;
  const mergesBack = exp.mergesBack !== false;
  const dotDash = `${lw * 1.1} ${lw * 1.3}`; // soft, evenly spaced dashes
  const tailGap = 20;

  let d: string;
  if (mergesBack) {
    // Smooth symmetric scoop: trunk → peak at (midX, SIDE_Y) → back to trunk.
    const cW = (x2 - x1) * 0.3;
    d =
      `M ${x1},${MAIN_Y} ` +
      `C ${x1 + cW},${MAIN_Y} ${midX - cW},${SIDE_Y} ${midX},${SIDE_Y} ` +
      `C ${midX + cW},${SIDE_Y} ${x2 - cW},${MAIN_Y} ${x2},${MAIN_Y}`;
  } else {
    // Half scoop: trunk → peak at (midX, SIDE_Y); the tail continues past it.
    const rise = midX - x1;
    d =
      `M ${x1},${MAIN_Y} ` +
      `C ${x1 + rise * 0.55},${MAIN_Y} ${midX - rise * 0.45},${SIDE_Y} ${midX},${SIDE_Y}`;
  }

  return (
    <g style={{ opacity: dimmed ? 0.35 : 1, transition: "opacity 160ms" }}>
      <path
        d={d}
        fill="none"
        stroke={paint}
        strokeOpacity={paintOpacity}
        strokeWidth={lw}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dotDash}
      />
      {!mergesBack && (() => {
        // The ongoing tail runs flush to the trunk's arrow tip.
        const tailStart = midX + tailGap;
        const tailEnd = Math.max(tailStart + 12, arrowTipX);
        return (
          <line
            x1={tailStart}
            y1={SIDE_Y}
            x2={tailEnd}
            y2={SIDE_Y}
            stroke={paint}
            strokeOpacity={paintOpacity}
            strokeWidth={lw}
            strokeLinecap="round"
            strokeDasharray={dotDash}
          />
        );
      })()}
    </g>
  );
}

// Client engagements annotated on the trunk as a dashed rounded container with
// per-period labels (staggered onto two rows) and small "stop" marks.
function ClientLane({ exp, scale, t }: { exp: Experience; scale: Scale; t: TL }) {
  const periods = exp.clientPeriods || [];
  if (!periods.length) return null;
  const trunkPaint = preset.ink;
  const ROW_GAP = 24;
  const lw = preset.lineWeight;
  const stopR = Math.max(4.5, lw * 0.7);

  const seg = getSegment(scale, exp);
  const capX1 = seg[0] + 27;
  const capX2 = seg[1] - 27;
  const capTop = MAIN_Y - 2; // box hangs below the trunk
  const capBottom = CLIENT_Y + ROW_GAP + 14;

  const fteXs = EXPERIENCES.filter((e) => e.track === "fte").map((e) => getStationX(scale, e));
  const LOGO_CLEAR = 32;
  const placeStop = (x1: number, x2: number) => {
    let cx = (x1 + x2) / 2;
    for (const sx of fteXs) {
      if (Math.abs(cx - sx) < LOGO_CLEAR) cx = cx <= sx ? sx - LOGO_CLEAR : sx + LOGO_CLEAR;
    }
    cx = Math.max(x1 + 4, Math.min(x2 - 4, cx));
    const hidden = fteXs.some((sx) => Math.abs(cx - sx) < 27);
    return { cx, hidden };
  };

  const yearWithinExp = (year: number) => scale.yearToX(year);

  return (
    <g style={{ pointerEvents: "none" }}>
      {capX2 - capX1 > 40 && (
        <>
          <rect x={capX1} y={capTop} width={capX2 - capX1} height={capBottom - capTop} rx="13" fill={trunkPaint} opacity="0.05" />
          <rect
            x={capX1}
            y={capTop}
            width={capX2 - capX1}
            height={capBottom - capTop}
            rx="13"
            fill="none"
            stroke={trunkPaint}
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </>
      )}
      {periods.map((p, i) => {
        const x1 = yearWithinExp(p.start);
        const x2 = yearWithinExp(p.end);
        const placed = placeStop(x1, x2);
        const cx = placed.cx;
        const showStop = !placed.hidden;
        const row = i % 2;
        const labelY = CLIENT_Y + row * ROW_GAP; // rows stagger downward
        const connectorStart = showStop ? MAIN_Y + stopR + 4 : MAIN_Y + 7;
        const connectorEnd = labelY - 6;
        return (
          <g key={i}>
            <line x1={x1} y1={MAIN_Y - 5} x2={x1} y2={MAIN_Y + 5} stroke={preset.surface} strokeWidth="2.5" />
            <line x1={x1} y1={MAIN_Y - 5} x2={x1} y2={MAIN_Y + 5} stroke={trunkPaint} strokeWidth="1.25" opacity="0.55" />
            {showStop && (
              <>
                <circle cx={cx} cy={MAIN_Y} r={stopR + 2} fill={preset.surface} opacity="0.9" />
                <circle cx={cx} cy={MAIN_Y} r={stopR} fill={preset.surface} stroke={trunkPaint} strokeWidth="2.25" />
              </>
            )}
            <line
              x1={cx}
              y1={connectorStart}
              x2={cx}
              y2={connectorEnd}
              stroke={preset.muted}
              strokeWidth="0.75"
              opacity="0.45"
              strokeDasharray="1.5 2.5"
            />
            <text
              x={cx}
              y={labelY}
              textAnchor="middle"
              fontSize="10"
              fill={preset.ink}
              opacity="0.85"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.02em", fontWeight: 600 }}
            >
              {p.client}
            </text>
            <text
              x={cx}
              y={labelY + 11}
              textAnchor="middle"
              fontSize="9"
              fill={preset.muted}
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
            >
              {p.start}–{p.end >= 2026 ? t.now : p.end}
            </text>
          </g>
        );
      })}
      {(() => {
        const last = periods[periods.length - 1];
        const xEnd = yearWithinExp(last.end);
        return (
          <>
            <line x1={xEnd} y1={MAIN_Y - 5} x2={xEnd} y2={MAIN_Y + 5} stroke={preset.surface} strokeWidth="2.5" />
            <line x1={xEnd} y1={MAIN_Y - 5} x2={xEnd} y2={MAIN_Y + 5} stroke={trunkPaint} strokeWidth="1.25" opacity="0.55" />
          </>
        );
      })()}
    </g>
  );
}

// Station disc — BART "filled" style: solid colored disc, white inner, mono
// initials. Company name + year range labeled below.
function LogoNode({
  exp,
  x,
  y,
  labelX,
  color,
  compact,
  labelAbove,
  isHovered,
  isSelected,
  dimmed,
  onHover,
  onSelect,
  t,
}: {
  exp: Experience;
  x: number;
  y: number;
  labelX?: number;
  color: string;
  compact?: boolean;
  labelAbove?: boolean;
  isHovered: boolean;
  isSelected: boolean;
  dimmed: boolean;
  onHover: (exp: Experience | null, e?: React.MouseEvent) => void;
  onSelect: (id: string) => void;
  t: TL;
}) {
  const active = isHovered || isSelected;
  const r = compact ? (active ? 18 : 16) : active ? 23 : 21;
  const ring = preset.stationStroke + 1;
  const labelGap = 14;
  const dir = labelAbove ? -1 : 1; // company name nearest the disc, years beyond
  const companyY = y + dir * (r + labelGap + 4);
  const yearsY = companyY + dir * 14;
  const lx = labelX ?? x;
  const initialFill = active ? "#fff" : color;

  return (
    <g
      className="station"
      style={{ cursor: "pointer", opacity: dimmed ? 0.5 : 1, transition: "opacity 160ms" }}
      onMouseEnter={(e) => onHover(exp, e)}
      onMouseMove={(e) => onHover(exp, e)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(exp.id)}
    >
      <circle cx={x} cy={y} r={r + 10} fill="transparent" />
      {/* BART marker: solid ring, white inside */}
      <circle cx={x} cy={y} r={r} fill={color} />
      <circle cx={x} cy={y} r={r - ring} fill={preset.surface} />
      {active && <circle cx={x} cy={y} r={r - ring - 2} fill={color} opacity={isSelected ? 0.95 : 0.45} />}

      <text
        x={x}
        y={y + (compact ? 4 : 5)}
        textAnchor="middle"
        fontSize={compact ? "12" : "14"}
        fontWeight="700"
        fill={initialFill}
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}
      >
        {exp.initial || exp.code}
      </text>

      {!active && (
        <circle
          cx={x}
          cy={y}
          r={r - ring - 5}
          fill="none"
          stroke={color}
          strokeWidth="0.75"
          strokeDasharray="1.5 2.5"
          opacity="0.35"
        />
      )}

      <text
        x={lx}
        y={companyY}
        textAnchor="middle"
        fontSize="13"
        fontWeight={600}
        fill="var(--ink)"
        stroke="var(--bg)"
        strokeWidth="3.5"
        style={{ paintOrder: "stroke", strokeLinejoin: "round" }}
      >
        {exp.shortCompany || exp.company}
      </text>
      <text
        x={lx}
        y={yearsY}
        textAnchor="middle"
        fontSize="11"
        fill="var(--muted)"
        stroke="var(--bg)"
        strokeWidth="3"
        style={{ paintOrder: "stroke", strokeLinejoin: "round", fontFamily: "var(--font-mono)" }}
      >
        {formatYears(exp, t)}
      </text>
    </g>
  );
}

// ── The map ──────────────────────────────────────────────────────────────────
function TimelineMap({
  W,
  scale,
  hovered,
  selected,
  onHover,
  onSelect,
  lang,
  t,
}: {
  W: number;
  scale: Scale;
  hovered: string | null;
  selected: string | null;
  onHover: (exp: Experience | null, e?: React.MouseEvent) => void;
  onSelect: (id: string) => void;
  lang: Lang;
  t: TL;
}) {
  // Chronological order: the trunk is drawn left to right, independent of the
  // list order in lib/data.ts (which is newest-first).
  const ftes = EXPERIENCES.filter((e) => e.track === "fte").sort((a, b) => a.start - b.start);
  const sides = EXPERIENCES.filter((e) => e.track === "side");
  const trunkPaint = preset.ink;
  const trunkOpacity = 0.78;
  const lw = preset.lineWeight;

  const trunkStartX = scale.yearToX(ftes[0].start);
  const trunkEndX = scale.yearToX(ftes[ftes.length - 1].end);
  const arrowTipX = Math.min(scale.yearToX(YEAR_MAX), W - PAD_X * 0.55);

  return (
    <svg className="map" width={W} height={SVG_H} viewBox={`0 0 ${W} ${SVG_H}`} onMouseLeave={() => onHover(null)}>
      <CountryZones scale={scale} yTop={20} yBottom={YEAR_Y - 14} lang={lang} />
      <YearGrid scale={scale} yTop={44} yBottom={YEAR_Y} />
      <YearTickAxis scale={scale} W={W} y={YEAR_Y} />

      {/* Side branches — behind the trunk so discs sit on top */}
      {sides.map((exp) => (
        <BranchPath key={exp.id} exp={exp} scale={scale} dimmed={!!hovered && hovered !== exp.id} arrowTipX={arrowTipX} />
      ))}

      {/* Trunk: solid run, dashed open end, arrowhead */}
      <line
        x1={trunkStartX}
        y1={MAIN_Y}
        x2={trunkEndX}
        y2={MAIN_Y}
        stroke={trunkPaint}
        strokeOpacity={trunkOpacity}
        strokeWidth={lw}
        strokeLinecap="round"
      />
      <line
        x1={trunkEndX}
        y1={MAIN_Y}
        x2={arrowTipX - 14}
        y2={MAIN_Y}
        stroke={trunkPaint}
        strokeWidth={lw}
        strokeLinecap="round"
        strokeDasharray={`${lw * 1.2} ${lw * 1.4}`}
        opacity={trunkOpacity * 0.55}
      />
      <path
        d={`M ${arrowTipX - 14},${MAIN_Y - lw * 1.4} L ${arrowTipX},${MAIN_Y} L ${arrowTipX - 14},${MAIN_Y + lw * 1.4} Z`}
        fill={trunkPaint}
        opacity={trunkOpacity * 0.95}
      />

      {/* Client containers */}
      {ftes.filter((e) => e.clientPeriods).map((exp) => (
        <ClientLane key={exp.id} exp={exp} scale={scale} t={t} />
      ))}

      {/* FTE stations */}
      {ftes.map((exp) => (
        <LogoNode
          key={exp.id}
          exp={exp}
          x={getStationX(scale, exp)}
          y={MAIN_Y}
          labelX={getLabelX(scale, exp)}
          color={preset.fte}
          labelAbove
          isHovered={hovered === exp.id}
          isSelected={selected === exp.id}
          dimmed={!!hovered && hovered !== exp.id}
          onHover={onHover}
          onSelect={onSelect}
          t={t}
        />
      ))}

      {/* Side stations */}
      {sides.map((exp) => (
        <LogoNode
          key={exp.id}
          exp={exp}
          x={branchMidX(exp, scale)}
          y={SIDE_Y}
          color={preset.ink}
          compact
          isHovered={hovered === exp.id}
          isSelected={selected === exp.id}
          dimmed={!!hovered && hovered !== exp.id}
          onHover={onHover}
          onSelect={onSelect}
          t={t}
        />
      ))}

      <PresentChip x={arrowTipX} y={MAIN_Y} t={t} />
    </svg>
  );
}

// ── Tooltip & detail panel ───────────────────────────────────────────────────
function Tooltip({ x, y, exp, lang, t }: { x: number; y: number; exp: Experience; lang: Lang; t: TL }) {
  const c = exp.track === "fte" ? preset.fte : preset.side;
  const w = 280;
  const left = Math.max(8, x - w / 2);
  const top = y + 16;
  return (
    <div className="tl-tooltip" style={{ left, top, borderTopColor: preset.ink }}>
      <div className="tl-tt-row">
        <span className="tl-tt-chip" style={{ background: c }}>
          {exp.code}
        </span>
        <span className="tl-tt-track">{exp.track === "fte" ? t.fullTime : t.sideVenture}</span>
      </div>
      <div className="tl-tt-title">{tx(exp.title, lang)}</div>
      <div className="tl-tt-co">{exp.company}</div>
      <div className="tl-tt-meta">
        <span>{formatRange(exp, t)}</span>
        <span className="tl-tt-dot">·</span>
        <span>{tx(exp.location, lang)}</span>
      </div>
      <div className="tl-tt-short">{tx(exp.short, lang)}</div>
    </div>
  );
}

function DetailModal({ exp, onClose, lang, t }: { exp: Experience; onClose: () => void; lang: Lang; t: TL }) {
  const c = exp.track === "fte" ? preset.fte : preset.side;
  // Esc to close + lock background scroll while the modal is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="tl-modal-overlay" onClick={onClose}>
      <div className="tl-detail tl-modal-card" style={{ borderColor: c }} onClick={(e) => e.stopPropagation()}>
        <div className="tl-detail-bar" style={{ background: c }} />
      <div className="tl-detail-inner">
        <div className="tl-d-head">
          <div>
            <div className="tl-d-track">
              <span className="tl-d-chip" style={{ background: c }}>
                {exp.code}
              </span>
              <span className="tl-d-track-label">{exp.track === "fte" ? t.fullTime : t.sideVenture}</span>
            </div>
            <h3 className="tl-d-title">{tx(exp.title, lang)}</h3>
            <div className="tl-d-co">
              <strong>{exp.company}</strong>
              <span className="tl-d-dot">·</span>
              <span>{formatRange(exp, t)}</span>
              <span className="tl-d-dot">·</span>
              <span>{tx(exp.location, lang)}</span>
            </div>
          </div>
          <button className="tl-d-close" onClick={onClose} aria-label={t.close}>
            ×
          </button>
        </div>

        <p className="tl-d-desc">{tx(exp.description, lang)}</p>

        {exp.progression ? (
          <div className="tl-d-section">
            <div className="tl-d-label">{t.progression}</div>
            <ol className="tl-d-progression" style={{ borderLeftColor: c }}>
              {exp.progression.map((p, i) => (
                <li key={i}>
                  <span className="tl-d-prog-marker" style={{ background: c }} />
                  <div>
                    <div className="tl-d-prog-head">
                      <span className="tl-d-prog-years">{p.years}</span>
                      <span className="tl-d-prog-title">{tx(p.title, lang)}</span>
                    </div>
                    <div className="tl-d-prog-note">{tx(p.note, lang)}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          exp.roles && (
            <div className="tl-d-roles">
              {exp.roles.map((rr) => (
                <span className="tl-d-role" key={tx(rr, lang)}>
                  {tx(rr, lang)}
                </span>
              ))}
            </div>
          )
        )}

        <div className="tl-d-section">
          <div className="tl-d-label">{t.skillsTech}</div>
          <div className="tl-d-tech">
            {exp.tech.map((tt) => (
              <span className="tl-d-techchip" key={tt}>
                {tt}
              </span>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

// ── List view ─────────────────────────────────────────────────────────────────
// A classic, text-first rendering of the same data — easier to scan top-to-
// bottom and trivially machine-readable (real DOM text, semantic markup) for
// anything crawling the page. Most-recent first; side ventures flagged inline.
function ListView({ lang, t }: { lang: Lang; t: TL }) {
  // Reverse chronological, with the current full-time role pinned to the top so
  // the list opens on what I'm doing now rather than on a side venture.
  const items: Experience[] = [...EXPERIENCES].sort((a, b) => b.start - a.start);
  const currentIdx = items.findIndex((e) => e.track === "fte" && e.end >= new Date().getFullYear());
  if (currentIdx > 0) items.unshift(items.splice(currentIdx, 1)[0]);
  return (
    <ol className="tl-list">
      {items.map((exp) => {
        const c = exp.track === "fte" ? preset.fte : preset.side;
        return (
          <li key={exp.id} className="tl-li">
            <div className="tl-li-rail" style={{ background: c }} />
            <div className="tl-li-body">
              <div className="tl-li-head">
                <span className="tl-li-chip" style={{ background: c }}>{exp.code}</span>
                <span className="tl-li-track">{exp.track === "fte" ? t.fullTime : t.sideVenture}</span>
                <span className="tl-li-range">{formatRange(exp, t)}</span>
              </div>
              <h3 className="tl-li-title">{tx(exp.title, lang)}</h3>
              <div className="tl-li-co">
                <strong>{exp.company}</strong>
                <span className="tl-d-dot">·</span>
                <span>{tx(exp.location, lang)}</span>
              </div>
              <p className="tl-li-desc">{tx(exp.description, lang)}</p>

              {exp.progression && (
                <ol className="tl-d-progression tl-li-prog" style={{ borderLeftColor: c }}>
                  {exp.progression.map((p, i) => (
                    <li key={i}>
                      <span className="tl-d-prog-marker" style={{ background: c }} />
                      <div>
                        <div className="tl-d-prog-head">
                          <span className="tl-d-prog-years">{p.years}</span>
                          <span className="tl-d-prog-title">{tx(p.title, lang)}</span>
                        </div>
                        <div className="tl-d-prog-note">{tx(p.note, lang)}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              )}

              {exp.clientPeriods && (
                <div className="tl-li-clients">
                  {exp.clientPeriods.map((cp, i) => (
                    <span className="tl-li-client" key={i}>
                      {cp.client} <span className="tl-li-client-yr">{cp.start}–{cp.end >= 2026 ? t.now : cp.end}</span>
                    </span>
                  ))}
                </div>
              )}

              <div className="tl-d-tech tl-li-tech">
                {exp.tech.map((tt) => (
                  <span className="tl-d-techchip" key={tt}>{tt}</span>
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ViewToggle({
  view,
  onChange,
  t,
}: {
  view: "timeline" | "list";
  onChange: (v: "timeline" | "list") => void;
  t: TL;
}) {
  return (
    <div className="tl-toggle" role="group" aria-label={t.viewLabel}>
      <button
        type="button"
        className={`tl-toggle-btn${view === "timeline" ? " is-active" : ""}`}
        aria-pressed={view === "timeline"}
        onClick={() => onChange("timeline")}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="4" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.4" />
          <line x1="6.4" y1="8" x2="9.6" y2="8" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        {t.viewTimeline}
      </button>
      <button
        type="button"
        className={`tl-toggle-btn${view === "list" ? " is-active" : ""}`}
        aria-pressed={view === "list"}
        onClick={() => onChange("list")}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <line x1="5.5" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="5.5" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="5.5" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="2.4" cy="4" r="1" fill="currentColor" />
          <circle cx="2.4" cy="8" r="1" fill="currentColor" />
          <circle cx="2.4" cy="12" r="1" fill="currentColor" />
        </svg>
        {t.viewList}
      </button>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Timeline() {
  const { lang } = useLang();
  const { resolvedTheme } = useTheme();
  // `resolvedTheme` is undefined during SSR and the first client render, so we
  // stay on the light preset until mounted — otherwise the server-rendered
  // inline `--ink`/`--bg` style attributes hydrate light and never get patched
  // (React skips attribute mismatches), leaving the map dark-on-dark for
  // return visitors whose stored theme is dark. The post-mount re-render then
  // applies the real theme.
  const [themeReady, setThemeReady] = useState(false);
  useEffect(() => setThemeReady(true), []);
  // Swap the module-level preset the SVG sub-components read from, before any
  // of them render this pass.
  preset = themeReady && resolvedTheme === "dark" ? darkPreset : lightPreset;
  const t = getDict(lang).timeline;
  const outerRef = useRef<HTMLDivElement>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const [wrapW, setWrapW] = useState(MAP_MIN_WIDTH);
  const [view, setView] = useState<"timeline" | "list">("timeline");
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Callback ref: the map wrapper unmounts when switching to the list view,
  // so the observer must re-attach every time a new node mounts — a mount-only
  // effect would leave the remounted map stuck at a stale width.
  const wrapRef = (node: HTMLDivElement | null) => {
    roRef.current?.disconnect();
    roRef.current = null;
    if (!node) return;
    setWrapW(Math.max(MAP_MIN_WIDTH, node.getBoundingClientRect().width));
    const ro = new ResizeObserver(([entry]) => {
      setWrapW(Math.max(MAP_MIN_WIDTH, entry.contentRect.width));
    });
    ro.observe(node);
    roRef.current = ro;
  };

  const scale = useMemo(() => buildScale(wrapW), [wrapW]);
  const hoveredExp = hovered ? EXPERIENCES.find((e) => e.id === hovered) ?? null : null;
  const selectedExp = selected ? EXPERIENCES.find((e) => e.id === selected) ?? null : null;

  return (
    <div
      style={
        {
          background: preset.bg,
          color: preset.ink,
          padding: "64px 0 80px",
          "--ink": preset.ink,
          "--muted": preset.muted,
          "--bg": preset.bg,
          "--surface": preset.surface,
          "--hairline": preset.hairline,
          "--fte": preset.fte,
          "--side": preset.side,
          "--chip": preset.chip,
        } as React.CSSProperties
      }
    >
      <style>{TIMELINE_CSS}</style>

      <div className="container px-4 md:px-6">
        <h2
          style={{
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
            lineHeight: 1.1,
          }}
        >
          {t.title}
        </h2>
        <div className="tl-header">
          <p style={{ fontSize: 18, color: preset.muted, maxWidth: 640, lineHeight: 1.6, margin: 0 }}>
            {t.subtitle}
          </p>
          <ViewToggle view={view} onChange={setView} t={t} />
        </div>

        {view === "timeline" ? (
          <>
            {/* Relative wrapper so the hover tooltip can sit OUTSIDE the
                horizontal-scroll container (which clips on the y-axis). */}
            <div ref={outerRef} style={{ position: "relative" }}>
              <div style={{ overflowX: "auto", overflowY: "hidden" }}>
                <div ref={wrapRef} className="tl-map-wrap" style={{ minWidth: MAP_MIN_WIDTH, position: "relative" }}>
                  <TimelineMap
                    W={wrapW}
                    scale={scale}
                    lang={lang}
                    t={t}
                    hovered={hovered}
                    selected={selected}
                    onHover={(exp, e) => {
                      setHovered(exp?.id ?? null);
                      if (exp && e && outerRef.current) {
                        const rect = outerRef.current.getBoundingClientRect();
                        setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                      }
                    }}
                    onSelect={(id) => setSelected((cur) => (cur === id ? null : id))}
                  />
                </div>
              </div>
              {hoveredExp && !selected && (
                <Tooltip x={tooltipPos.x} y={tooltipPos.y} exp={hoveredExp} lang={lang} t={t} />
              )}
            </div>

            {selectedExp && (
              <DetailModal exp={selectedExp} onClose={() => setSelected(null)} lang={lang} t={t} />
            )}
          </>
        ) : (
          <ListView lang={lang} t={t} />
        )}
      </div>
    </div>
  );
}

// Scoped CSS ported from the design reference (tooltip + detail panel).
const TIMELINE_CSS = `
  .tl-map-wrap .map { display: block; width: 100%; height: auto; overflow: visible; }
  .tl-map-wrap .station text { pointer-events: none; user-select: none; }

  .tl-header { display: flex; align-items: flex-end; justify-content: space-between;
    gap: 24px; flex-wrap: wrap; margin: 0 0 32px; }
  .tl-toggle { display: inline-flex; padding: 3px; border-radius: 10px;
    background: var(--chip); border: 0.5px solid var(--hairline); flex-shrink: 0; }
  .tl-toggle-btn { display: inline-flex; align-items: center; gap: 6px; appearance: none;
    border: none; background: transparent; cursor: pointer; padding: 7px 13px; border-radius: 8px;
    font-size: 13px; font-weight: 500; color: var(--muted); transition: all 140ms ease;
    font-family: inherit; }
  .tl-toggle-btn:hover { color: var(--ink); }
  .tl-toggle-btn.is-active { background: var(--surface); color: var(--ink);
    box-shadow: 0 1px 2px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04); }
  .tl-toggle-btn.is-active svg { color: var(--fte); }

  .tl-list { list-style: none; margin: 8px auto 0; padding: 0;
    display: flex; flex-direction: column; gap: 20px; max-width: 760px; }
  .tl-li { position: relative; display: flex; gap: 18px; background: var(--surface);
    border: 0.5px solid var(--hairline); border-radius: 14px; overflow: hidden;
    padding: 20px 22px 20px 0; box-shadow: 0 1px 0 rgba(0,0,0,0.02), 0 8px 22px rgba(0,0,0,0.04); }
  .tl-li-rail { flex-shrink: 0; width: 4px; align-self: stretch; margin-right: 4px; }
  .tl-li-body { flex: 1; min-width: 0; }
  .tl-li-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 9px; }
  .tl-li-chip { font-family: var(--font-mono); font-size: 11px; font-weight: 600;
    letter-spacing: 0.06em; padding: 3px 7px; border-radius: 3px; color: #fff; }
  .tl-li-track { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted); }
  .tl-li-range { margin-left: auto; font-family: var(--font-mono); font-size: 12px; color: var(--muted); }
  .tl-li-title { margin: 0 0 5px; font-size: 19px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.25; }
  .tl-li-co { display: flex; flex-wrap: wrap; align-items: baseline; gap: 7px; font-size: 13.5px; color: var(--muted); }
  .tl-li-co strong { color: var(--ink); font-weight: 600; }
  .tl-li-desc { margin: 12px 0 0; font-size: 14px; line-height: 1.6; color: var(--ink); opacity: 0.9; }
  .tl-li-prog { margin-top: 14px; }
  .tl-li-clients { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }
  .tl-li-client { font-size: 12px; color: var(--ink); opacity: 0.85; padding: 3px 9px;
    border: 0.5px solid var(--hairline); border-radius: 999px; background: var(--chip); }
  .tl-li-client-yr { font-family: var(--font-mono); font-size: 10.5px; color: var(--muted); }
  .tl-li-tech { margin-top: 14px; }
  @media (max-width: 640px) { .tl-li-range { margin-left: 0; width: 100%; } }

  .tl-tooltip {
    position: absolute; width: 280px; background: var(--surface);
    border: 0.5px solid var(--hairline); border-top: 2px solid var(--ink);
    border-radius: 10px; padding: 12px 14px 13px;
    box-shadow: 0 14px 36px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.04);
    pointer-events: none; z-index: 10;
  }
  .tl-tt-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .tl-tt-chip { display: inline-block; font-family: var(--font-mono); font-size: 10px; font-weight: 600;
    letter-spacing: 0.06em; padding: 3px 6px; border-radius: 3px; color: #fff; }
  .tl-tt-track { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted); white-space: nowrap; }
  .tl-tt-title { font-size: 14px; font-weight: 600; line-height: 1.25; margin-bottom: 2px; }
  .tl-tt-co { font-size: 13px; color: var(--muted); margin-bottom: 8px; }
  .tl-tt-meta { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono);
    font-size: 11px; color: var(--muted); margin-bottom: 8px; }
  .tl-tt-dot { opacity: 0.5; }
  .tl-tt-short { font-size: 12.5px; line-height: 1.45; color: var(--ink); opacity: 0.85;
    padding-top: 8px; border-top: 0.5px solid var(--hairline); }

  .tl-modal-overlay { position: fixed; inset: 0; z-index: 1000;
    background: rgba(26,26,31,0.45); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
    animation: tlFadeIn 150ms ease; }
  @keyframes tlFadeIn { from { opacity: 0; } to { opacity: 1; } }
  .tl-detail { position: relative; margin-top: 12px; background: var(--surface);
    border: 0.5px solid var(--hairline); border-radius: 14px; overflow: hidden;
    box-shadow: 0 1px 0 rgba(0,0,0,0.02), 0 12px 32px rgba(0,0,0,0.06);
    animation: tlDetailIn 240ms cubic-bezier(0.2, 0.7, 0.2, 1); }
  .tl-modal-card { margin-top: 0; width: 100%; max-width: 560px;
    max-height: calc(100vh - 48px); overflow-y: auto;
    box-shadow: 0 25px 60px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.1); }
  @keyframes tlDetailIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .tl-detail-bar { height: 4px; width: 100%; }
  .tl-detail-inner { padding: 22px 24px 24px; }
  .tl-d-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; }
  .tl-d-track { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .tl-d-chip { font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
    padding: 3px 7px; border-radius: 3px; color: #fff; }
  .tl-d-track-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted); white-space: nowrap; }
  .tl-d-title { margin: 0 0 8px; font-size: 22px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.2; }
  .tl-d-co { display: flex; flex-wrap: wrap; align-items: baseline; gap: 7px; font-size: 13.5px; color: var(--muted); }
  .tl-d-co strong { color: var(--ink); font-weight: 600; }
  .tl-d-dot { opacity: 0.45; }
  .tl-d-close { appearance: none; border: 0.5px solid var(--hairline); background: transparent;
    width: 30px; height: 30px; border-radius: 8px; color: var(--muted); font-size: 18px; line-height: 1;
    cursor: pointer; transition: all 140ms ease; flex-shrink: 0; }
  .tl-d-close:hover { background: var(--chip); color: var(--ink); }
  .tl-d-desc { margin: 18px 0 16px; font-size: 14.5px; line-height: 1.6; color: var(--ink); opacity: 0.9; max-width: 720px; }
  .tl-d-roles { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
  .tl-d-role { font-size: 11.5px; font-weight: 500; padding: 4px 10px; border-radius: 999px;
    background: var(--chip); color: var(--ink); white-space: nowrap; }
  .tl-d-progression { list-style: none; margin: 4px 0 0; padding: 4px 0 4px 14px; border-left: 2px solid;
    display: flex; flex-direction: column; gap: 12px; }
  .tl-d-progression li { position: relative; padding-left: 6px; }
  .tl-d-prog-marker { position: absolute; left: -22px; top: 5px; width: 10px; height: 10px; border-radius: 50%;
    box-shadow: 0 0 0 3px var(--surface); }
  .tl-d-prog-head { display: block; margin-bottom: 4px; }
  .tl-d-prog-years { display: inline-block; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--muted); margin-right: 8px; padding: 2px 7px;
    border: 0.5px solid var(--hairline); border-radius: 3px; }
  .tl-d-prog-title { font-weight: 600; color: var(--ink); font-size: 13.5px; }
  .tl-d-prog-note { font-size: 13px; line-height: 1.5; color: var(--ink); opacity: 0.78; }
  .tl-d-section { margin-top: 16px; }
  .tl-d-label { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 8px; }
  .tl-d-tech { display: flex; flex-wrap: wrap; gap: 6px; }
  .tl-d-techchip { font-family: var(--font-mono); font-size: 11.5px; padding: 4px 9px;
    border: 0.5px solid var(--hairline); border-radius: 5px; color: var(--ink); background: var(--chip);
    white-space: nowrap; }
`;

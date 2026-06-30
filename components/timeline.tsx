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

// ── Production preset (BART) ────────────────────────────────────────────────
const preset = {
  bg: "#f9fafb", // site neutral (gray-50) — harmonized with the rest of the portfolio

  surface: "#FFFFFF",
  ink: "#1A1A1F",
  muted: "rgba(26,26,31,0.55)",
  hairline: "rgba(26,26,31,0.10)",
  fte: "#1F4FB8",
  side: "#E08524",
  lineWeight: 7,
  stationStroke: 3,
};

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

function formatYears(exp: Experience) {
  if (exp.pointYear && exp.end - exp.start <= 1) return String(exp.pointYear);
  if (exp.start === exp.end) return String(exp.start);
  return `${exp.start} – ${exp.end >= 2026 ? "now" : exp.end}`;
}
function formatRange(exp: Experience) {
  if (exp.pointYear && exp.end - exp.start <= 1) return String(exp.pointYear);
  if (exp.start === exp.end) return String(exp.start);
  const end = exp.end >= 2026 ? "Present" : exp.end;
  return `${exp.start} – ${end}`;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function CountryZones({ scale, yTop, yBottom }: { scale: Scale; yTop: number; yBottom: number }) {
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
              {w > 64 ? p.label.toUpperCase() : p.code}
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

function PresentChip({ x, y }: { x: number; y: number }) {
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
        TODAY
      </text>
      <path d={`M ${cx},${y - 11} L ${cx - 4},${y - 16} L ${cx + 4},${y - 16} Z`} fill={fill} />
    </g>
  );
}

// Side branch fork path. fleeber uses a dotted "scoop" that dips and returns;
// open branches (Atipically) fork off and trail into a dashed tail.
function BranchPath({ exp, scale, dimmed }: { exp: Experience; scale: Scale; dimmed: boolean }) {
  const [x1, x2] = branchExtents(exp, scale);
  const midX = (x1 + x2) / 2;
  const lw = preset.lineWeight;
  const paint = preset.ink; // uniform mode — trunk + branches share neutral ink
  const paintOpacity = 0.78;
  const mergesBack = exp.mergesBack !== false;
  const dy = SIDE_Y - MAIN_Y; // negative — the lane is above the trunk
  const adyl = Math.abs(dy);
  const tailGap = 22;
  const tailLen = 36;

  if (exp.dip) {
    const half = Math.max(78, adyl * 1.05);
    const fx1 = midX - half;
    const fx2 = midX + half;
    const cW = half * 0.62;
    const dDip =
      `M ${fx1},${MAIN_Y} ` +
      `C ${fx1 + cW},${MAIN_Y} ${midX - cW},${SIDE_Y} ${midX},${SIDE_Y} ` +
      `C ${midX + cW},${SIDE_Y} ${fx2 - cW},${MAIN_Y} ${fx2},${MAIN_Y}`;
    return (
      <g style={{ opacity: dimmed ? 0.35 : 1, transition: "opacity 160ms" }}>
        <path
          d={dDip}
          fill="none"
          stroke={paint}
          strokeOpacity={paintOpacity}
          strokeWidth={lw}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`0.01 ${lw * 2.3}`}
        />
      </g>
    );
  }

  // Slant fork with filleted corners.
  const peel = 10; // overlap onto the trunk hides the seam (uniform mode)
  const host = EXPERIENCES.find((e) => e.id === exp.interchangeWith);
  const hostX1 = host ? scale.yearToX(host.start) : -Infinity;
  const hostX2 = host ? scale.yearToX(host.end) : Infinity;
  let d: string;

  if (mergesBack) {
    const EXT = 22;
    const fx1 = Math.max(x1 - EXT, hostX1 + 30);
    const fx2 = Math.min(x2 + EXT, hostX2 - 30);
    const ww = fx2 - fx1;
    const dxs = Math.min(38, ww * 0.4);
    const rr = Math.max(6, Math.min(16, (ww - 2 * dxs) * 0.4, dxs * 0.55));
    const len = Math.hypot(dxs, dy);
    const ux = dxs / len;
    const uy = dy / len;
    d =
      `M ${fx1 - peel},${MAIN_Y} ` +
      `Q ${fx1},${MAIN_Y} ${fx1 + rr * ux},${MAIN_Y + rr * uy} ` +
      `L ${fx1 + dxs - rr * ux},${SIDE_Y - rr * uy} ` +
      `Q ${fx1 + dxs},${SIDE_Y} ${Math.min(fx1 + dxs + rr, midX)},${SIDE_Y} ` +
      `H ${Math.max(fx2 - dxs - rr, midX)} ` +
      `Q ${fx2 - dxs},${SIDE_Y} ${fx2 - dxs + rr * ux},${SIDE_Y - rr * uy} ` +
      `L ${fx2 - rr * ux},${MAIN_Y + rr * uy} ` +
      `Q ${fx2},${MAIN_Y} ${fx2 + peel},${MAIN_Y}`;
  } else {
    const fx1 = Math.max(x1, hostX1 + 30);
    const dxs = Math.min(adyl * 0.55, Math.max(24, midX - fx1));
    const rr = Math.max(6, Math.min(14, dxs * 0.5));
    const len = Math.hypot(dxs, dy);
    const ux = dxs / len;
    const uy = dy / len;
    d =
      `M ${fx1 - peel},${MAIN_Y} ` +
      `Q ${fx1},${MAIN_Y} ${fx1 + rr * ux},${MAIN_Y + rr * uy} ` +
      `L ${fx1 + dxs - rr * ux},${SIDE_Y - rr * uy} ` +
      `Q ${fx1 + dxs},${SIDE_Y} ${Math.min(fx1 + dxs + rr, midX)},${SIDE_Y} ` +
      `H ${Math.max(midX, fx1 + dxs + rr)}`;
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
      />
      {!mergesBack && (
        <>
          <line
            x1={midX + tailGap}
            y1={SIDE_Y}
            x2={midX + tailGap + tailLen}
            y2={SIDE_Y}
            stroke={paint}
            strokeOpacity={paintOpacity * 0.7}
            strokeWidth={lw}
            strokeLinecap="round"
            strokeDasharray={`${lw * 1.2} ${lw * 1.4}`}
          />
          <circle cx={midX + tailGap + tailLen + 4} cy={SIDE_Y} r={lw * 0.45} fill={paint} opacity={paintOpacity * 0.55} />
        </>
      )}
    </g>
  );
}

// Client engagements annotated on the trunk as a dashed rounded container with
// per-period labels (staggered onto two rows) and small "stop" marks.
function ClientLane({ exp, scale }: { exp: Experience; scale: Scale }) {
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
              {p.start}–{p.end >= 2026 ? "now" : p.end}
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
        {formatYears(exp)}
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
}: {
  W: number;
  scale: Scale;
  hovered: string | null;
  selected: string | null;
  onHover: (exp: Experience | null, e?: React.MouseEvent) => void;
  onSelect: (id: string) => void;
}) {
  const ftes = EXPERIENCES.filter((e) => e.track === "fte");
  const sides = EXPERIENCES.filter((e) => e.track === "side");
  const trunkPaint = preset.ink;
  const trunkOpacity = 0.78;
  const lw = preset.lineWeight;

  const trunkStartX = scale.yearToX(ftes[0].start);
  const trunkEndX = scale.yearToX(ftes[ftes.length - 1].end);
  const arrowTipX = Math.min(scale.yearToX(YEAR_MAX), W - PAD_X * 0.55);

  return (
    <svg className="map" width={W} height={SVG_H} viewBox={`0 0 ${W} ${SVG_H}`} onMouseLeave={() => onHover(null)}>
      <CountryZones scale={scale} yTop={20} yBottom={YEAR_Y - 14} />
      <YearGrid scale={scale} yTop={44} yBottom={YEAR_Y} />
      <YearTickAxis scale={scale} W={W} y={YEAR_Y} />

      {/* Side branches — behind the trunk so discs sit on top */}
      {sides.map((exp) => (
        <BranchPath key={exp.id} exp={exp} scale={scale} dimmed={!!hovered && hovered !== exp.id} />
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
        <ClientLane key={exp.id} exp={exp} scale={scale} />
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
        />
      ))}

      {/* Side stations */}
      {sides.map((exp) => (
        <LogoNode
          key={exp.id}
          exp={exp}
          x={branchMidX(exp, scale)}
          y={SIDE_Y}
          color={preset.side}
          compact
          isHovered={hovered === exp.id}
          isSelected={selected === exp.id}
          dimmed={!!hovered && hovered !== exp.id}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}

      <PresentChip x={arrowTipX} y={MAIN_Y} />
    </svg>
  );
}

// ── Tooltip & detail panel ───────────────────────────────────────────────────
function Tooltip({ x, y, exp }: { x: number; y: number; exp: Experience }) {
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
        <span className="tl-tt-track">{exp.track === "fte" ? "Full-time" : "Side venture"}</span>
      </div>
      <div className="tl-tt-title">{exp.title}</div>
      <div className="tl-tt-co">{exp.company}</div>
      <div className="tl-tt-meta">
        <span>{formatRange(exp)}</span>
        <span className="tl-tt-dot">·</span>
        <span>{exp.location}</span>
      </div>
      <div className="tl-tt-short">{exp.short}</div>
    </div>
  );
}

function DetailPanel({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  const c = exp.track === "fte" ? preset.fte : preset.side;
  const ref = useRef<HTMLDivElement>(null);
  // Bring the panel into view on open — it renders below the (tall) map, so a
  // click near the top of the trunk would otherwise scroll out of sight.
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [exp.id]);
  return (
    <div ref={ref} className="tl-detail" style={{ borderColor: c }}>
      <div className="tl-detail-bar" style={{ background: c }} />
      <div className="tl-detail-inner">
        <div className="tl-d-head">
          <div>
            <div className="tl-d-track">
              <span className="tl-d-chip" style={{ background: c }}>
                {exp.code}
              </span>
              <span className="tl-d-track-label">{exp.track === "fte" ? "Full-time" : "Side venture"}</span>
            </div>
            <h3 className="tl-d-title">{exp.title}</h3>
            <div className="tl-d-co">
              <strong>{exp.company}</strong>
              <span className="tl-d-dot">·</span>
              <span>{formatRange(exp)}</span>
              <span className="tl-d-dot">·</span>
              <span>{exp.location}</span>
            </div>
          </div>
          <button className="tl-d-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <p className="tl-d-desc">{exp.description}</p>

        {exp.progression ? (
          <div className="tl-d-section">
            <div className="tl-d-label">Progression</div>
            <ol className="tl-d-progression" style={{ borderLeftColor: c }}>
              {exp.progression.map((p, i) => (
                <li key={i}>
                  <span className="tl-d-prog-marker" style={{ background: c }} />
                  <div>
                    <div className="tl-d-prog-head">
                      <span className="tl-d-prog-years">{p.years}</span>
                      <span className="tl-d-prog-title">{p.title}</span>
                    </div>
                    <div className="tl-d-prog-note">{p.note}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          exp.roles && (
            <div className="tl-d-roles">
              {exp.roles.map((rr) => (
                <span className="tl-d-role" key={rr}>
                  {rr}
                </span>
              ))}
            </div>
          )
        )}

        <div className="tl-d-section">
          <div className="tl-d-label">Skills &amp; technologies</div>
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
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Timeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapW, setWrapW] = useState(MAP_MIN_WIDTH);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setWrapW(Math.max(MAP_MIN_WIDTH, entry.contentRect.width));
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const scale = useMemo(() => buildScale(wrapW), [wrapW]);
  const hoveredExp = hovered ? EXPERIENCES.find((e) => e.id === hovered) ?? null : null;
  const selectedExp = selected ? EXPERIENCES.find((e) => e.id === selected) ?? null : null;

  return (
    <div
      style={
        {
          background: preset.bg,
          color: preset.ink,
          padding: "64px 24px 80px",
          "--ink": preset.ink,
          "--muted": preset.muted,
          "--bg": preset.bg,
          "--surface": preset.surface,
          "--hairline": preset.hairline,
          "--fte": preset.fte,
          "--side": preset.side,
        } as React.CSSProperties
      }
    >
      <style>{TIMELINE_CSS}</style>

      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
            lineHeight: 1.1,
          }}
        >
          Experience
        </h2>
        <p style={{ fontSize: 18, color: preset.muted, maxWidth: 640, lineHeight: 1.6, margin: "0 0 32px" }}>
          A non-linear journey, drawn linearly — a main trunk of full-time roles, with side ventures forking off in
          parallel.
        </p>

        {/* Horizontal-scroll container for narrow screens */}
        <div style={{ overflowX: "auto", overflowY: "hidden" }}>
          <div ref={wrapRef} className="tl-map-wrap" style={{ minWidth: MAP_MIN_WIDTH, position: "relative" }}>
            <TimelineMap
              W={wrapW}
              scale={scale}
              hovered={hovered}
              selected={selected}
              onHover={(exp, e) => {
                setHovered(exp?.id ?? null);
                if (exp && e && wrapRef.current) {
                  const rect = wrapRef.current.getBoundingClientRect();
                  setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                }
              }}
              onSelect={(id) => setSelected((cur) => (cur === id ? null : id))}
            />
            {hoveredExp && !selected && <Tooltip x={tooltipPos.x} y={tooltipPos.y} exp={hoveredExp} />}
          </div>
        </div>

        {selectedExp && <DetailPanel exp={selectedExp} onClose={() => setSelected(null)} />}
      </div>
    </div>
  );
}

// Scoped CSS ported from the design reference (tooltip + detail panel).
const TIMELINE_CSS = `
  .tl-map-wrap .map { display: block; width: 100%; height: auto; overflow: visible; }
  .tl-map-wrap .station text { pointer-events: none; user-select: none; }

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

  .tl-detail { position: relative; margin-top: 12px; background: var(--surface);
    border: 0.5px solid var(--hairline); border-radius: 14px; overflow: hidden;
    box-shadow: 0 1px 0 rgba(0,0,0,0.02), 0 12px 32px rgba(0,0,0,0.06);
    animation: tlDetailIn 240ms cubic-bezier(0.2, 0.7, 0.2, 1); }
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
  .tl-d-close:hover { background: rgba(0,0,0,0.04); color: var(--ink); }
  .tl-d-desc { margin: 18px 0 16px; font-size: 14.5px; line-height: 1.6; color: var(--ink); opacity: 0.9; max-width: 720px; }
  .tl-d-roles { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
  .tl-d-role { font-size: 11.5px; font-weight: 500; padding: 4px 10px; border-radius: 999px;
    background: rgba(0,0,0,0.05); color: var(--ink); white-space: nowrap; }
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
    border: 0.5px solid var(--hairline); border-radius: 5px; color: var(--ink); background: rgba(255,255,255,0.5);
    white-space: nowrap; }
`;

// Generates the downloadable resume PDFs from scripts/resume-content.mjs.
//
//   node scripts/generate-resume.mjs
//
// Outputs public/luis_alves_en.pdf (EN) and public/luis_alves_pt.pdf (PT). Re-run after
// editing the content module so the site's "Download Resume" button stays fresh.

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createWriteStream } from "node:fs";
import PDFDocument from "pdfkit";
import { contact, content } from "./resume-content.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// ── Palette (matches the site's cool-graphite brand) ─────────────────────
const INK = "#14161A";
const MUTED = "#4B5563";
const FAINT = "#9CA3AF";
const ACCENT = "#3730A3"; // indigo, reserved for stations/links on the site
const RULE = "#E5E7EB";

const PAGE_MARGIN = 54;

// The built-in Helvetica (WinAnsi) lacks a few Unicode glyphs the site uses.
// Map them to close ASCII equivalents so nothing renders as tofu. The arrow is
// only ever a location separator, and "/" parses as one where "->" confuses
// resume parsers splitting the location field.
const GLYPH_FIXES = [[/→/g, "/"]];
const fix = (s) => (typeof s === "string" ? GLYPH_FIXES.reduce((a, [re, to]) => a.replace(re, to), s) : s);

function build(lang) {
  const c = content[lang];
  const L = c.labels;
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: PAGE_MARGIN, bottom: PAGE_MARGIN, left: PAGE_MARGIN, right: PAGE_MARGIN },
    bufferPages: true,
    info: {
      Title: `${contact.name} — Resume`,
      Author: contact.name,
      Subject: c.role,
    },
  });

  // Sanitize every string that flows through .text().
  const rawText = doc.text.bind(doc);
  doc.text = (txt, ...rest) => rawText(fix(txt), ...rest);

  const outFile = join(publicDir, lang === "en" ? "luis_alves_en.pdf" : "luis_alves_pt.pdf");
  doc.pipe(createWriteStream(outFile));

  const left = doc.page.margins.left;
  const right = doc.page.width - doc.page.margins.right;
  const width = right - left;
  const bottom = doc.page.height - doc.page.margins.bottom;

  // Guard: start a new page if the next block won't fit.
  const ensure = (needed) => {
    if (doc.y + needed > bottom) doc.addPage();
  };

  // ── Header ─────────────────────────────────────────────────────────────
  doc.font("Helvetica-Bold").fontSize(22).fillColor(INK).text(contact.name, left, doc.y);
  doc.moveDown(0.15);
  doc.font("Helvetica").fontSize(11.5).fillColor(ACCENT).text(c.role);
  doc.moveDown(0.35);
  const contactLine = [
    contact.email,
    contact.phone,
    c.location,
    contact.linkedin,
    contact.github,
    contact.site,
  ].join("  ·  ");
  // Shrink until the whole line fits on a single row, so contact info never wraps.
  let contactSize = 8.8;
  doc.font("Helvetica");
  while (contactSize > 6 && doc.fontSize(contactSize).widthOfString(contactLine) > width) {
    contactSize -= 0.1;
  }
  doc.fontSize(contactSize).fillColor(MUTED).text(contactLine, { width, lineBreak: false });
  doc.moveDown(0.5);
  doc.moveTo(left, doc.y).lineTo(right, doc.y).lineWidth(1).strokeColor(INK).stroke();
  doc.moveDown(0.7);

  // ── Section heading helper ─────────────────────────────────────────────
  const section = (label) => {
    ensure(40);
    doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text(label.toUpperCase(), left, doc.y, {
      characterSpacing: 1,
    });
    doc.moveDown(0.2);
    doc.moveTo(left, doc.y).lineTo(right, doc.y).lineWidth(0.6).strokeColor(RULE).stroke();
    doc.moveDown(0.45);
  };

  const bulletList = (items) => {
    doc.font("Helvetica").fontSize(8.9).fillColor(MUTED);
    for (const it of items) {
      const h = doc.heightOfString(it, { width: width - 14 });
      ensure(h + 4);
      const y = doc.y;
      doc.fillColor(ACCENT).text("•", left, y, { continued: false });
      doc.fillColor(MUTED).text(it, left + 12, y, { width: width - 12 });
      doc.moveDown(0.15);
    }
  };

  // ── Summary ────────────────────────────────────────────────────────────
  section(L.summary);
  doc.font("Helvetica").fontSize(9.0).fillColor(MUTED).text(c.summary, { width, align: "justify" });
  doc.moveDown(0.7);

  // ── Skills ─────────────────────────────────────────────────────────────
  section(L.skills);
  for (const s of c.skills) {
    ensure(18);
    const y = doc.y;
    doc.font("Helvetica-Bold").fontSize(9.3).fillColor(INK).text(`${s.group}:  `, left, y, { continued: true });
    doc.font("Helvetica").fillColor(MUTED).text(s.items, { width });
    doc.moveDown(0.25);
  }
  doc.moveDown(0.5);

  // ── Experience ─────────────────────────────────────────────────────────
  section(L.experience);
  c.experience.forEach((job, i) => {
    ensure(52);
    if (i > 0) doc.moveDown(0.35);
    const y = doc.y;
    doc.font("Helvetica-Bold").fontSize(11).fillColor(INK).text(job.company, left, y, {
      width: width * 0.7,
      continued: false,
    });
    doc.font("Helvetica").fontSize(9.3).fillColor(MUTED).text(job.period, left, y, {
      width,
      align: "right",
    });
    doc.font("Helvetica-Oblique").fontSize(9.6).fillColor(ACCENT).text(job.title, left, doc.y);
    doc.font("Helvetica").fontSize(8.8).fillColor(FAINT).text(job.place);
    doc.moveDown(0.3);
    bulletList(job.bullets);
    ensure(16);
    doc.moveDown(0.05);
    const ty = doc.y;
    doc.font("Helvetica-Bold").fontSize(8.4).fillColor(INK).text(`${L.tech}:  `, left, ty, { continued: true });
    doc.font("Helvetica").fillColor(FAINT).text(job.tech, { width });
    doc.moveDown(0.3);
  });
  doc.moveDown(0.4);

  // ── Ventures ───────────────────────────────────────────────────────────
  section(L.ventures);
  c.ventures.forEach((v, i) => {
    ensure(40);
    if (i > 0) doc.moveDown(0.3);
    const y = doc.y;
    doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text(v.name, left, y, {
      width: width * 0.7,
      continued: false,
    });
    doc.font("Helvetica").fontSize(9.3).fillColor(MUTED).text(v.period, left, y, {
      width,
      align: "right",
    });
    doc.font("Helvetica-Oblique").fontSize(9.3).fillColor(ACCENT).text(v.title, left, doc.y);
    doc.moveDown(0.15);
    doc.font("Helvetica").fontSize(8.9).fillColor(MUTED).text(v.desc, { width, align: "justify" });
    doc.moveDown(0.2);
  });
  doc.moveDown(0.4);

  // ── Education ──────────────────────────────────────────────────────────
  section(L.education);
  c.education.forEach((e) => {
    ensure(24);
    const y = doc.y;
    doc.font("Helvetica-Bold").fontSize(9.6).fillColor(INK).text(e.degree, left, y, {
      width: width * 0.7,
      continued: false,
    });
    doc.font("Helvetica").fontSize(9.3).fillColor(MUTED).text(e.period, left, y, { width, align: "right" });
    doc.font("Helvetica").fontSize(9.3).fillColor(MUTED).text(e.school, left, doc.y);
    doc.moveDown(0.3);
  });
  doc.moveDown(0.35);

  // ── Languages ──────────────────────────────────────────────────────────
  section(L.languages);
  doc.font("Helvetica").fontSize(9.6).fillColor(MUTED).text(c.languages, { width });
  doc.moveDown(0.7);

  // ── Certifications ─────────────────────────────────────────────────────
  section(L.certifications);
  bulletList(c.certifications);

  // ── Footer page numbers ────────────────────────────────────────────────
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    // Writing inside the bottom-margin band would auto-add a page; disable it.
    doc.page.margins.bottom = 0;
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor(FAINT)
      .text(
        `${contact.name}   ·   ${i + 1} / ${range.count}`,
        left,
        doc.page.height - 34,
        { width, align: "center", lineBreak: false }
      );
  }

  doc.end();
  return outFile;
}

for (const lang of ["en", "pt"]) {
  const f = build(lang);
  console.log(`✓ generated ${f}`);
}

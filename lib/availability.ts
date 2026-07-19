// Single source of truth for the "available for work" status shown in the hero
// and repeated in the contact section. Edit only this file to change the status
// — both placements read from here.

export type AvailabilityStatus = "available" | "limited" | "unavailable";

export const availability = {
  // Master switch. Off while I'm employed full-time with no spare capacity — a
  // badge announcing "unavailable" costs hero space to deliver a "no", and a
  // stale one reads as an abandoned site. Flip on when there's a real yes to
  // signal; everything below is already wired for it.
  enabled: false,
  status: "unavailable" as AvailabilityStatus,
  // Free-form, localized. Keep it concrete (a month beats "soon") — a specific
  // date is what makes the badge worth reading. Set to null to omit.
  from: { en: "Aug 2026", pt: "ago/2026" },
  href: "#contact",
};

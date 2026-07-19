// Photo when available, initials monogram otherwise. We don't host LinkedIn
// profile pictures by default (third-party personal images) — once a person
// gives permission, drop their photo in /public and set `photo` on the
// recommendation. The <img> lazy-loads with fixed dimensions so it never
// causes layout shift.

// Deterministic hue from the name so each person keeps a stable color.
function hueFromName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function RecommendationAvatar({
  name,
  photo,
  size = 40,
}: {
  name: string;
  photo?: string;
  size?: number;
}) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  const hue = hueFromName(name);
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        // Kept dark enough (L 28%) against the light tint (L 92%) to clear
        // WCAG AA 4.5:1 across all hues — luminous hues like yellow/green are
        // the constraint, so the text lightness is capped low.
        backgroundColor: `hsl(${hue} 45% 92%)`,
        color: `hsl(${hue} 45% 28%)`,
      }}
    >
      {initials(name)}
    </span>
  );
}

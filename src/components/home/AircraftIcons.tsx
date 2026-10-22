/** Side-view line icons for aircraft categories, nose pointing right. viewBox 0 0 64 32. */
const icons: Record<string, React.ReactNode> = {
  piston: (
    <>
      <path d="M8 17 14 14l26-2c8 0 14 2 18 5v2c-6 2-38 2-50 0Z" />
      <path d="M24 11h28M36 12l4 6M8 17 6 8h4l6 7M60 10v16M44 20v5M26 20l-1 5" />
    </>
  ),
  turboprop: (
    <>
      <path d="M6 18c0-3 4-4 9-4h30c7 0 13 2 16 4-3 2-8 3-14 3H12c-4 0-6-1-6-3Z" />
      <path d="M11 14 7 5h4l8 9M30 19l-6 6h4l10-6M34 18h10M45 13v10M20 16h1M24 16h1M28 16h1" />
    </>
  ),
  jet: (
    <>
      <path d="M6 18c0-3 3-4 8-4h34c6 0 12 2 14 4-2 2-6 3-12 3H12c-4 0-6-1-6-3Z" />
      <path d="M10 14 6 5h4l8 9M14 12h10M28 19l-6 6h4l10-6M30 16h1M34 16h1M38 16h1M42 16h1" />
    </>
  ),
  helicopter: (
    <>
      <path d="M28 14c8-2 16 0 18 6 0 4-4 5-10 5h-6c-4 0-6-3-6-6Z" />
      <path d="M24 18 7 16M14 9h44M36 9v4M28 28h20M32 25v3M44 25v3" />
      <circle cx="6" cy="16" r="3" />
    </>
  ),
  float: (
    <>
      <path d="M8 16 14 13l26-2c8 0 14 2 18 5v2c-6 2-38 2-50 0Z" />
      <path d="M24 10h28M60 9v16M8 16 6 7h4l6 7M28 19l-2 6M46 19l2 6M16 26h38c2 0 3-1 4-2" />
    </>
  ),
  agricultural: (
    <>
      <path d="M10 16 16 12h24l6-2h8c4 0 6 3 6 6s-2 5-6 5H16c-4 0-6-2-6-5Z" />
      <path d="M10 16 7 7h4l7 7M24 21l-4 4h22l2-4M62 9v14M26 12v-3h8v3M44 23v4M12 21l-2 4" />
      <path d="M20 28h2M26 28h2M32 28h2M38 28h2" strokeDasharray="1 2" />
    </>
  ),
  charter: (
    <>
      <path d="M3 18c0-3 3-4 7-4h40c6 0 11 2 13 4-2 2-6 3-11 3H8c-3 0-5-1-5-3Z" />
      <path d="M7 14 3 4h4l8 10M28 20l-7 6h4l12-6M24 23h8M14 16h1M18 16h1M22 16h1M26 16h1M30 16h1M34 16h1M38 16h1M42 16h1M46 16h1" />
    </>
  ),
};

export type AircraftKind = keyof typeof icons;

export function AircraftIcon({ kind, className = "" }: { kind: AircraftKind; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[kind]}
    </svg>
  );
}

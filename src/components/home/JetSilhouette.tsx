/** Plan-view business jet, nose pointing +x, centred on the origin (≈ 64 × 56 units). */
export function JetSilhouette({ className, fill = "currentColor" }: { className?: string; fill?: string }) {
  return (
    <g className={className} fill={fill}>
      {/* fuselage */}
      <path d="M32 0c0-2.2-3-3.4-7-3.6L-26-3.4c-2.6 0-4 1.4-4 3.4s1.4 3.4 4 3.4L25 3.6C29 3.4 32 2.2 32 0Z" />
      {/* wings */}
      <path d="M8-3 -8-27h-5l6 24ZM8 3-8 27h-5l6-24Z" />
      {/* rear-mounted engines */}
      <rect x="-20" y="-7.5" width="12" height="4" rx="2" />
      <rect x="-20" y="3.5" width="12" height="4" rx="2" />
      {/* T-tail */}
      <path d="M-22-2.5-30-13h-3.5l4 10.5ZM-22 2.5-30 13h-3.5l4-10.5Z" />
    </g>
  );
}

import { site } from "@/config/site";

/** Small "Sample" tag shown next to placeholder content while `site.showPlaceholderBadges` is true. */
export function PlaceholderBadge({ className = "" }: { className?: string }) {
  if (!site.showPlaceholderBadges) return null;
  return (
    <span
      className={`label-mono inline-flex items-center rounded-sm bg-amber px-1.5 py-0.5 text-[0.625rem] tracking-[0.12em] text-navy ${className}`}
      title="Placeholder content. Replace in src/config/site.ts"
    >
      Sample
    </span>
  );
}

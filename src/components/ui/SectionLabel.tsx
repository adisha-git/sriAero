type SectionLabelProps = {
  index?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Aviation-callout style eyebrow, e.g. `(01) EXTERIOR` or `HDG 270 · PROCESS`. */
export function SectionLabel({ index, children, tone = "light", className = "" }: SectionLabelProps) {
  return (
    <p
      className={`label-mono flex items-center gap-3 ${tone === "dark" ? "text-sky" : "text-horizon"} ${className}`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-amber" />
      {index && <span aria-hidden="true">({index})</span>}
      <span>{children}</span>
    </p>
  );
}

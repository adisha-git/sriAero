type LogoProps = {
  variant?: "colour" | "white";
  className?: string;
  /** Rendered height in px; width follows the SVG's aspect ratio. */
  height?: number;
};

// Aspect ratio of /public/brand/logo*.svg (viewBox width ÷ 64).
const RATIO = 234 / 64;

export function Logo({ variant = "colour", className = "", height = 40 }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed
    <img
      src={variant === "white" ? "/brand/logo-white.svg" : "/brand/logo.svg"}
      alt="SriAero"
      width={Math.round(height * RATIO)}
      height={height}
      className={className}
    />
  );
}

/** Icon-only mark as inline SVG (used where it needs to animate). */
export function LogoMark({ className = "", tone = "white" }: { className?: string; tone?: "white" | "colour" }) {
  const upper = tone === "white" ? ["#F5F7FA", "#8EC5E8"] : ["#8EC5E8", "#1E4D7B"];
  const lower = tone === "white" ? "#8EC5E8" : "#1E4D7B";
  const id = `mark-${tone}`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="5" y1="7" x2="60" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={upper[0]} />
          <stop offset="1" stopColor={upper[1]} />
        </linearGradient>
      </defs>
      <path d="M60 29.5 L5 7 L23 29.5 Z" fill={`url(#${id})`} />
      <path d="M60 34.5 L5 57 L23 34.5 Z" fill={lower} />
      <path d="M41 9 L42.6 14.4 L48 16 L42.6 17.6 L41 23 L39.4 17.6 L34 16 L39.4 14.4 Z" fill="#E8A33D" />
    </svg>
  );
}

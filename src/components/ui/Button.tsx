import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "amber" | "primary" | "ghost-dark" | "ghost-light";

const styles: Record<Variant, string> = {
  amber: "bg-amber text-navy hover:bg-amber-300 shadow-[0_8px_24px_-12px_rgb(232_163_61/0.8)]",
  primary: "bg-horizon text-cloud hover:bg-horizon-600",
  "ghost-dark": "border border-cloud/30 text-cloud hover:border-sky hover:text-sky",
  "ghost-light": "border border-navy/20 text-navy hover:border-horizon hover:text-horizon",
};

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", arrow = false, className = "" }: ButtonProps) {
  const external = href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");
  const classes = `shine inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[0.95rem] font-semibold tracking-tight transition-colors duration-200 ${styles[variant]} ${className}`;
  const content = (
    <>
      <span className="relative z-[2]">{children}</span>
      {arrow && <ArrowRight aria-hidden="true" className="relative z-[2] size-4" />}
    </>
  );
  return external ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

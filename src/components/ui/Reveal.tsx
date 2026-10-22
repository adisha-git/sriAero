"use client";

import { m } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/** Fade-and-rise as the element enters the viewport. Transform and opacity only. */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

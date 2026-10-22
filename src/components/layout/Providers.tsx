"use client";

import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";

/** Loads Framer Motion's lightweight feature set and honours prefers-reduced-motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

"use client";

import { m, useScroll, useSpring, useTransform } from "framer-motion";

/** Thin progress line at the top of the page with a small aircraft riding its leading edge. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const planeX = useTransform(progress, (v) => `calc(${v * 100}vw - ${v * 18}px)`);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div className="absolute inset-0 bg-aluminium/10" />
      <m.div className="absolute inset-0 origin-left bg-gradient-to-r from-horizon via-sky to-amber" style={{ scaleX: progress }} />
      <m.svg
        viewBox="0 0 24 24"
        className="absolute top-[-7px] left-0 size-[18px] text-sky drop-shadow-[0_0_6px_rgb(142_197_232/0.7)]"
        style={{ x: planeX }}
      >
        {/* plan-view aircraft, nose pointing right */}
        <path
          fill="currentColor"
          d="M22 12c0-.8-.7-1.3-1.5-1.3h-5.3L10.6 3H8.4l2.3 7.7H6.1L4.3 8H2.8l1.1 4-1.1 4h1.5l1.8-2.7h4.6L8.4 21h2.2l4.6-7.7h5.3c.8 0 1.5-.5 1.5-1.3Z"
        />
      </m.svg>
    </div>
  );
}

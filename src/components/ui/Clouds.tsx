"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Slow parallax cloud layers for dark sections. Decorative; transform-only. */
export function Clouds({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const back = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const front = useTransform(scrollYProgress, [0, 1], ["8%", "-14%"]);
  const reduce = useReducedMotion();

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <m.div style={reduce ? undefined : { y: back }} className="absolute inset-x-[-10%] bottom-[-10%] h-[60%]">
        <CloudBank className="h-full w-full fill-sky/[0.035] [animation:drift_40s_ease-in-out_infinite_alternate]" />
      </m.div>
      <m.div style={reduce ? undefined : { y: front }} className="absolute inset-x-[-10%] bottom-[-18%] h-[55%]">
        <CloudBank flip className="h-full w-full fill-cloud/[0.025] [animation:drift_28s_ease-in-out_infinite_alternate-reverse]" />
      </m.div>
    </div>
  );
}

function CloudBank({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M0 220c60-40 140-60 210-40 30-60 120-90 190-60 50-70 170-80 230-20 60-50 170-40 210 20 70-40 170-20 200 40 60-30 150-20 190 30 70-30 160 0 210 40V320H0Z" />
      <path d="M0 270c90-30 170-20 240 10 80-50 190-40 250 10 90-40 200-30 260 20 80-40 190-30 250 10 90-30 200-20 270 10 60-20 120-20 170-10V320H0Z" opacity="0.7" />
    </svg>
  );
}

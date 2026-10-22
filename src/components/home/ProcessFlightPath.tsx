"use client";

import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    wpt: "WPT 1 · ASSESS",
    title: "Assessment",
    text: "A walkaround with you or your crew. We record condition with photos, take paint readings where needed, agree the scope and confirm hangar access and timing.",
  },
  {
    wpt: "WPT 2 · DECON",
    title: "Decontamination",
    text: "Wash, degrease and decontaminate: exhaust film, bugs, de-icing residue and embedded fallout, using methods chosen for each surface.",
  },
  {
    wpt: "WPT 3 · CORRECT",
    title: "Correction & Protection",
    text: "Paint and brightwork correction, interior work, then sealant or ceramic protection. Each task follows a written procedure, the same way every time.",
  },
  {
    wpt: "WPT 4 · INSPECT",
    title: "Final Inspection & Walkaround",
    text: "A full inspection under hangar lights, ports and covers checked, masking removed, then a walkaround with you before sign-off.",
  },
];

// Waypoints in the desktop SVG's 1000×120 coordinate space (the path passes through each).
const WPTS = [
  { x: 125, y: 64 },
  { x: 375, y: 40 },
  { x: 625, y: 64 },
  { x: 875, y: 32 },
];
const PATH = "M0 96 C 60 96, 90 64, 125 64 S 250 36, 375 40 S 500 72, 625 64 S 800 24, 875 32 S 960 48, 1000 40";

export function ProcessFlightPath() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [litCount, setLit] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    if (reduce) return;
    setLit(WPTS.filter((w) => v >= w.x / 1000 - 0.04).length);
  });

  const drawn = reduce ? 1 : progress;
  const lit = reduce ? steps.length : litCount;

  return (
    <section aria-labelledby="process-title" className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <SectionLabel index="05">HDG 270 · Process</SectionLabel>
          <h2 id="process-title" className="mt-4 text-4xl font-medium text-navy sm:text-5xl">
            A flight plan for every detail.
          </h2>
          <p className="mt-5 text-lg text-slate">
            Four waypoints, flown in order, every time. It&apos;s how we keep results consistent from one aircraft to the
            next.
          </p>
        </div>

        <div ref={ref} className="relative mt-16">
          {/* Desktop: curved flight path */}
          <div className="relative hidden h-[120px] lg:block" aria-hidden="true">
            <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <path d={PATH} fill="none" stroke="#C9D1D9" strokeWidth="2" strokeDasharray="2 8" vectorEffect="non-scaling-stroke" />
              <m.path
                d={PATH}
                fill="none"
                stroke="url(#fp-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: drawn }}
              />
              <defs>
                <linearGradient id="fp-grad" x1="0" x2="1">
                  <stop offset="0" stopColor="#1E4D7B" />
                  <stop offset="0.7" stopColor="#8EC5E8" />
                  <stop offset="1" stopColor="#E8A33D" />
                </linearGradient>
              </defs>
            </svg>
            {WPTS.map((w, i) => (
              <Waypoint key={i} on={i < lit} style={{ left: `${w.x / 10}%`, top: `${(w.y / 120) * 100}%` }} />
            ))}
          </div>

          <div className="relative lg:mt-10">
          {/* Mobile: vertical track */}
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-aluminium lg:hidden">
            <m.div className="h-full w-full origin-top bg-gradient-to-b from-horizon via-sky to-amber" style={{ scaleY: drawn }} />
          </div>
          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="relative pl-12 lg:pl-0">
                <div className="absolute top-1 left-0 lg:hidden" aria-hidden="true">
                  <Waypoint on={i < lit} static />
                </div>
                <p className={`label-mono transition-colors duration-500 ${i < lit ? "text-horizon" : "text-slate"}`}>{s.wpt}</p>
                <h3 className="mt-3 text-2xl font-medium text-navy">{s.title}</h3>
                <p className="mt-3 text-slate">{s.text}</p>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Waypoint({ on, style, static: isStatic }: { on: boolean; style?: React.CSSProperties; static?: boolean }) {
  return (
    <span
      className={`${isStatic ? "relative" : "absolute -translate-x-1/2 -translate-y-1/2"} flex size-6 items-center justify-center`}
      style={style}
    >
      <span
        className={`absolute inset-0 rounded-full transition-all duration-500 ${on ? "scale-100 bg-amber/25" : "scale-50 bg-transparent"}`}
      />
      {/* four-point waypoint star */}
      <svg viewBox="0 0 24 24" className={`relative size-5 transition-colors duration-500 ${on ? "text-amber" : "text-aluminium"}`}>
        <path fill="currentColor" d="M12 1.5 14.2 9.8 22.5 12 14.2 14.2 12 22.5 9.8 14.2 1.5 12 9.8 9.8Z" />
      </svg>
    </span>
  );
}

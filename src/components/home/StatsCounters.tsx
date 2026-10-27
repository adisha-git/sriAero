"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { stats } from "@/config/site";

/** One drum of an altimeter-style counter: a 0–9 strip that rolls to `digit`. */
function Drum({ digit, active, delay }: { digit: number; active: boolean; delay: number }) {
  return (
    <span className="relative inline-block h-[1.15em] w-[0.68em] overflow-hidden rounded-[3px] bg-navy-800 shadow-[inset_0_6px_8px_-4px_rgb(0_0_0/0.8),inset_0_-6px_8px_-4px_rgb(0_0_0/0.8)]">
      <span
        className="absolute inset-x-0 top-0 flex flex-col items-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `translateY(-${(active ? digit : 0) * 10}%)`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span key={n} className="flex h-[1.15em] items-center">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export function StatsCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="stats-title" className="blueprint relative overflow-hidden py-20 text-cloud sm:py-24">
      <div className="container-x">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel tone="dark">FL350 · By the numbers</SectionLabel>
            <h2 id="stats-title" className="mt-4 text-3xl font-medium sm:text-4xl">
              Altitude we&apos;ve gained so far
            </h2>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-aluminium/15 bg-aluminium/15 lg:grid-cols-4">
          {stats.map((s, si) => {
            const digits = String(s.value).split("").map(Number);
            return (
              <div key={s.label} className="bg-navy/90 p-6 sm:p-8">
                <p className="label-mono text-sky/80">{s.readout}</p>
                <p
                  className="mt-4 flex items-center gap-[3px] font-mono text-4xl font-medium text-cloud tabular-nums sm:text-5xl"
                >
                  <span className="sr-only">{`${s.value}${s.suffix}`}</span>
                  <span aria-hidden="true" className="flex gap-[3px]">
                    {digits.map((d, i) => (
                      <Drum key={i} digit={d} active={active} delay={si * 120 + i * 140} />
                    ))}
                  </span>
                  {s.suffix && (
                    <span aria-hidden="true" className="ml-1 text-amber">
                      {s.suffix}
                    </span>
                  )}
                </p>
                <p className="mt-4 text-mist">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

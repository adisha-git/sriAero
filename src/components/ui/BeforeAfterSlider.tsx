"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { Picture } from "./Picture";

type BeforeAfterProps = {
  /** "After" photo (image name from /images-src) */
  after: string;
  /** Real "before" photo. If omitted, a weathered version of `after` is simulated with filters. */
  before?: string;
  alt: string;
  className?: string;
  sizes?: string;
};

/** Draggable, keyboard-accessible before/after comparison. */
export function BeforeAfterSlider({ after, before, alt, className = "", sizes = "(min-width: 1024px) 60vw, 100vw" }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromPointer = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey || e.key.startsWith("Page") ? 10 : 2;
    const map: Record<string, number> = {
      ArrowLeft: pos - step,
      ArrowDown: pos - step,
      PageDown: pos - step,
      ArrowRight: pos + step,
      ArrowUp: pos + step,
      PageUp: pos + step,
      Home: 0,
      End: 100,
    };
    if (e.key in map) {
      e.preventDefault();
      setPos(Math.min(100, Math.max(0, map[e.key])));
    }
  };

  const simulated = !before;

  return (
    <div className={className}>
      <div
        ref={frame}
        className="relative aspect-[16/10] touch-pan-y overflow-hidden rounded-2xl bg-navy select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* After */}
        <Picture name={after} alt={`After: ${alt}`} sizes={sizes} className="absolute inset-0 h-full w-full object-cover" />

        {/* Before, clipped to the left of the handle */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Picture
            name={before ?? after}
            alt={`Before: ${alt}`}
            sizes={sizes}
            className="absolute inset-0 h-full w-full object-cover"
            style={simulated ? { filter: "saturate(0.45) contrast(0.78) brightness(0.86) sepia(0.22) blur(0.6px)" } : undefined}
          />
          {simulated && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgb(201_209_217/0.28),transparent_60%),linear-gradient(180deg,rgb(120_110_90/0.18),rgb(60_55_45/0.28))] mix-blend-screen"
            />
          )}
        </div>

        <span className="label-mono pointer-events-none absolute top-4 left-4 rounded-full bg-navy/80 px-3 py-1.5 text-cloud">
          Before
        </span>
        <span className="label-mono pointer-events-none absolute top-4 right-4 rounded-full bg-navy/80 px-3 py-1.5 text-sky">
          After
        </span>

        {/* Handle */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -left-px w-0.5 bg-cloud shadow-[0_0_12px_rgb(0_0_0/0.4)]" />
          <div
            role="slider"
            tabIndex={0}
            aria-label="Before and after comparison. Use arrow keys to reveal more of either side."
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% before`}
            onKeyDown={onKey}
            className="pointer-events-auto absolute top-1/2 left-0 flex size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-cloud bg-navy/85 text-cloud shadow-lg backdrop-blur"
          >
            <ChevronsLeftRight aria-hidden="true" className="size-5" />
          </div>
        </div>
      </div>
      {simulated && (
        <p className="label-mono mt-3 text-[0.68rem] text-slate">
          Illustration: &ldquo;before&rdquo; side is a simulated weathered finish.
        </p>
      )}
    </div>
  );
}

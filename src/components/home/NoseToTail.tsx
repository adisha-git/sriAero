"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const hotspots = [
  {
    id: "airframe",
    station: "STA 01 · AIRFRAME",
    title: "Airframe & paint",
    x: 240,
    y: 290,
    text: "Wash, decontamination, correction and protection for painted surfaces, with decals, seams and static ports respected.",
    points: ["Wet or waterless wash", "Paint correction & revitalisation", "Wax, sealant or ceramic coating"],
  },
  {
    id: "brightwork",
    station: "STA 02 · BRIGHTWORK",
    title: "Brightwork",
    x: 610,
    y: 268,
    text: "Leading edges, engine inlet lips, spinners and polished cowls taken from dull oxidation to a clear mirror finish, then sealed.",
    points: ["Leading edges & inlets", "Spinners & cowls", "Brightwork sealing"],
  },
  {
    id: "windows",
    station: "STA 03 · GLASS",
    title: "Windows & glass",
    x: 400,
    y: 86,
    text: "Windscreens and cabin windows cleaned and polished with acrylic-safe products only, inspected for crazing and protected against static.",
    points: ["Acrylic-safe cleaners", "Fine-scratch polishing", "Anti-static protectant"],
  },
  {
    id: "gear",
    station: "STA 04 · GEAR",
    title: "Landing gear",
    x: 470,
    y: 318,
    text: "Gear legs, wheels, brakes and wells cleaned of grease and brake dust by hand, keeping product away from bearings and sensors.",
    points: ["Wheels & brake areas", "Gear legs & doors", "Wheel wells by hand"],
  },
  {
    id: "cabin",
    station: "STA 05 · CABIN",
    title: "Cabin interior",
    x: 400,
    y: 196,
    text: "Leather, carpet, veneers, galley, lav and flight deck, cleaned with methods suited to certified aircraft materials.",
    points: ["Leather clean, condition & repair", "Carpet & upholstery extraction", "Avionics-safe flight-deck care"],
  },
];

const W = 800;
const H = 540;

export function NoseToTail() {
  const [active, setActive] = useState(0);
  const spot = hotspots[active];

  return (
    <section aria-labelledby="ntt-title" className="blueprint relative overflow-hidden py-24 text-cloud sm:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <SectionLabel index="03" tone="dark">
            Nose to tail
          </SectionLabel>
          <h2 id="ntt-title" className="mt-4 text-4xl font-medium sm:text-5xl">
            Every station, accounted for.
          </h2>
          <p className="mt-5 text-lg text-mist">
            Select a station to see what&apos;s covered. Each detail follows the same sequence, so nothing is missed
            between the radome and the tail cone.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
          <div className="relative mx-auto w-full max-w-3xl">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true">
              <g fill="rgb(142 197 232 / 0.06)" stroke="#8EC5E8" strokeWidth="1.5" strokeLinejoin="round">
                {/* wings */}
                <path d="M366 210 L84 326 L80 346 L366 300 Z" />
                <path d="M434 210 L716 326 L720 346 L434 300 Z" />
                {/* horizontal stabiliser (T-tail) */}
                <path d="M400 452 L268 502 L266 518 L400 492 L534 518 L532 502 Z" />
                {/* fuselage */}
                <path d="M400 30 C428 30 434 84 434 134 L434 430 C434 466 420 494 400 506 C380 494 366 466 366 430 L366 134 C366 84 372 30 400 30 Z" />
                {/* engines */}
                <rect x="320" y="352" width="40" height="86" rx="18" />
                <rect x="440" y="352" width="40" height="86" rx="18" />
              </g>
              {/* detail lines */}
              <g fill="none" stroke="#8EC5E8" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 5">
                <path d="M84 326 L366 222 M716 326 L434 222" />
                <path d="M366 150 H434 M366 330 H434 M366 410 H434" />
                <line x1="400" y1="30" x2="400" y2="506" />
              </g>
              {/* windscreen */}
              <path d="M378 80 Q400 66 422 80 L417 96 Q400 88 383 96 Z" fill="#8EC5E8" fillOpacity="0.35" />
              {/* cabin windows */}
              {Array.from({ length: 7 }).map((_, i) => (
                <g key={i} fill="#8EC5E8" fillOpacity="0.5">
                  <circle cx="373" cy={140 + i * 24} r="3" />
                  <circle cx="427" cy={140 + i * 24} r="3" />
                </g>
              ))}
              {/* landing gear */}
              <g fill="none" stroke="#E8A33D" strokeOpacity="0.6" strokeWidth="1.2">
                <rect x="392" y="104" width="16" height="22" rx="4" />
                <rect x="338" y="292" width="20" height="34" rx="4" />
                <rect x="442" y="292" width="20" height="34" rx="4" />
              </g>
              {/* leading-edge highlight when brightwork is active */}
              <path
                d="M366 210 L84 326 M434 210 L716 326 M320 360 h40 M440 360 h40"
                stroke="#F5F7FA"
                strokeWidth="3"
                strokeLinecap="round"
                className="transition-opacity duration-500"
                opacity={spot.id === "brightwork" ? 0.9 : 0}
              />
            </svg>

            {hotspots.map((h, i) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={active === i}
                aria-controls="ntt-panel"
                aria-label={`${i + 1}. ${h.title}`}
                className="group absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ left: `${(h.x / W) * 100}%`, top: `${(h.y / H) * 100}%` }}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-1.5 rounded-full ${active === i ? "bg-amber/40" : "bg-sky/25"} [animation:pin-pulse_2.2s_ease-out_infinite] motion-hide`}
                />
                <span
                  aria-hidden="true"
                  className={`relative flex size-8 items-center justify-center rounded-full border font-mono text-sm font-medium transition-colors ${
                    active === i
                      ? "border-amber bg-amber text-navy"
                      : "border-sky bg-navy text-sky group-hover:bg-sky group-hover:text-navy"
                  }`}
                >
                  {i + 1}
                </span>
              </button>
            ))}
          </div>

          <div
            id="ntt-panel"
            aria-live="polite"
            className="rounded-2xl border border-aluminium/15 bg-navy-800/80 p-6 backdrop-blur sm:p-8"
          >
            <p className="label-mono text-amber">{spot.station}</p>
            <h3 className="mt-3 text-3xl font-medium">{spot.title}</h3>
            <p className="mt-4 text-mist">{spot.text}</p>
            <ul className="mt-6 space-y-2 border-t border-aluminium/15 pt-6">
              {spot.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-cloud">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-sky" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-2" aria-hidden="true">
              {hotspots.map((h, i) => (
                <span key={h.id} className={`h-1 flex-1 rounded-full ${i === active ? "bg-amber" : "bg-aluminium/20"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

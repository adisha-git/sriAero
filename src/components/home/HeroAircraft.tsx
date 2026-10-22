"use client";

import { useReducedMotion } from "framer-motion";
import { JetSilhouette } from "./JetSilhouette";

const FLIGHT = "M-120 700 C 300 690, 640 600, 900 430 S 1330 170, 1580 120";
const DURATION = "13s";

/** A small jet flies a curved departure across the hero, leaving a fading contrail. */
export function HeroAircraft() {
  const reduce = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <path id="flight-path" d={FLIGHT} />
        <linearGradient id="contrail" x1="-120" y1="0" x2="1580" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F5F7FA" stopOpacity="0" />
          <stop offset="0.55" stopColor="#F5F7FA" stopOpacity="0.28" />
          <stop offset="1" stopColor="#F5F7FA" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {reduce ? (
        <>
          <use href="#flight-path" fill="none" stroke="url(#contrail)" strokeWidth="2" strokeDasharray="2 10" opacity="0.5" />
          <g transform="translate(1180 268) rotate(-22) scale(0.7)">
            <JetSilhouette fill="#F5F7FA" />
          </g>
        </>
      ) : (
        <>
          {/* soft outer contrail */}
          <path d={FLIGHT} fill="none" stroke="url(#contrail)" strokeWidth="7" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset="1" opacity="0.25">
            <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.72;1" dur={DURATION} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.25;0.25;0" keyTimes="0;0.08;0.72;1" dur={DURATION} repeatCount="indefinite" />
          </path>
          {/* core contrail */}
          <path d={FLIGHT} fill="none" stroke="url(#contrail)" strokeWidth="1.6" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset="1">
            <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.72;1" dur={DURATION} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0.9;0" keyTimes="0;0.08;0.72;1" dur={DURATION} repeatCount="indefinite" />
          </path>
          <g>
            <animateMotion dur={DURATION} repeatCount="indefinite" rotate="auto" keyPoints="0;1;1" keyTimes="0;0.72;1" calcMode="linear">
              <mpath href="#flight-path" />
            </animateMotion>
            <g transform="scale(0.62)">
              <JetSilhouette fill="#F5F7FA" />
              {/* nav lights: red port (left), green starboard (right) when nose points +x */}
              <circle cx="-10" cy="-27" r="1.8" fill="#ff5a5a" />
              <circle cx="-10" cy="27" r="1.8" fill="#4ade80" />
              <circle cx="-31" cy="0" r="1.6" fill="#F5F7FA">
                <animate attributeName="opacity" values="1;0.1;1" dur="1.1s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
        </>
      )}
    </svg>
  );
}

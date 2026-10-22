import { Plane } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { airports } from "@/config/site";

// Simple equirectangular projection of Southern Alberta onto the SVG.
const W = 600;
const H = 560;
const LON = [-116.6, -111.4] as const;
const LAT = [49.0, 52.6] as const;
const project = (lon: number, lat: number) => [
  ((lon - LON[0]) / (LON[1] - LON[0])) * W,
  ((LAT[1] - lat) / (LAT[1] - LAT[0])) * H,
];
const line = (pts: [number, number][]) =>
  pts.map(([lon, lat], i) => `${i ? "L" : "M"}${project(lon, lat).map((n) => n.toFixed(1)).join(" ")}`).join(" ");

// Approximate Alberta–BC border along the Rockies (stylised).
const border: [number, number][] = [
  [-114.06, 49.0], [-114.4, 49.5], [-114.7, 49.9], [-114.65, 50.3], [-115.1, 50.6],
  [-115.5, 50.9], [-115.8, 51.1], [-116.2, 51.4], [-116.6, 51.65],
];
const bow: [number, number][] = [
  [-116.2, 51.42], [-115.57, 51.18], [-115.0, 51.08], [-114.4, 51.15], [-114.07, 51.05],
  [-113.6, 50.9], [-112.8, 50.75], [-112.0, 50.1], [-111.4, 49.9],
];
const redDeer: [number, number][] = [
  [-115.6, 51.75], [-114.6, 51.95], [-113.8, 52.27], [-113.0, 52.0], [-112.5, 51.4], [-111.4, 51.0],
];
const hwy2: [number, number][] = [
  [-113.4, 49.0], [-113.4, 49.72], [-113.85, 50.55], [-113.98, 50.9], [-114.05, 51.05],
  [-114.1, 51.7], [-113.85, 52.27], [-113.7, 52.6],
];

const hub = airports.find((a) => a.code === "CYYC")!;
const [hx, hy] = project(hub.lon, hub.lat);

export function ServiceAreaMap() {
  const land = `${line(border)} L0 0 L${W} 0 L${W} ${H} Z`;
  // Rocky Mountain ridge marks along the border.
  const ridges = border.slice(0, -1).flatMap(([lon, lat], i) => {
    const [x1, y1] = project(lon, lat);
    const [x2, y2] = project(...border[i + 1]);
    return [0.25, 0.75].map((t) => {
      const x = x1 + (x2 - x1) * t - 18;
      const y = y1 + (y2 - y1) * t;
      return `M${x - 9} ${y + 7} L${x} ${y - 8} L${x + 9} ${y + 7}`;
    });
  });

  return (
    <section id="service-area" aria-labelledby="area-title" className="blueprint relative overflow-hidden py-24 text-cloud sm:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionLabel index="07" tone="dark">
            Service area
          </SectionLabel>
          <h2 id="area-title" className="mt-4 text-4xl font-medium sm:text-5xl">
            Based at CYYC. Ready to come to you.
          </h2>
          <p className="mt-5 text-lg text-mist">
            We work out of Calgary and cover the airports of Southern Alberta as standard. Your hangar, your FBO, your
            schedule.
          </p>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-aluminium/15 bg-aluminium/15 sm:grid-cols-2">
            {airports.map((a) => (
              <li key={a.code} className="flex items-baseline gap-4 bg-navy/95 px-5 py-4">
                <span className="font-mono text-sky">{a.code}</span>
                <span className="text-cloud">{a.name}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-center gap-3 text-aluminium">
            <Plane aria-hidden="true" className="size-5 text-amber" />
            Travel available across Western Canada. Ask about your location.
          </p>
        </div>

        <figure className="relative mx-auto w-full max-w-xl">
          <div className="relative overflow-hidden rounded-2xl border border-aluminium/15 bg-navy-800/60">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="relative z-[1] h-auto w-full"
              role="img"
              aria-label="Map of Southern Alberta showing SriAero's service airports: Calgary International, Springbank, Okotoks, High River, Olds-Didsbury and Red Deer"
            >
              {/* British Columbia side */}
              <rect width={W} height={H} fill="#0B1B2B" />
              <path d={land} fill="#102539" stroke="#8EC5E8" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="6 5" />
              <path d={ridges.join(" ")} fill="none" stroke="#C9D1D9" strokeOpacity="0.25" strokeWidth="1.4" />
              <text x="26" y={H - 26} className="fill-mist font-mono text-[13px] tracking-[0.2em]">
                BC · ROCKIES
              </text>
              <text x={W - 26} y={H - 26} textAnchor="end" className="fill-mist font-mono text-[13px] tracking-[0.2em]">
                ALBERTA
              </text>

              {/* rivers and Highway 2 */}
              <path d={line(bow)} fill="none" stroke="#8EC5E8" strokeOpacity="0.35" strokeWidth="2" />
              <path d={line(redDeer)} fill="none" stroke="#8EC5E8" strokeOpacity="0.35" strokeWidth="2" />
              <path d={line(hwy2)} fill="none" stroke="#E8A33D" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="10 6" />
              <text x={project(-113.4, 49.4)[0] + 10} y={project(-113.4, 49.4)[1]} className="fill-amber/70 font-mono text-[11px]">
                HWY 2
              </text>

              {/* range rings around Calgary */}
              {[70, 140, 210, 280].map((r) => (
                <circle key={r} cx={hx} cy={hy} r={r} fill="none" stroke="#8EC5E8" strokeOpacity="0.16" />
              ))}
              <line x1={hx - 300} y1={hy} x2={hx + 400} y2={hy} stroke="#8EC5E8" strokeOpacity="0.1" />
              <line x1={hx} y1={0} x2={hx} y2={H} stroke="#8EC5E8" strokeOpacity="0.1" />

              {/* airports */}
              {airports.map((a) => {
                const [x, y] = project(a.lon, a.lat);
                const isHub = a.code === hub.code;
                const labelLeft = a.code === "CYBW" || a.code === "CEA3";
                return (
                  <g key={a.code}>
                    <circle
                      cx={x}
                      cy={y}
                      r="7"
                      fill={isHub ? "#E8A33D" : "#8EC5E8"}
                      className="origin-center [transform-box:fill-box] [animation:pin-pulse_2.6s_ease-out_infinite]"
                      style={{ animationDelay: `${(a.lat % 1) * 2}s` }}
                    />
                    <circle cx={x} cy={y} r={isHub ? 6 : 4.5} fill={isHub ? "#E8A33D" : "#8EC5E8"} stroke="#0B1B2B" strokeWidth="2" />
                    <text
                      x={labelLeft ? x - 12 : x + 12}
                      y={y + 4}
                      textAnchor={labelLeft ? "end" : "start"}
                      className={`font-mono text-[13px] font-medium ${isHub ? "fill-amber" : "fill-cloud"}`}
                    >
                      {a.code}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* radar sweep, centred on CYYC */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-[2] aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(hx / W) * 100}%`, top: `${(hy / H) * 100}%` }}
            >
              <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,rgb(142_197_232/0.32),rgb(142_197_232/0.06)_50deg,transparent_70deg)] [animation:radar-sweep_6s_linear_infinite] motion-hide" />
            </div>
          </div>
          <figcaption className="label-mono mt-3 flex justify-between text-mist">
            <span>Stylised · not for navigation</span>
            <span>R 280 · CYYC</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AircraftIcon, type AircraftKind } from "./AircraftIcons";

export const aircraftTypes: { kind: AircraftKind; name: string; examples: string; note: string }[] = [
  { kind: "piston", name: "Piston singles & twins", examples: "C172 · PA-28 · SR22 · Baron", note: "Owner-flown and club aircraft" },
  { kind: "turboprop", name: "Turboprops", examples: "King Air · PC-12 · TBM · Caravan", note: "Corporate, medevac and utility" },
  { kind: "jet", name: "Business jets", examples: "Light to large-cabin", note: "Private owners and flight departments" },
  { kind: "helicopter", name: "Helicopters", examples: "Light singles to medium twins", note: "Utility, tour and EMS operators" },
  { kind: "float", name: "Float planes", examples: "Beaver · Otter · C185", note: "Spring readiness and corrosion care" },
  { kind: "agricultural", name: "Agricultural aircraft", examples: "Air Tractor · Thrush", note: "Chemical residue and belly degreasing" },
  { kind: "charter", name: "Commercial & charter", examples: "Regional turboprops and jets", note: "Scheduled around rotations" },
];

export function AircraftTypes() {
  return (
    <section aria-labelledby="types-title" className="bg-cloud py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionLabel index="04">Aircraft we service</SectionLabel>
            <h2 id="types-title" className="mt-4 text-4xl font-medium text-navy sm:text-5xl">
              From a C172 to a large-cabin jet.
            </h2>
          </div>
          <p className="max-w-xl text-lg text-slate lg:justify-self-end">
            Methods and products are matched to each airframe&apos;s materials, so the scope changes with the aircraft,
            not the standard.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-aluminium bg-aluminium sm:grid-cols-2 lg:grid-cols-4">
          {aircraftTypes.map((t, i) => (
            <Reveal as="li" key={t.kind} delay={(i % 4) * 0.06} className="group bg-white p-6 transition-colors hover:bg-cloud">
              <AircraftIcon kind={t.kind} className="h-12 w-24 text-horizon transition-transform duration-500 group-hover:translate-x-1" />
              <h3 className="mt-6 text-xl font-medium text-navy">{t.name}</h3>
              <p className="label-mono mt-2 text-[0.7rem] text-horizon">{t.examples}</p>
              <p className="mt-3 text-sm text-slate">{t.note}</p>
            </Reveal>
          ))}
          <li className="flex flex-col justify-between bg-navy p-6 text-cloud">
            <p className="label-mono text-sky">Not listed?</p>
            <p className="mt-6 font-display text-xl">If it flies, ask us. We&apos;ll confirm the right methods first.</p>
            <Link href="/contact/" className="mt-6 font-mono text-sm text-amber hover:underline">
              Ask about your aircraft →
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

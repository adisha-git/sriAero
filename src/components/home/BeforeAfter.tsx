import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function BeforeAfter() {
  return (
    <section aria-labelledby="ba-title" className="bg-white py-24 sm:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel index="02">Correction</SectionLabel>
          <h2 id="ba-title" className="mt-4 text-4xl font-medium text-navy sm:text-5xl">
            From oxidised to mirror-bright.
          </h2>
          <p className="mt-6 text-lg text-slate">
            UV at altitude, de-icing fluid and prairie dust dull a finish faster than most owners expect. Correction
            removes the damaged layer, measured and controlled, and protection keeps it from coming back.
          </p>
          <ul className="mt-8 space-y-3 font-mono text-sm text-navy">
            {["Paint depth measured before we polish", "Least aggressive method that works", "Sealed or coated to hold the finish"].map(
              (t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="text-horizon">0{i + 1}</span>
                  {t}
                </li>
              ),
            )}
          </ul>
        </div>
        <Reveal>
          <BeforeAfterSlider after="fuselage-aluminium" alt="polished aluminium fuselage panels and cabin windows of a vintage airliner" />
        </Reveal>
      </div>
    </section>
  );
}

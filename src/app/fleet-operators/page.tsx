import { FinalCta } from "@/components/home/FinalCta";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Fleet & Operator Aircraft Detailing in Calgary",
  description:
    "Aircraft detailing programs for corporate flight departments, charter operators, flight schools, helicopter operators, brokers and FBOs in Calgary and Alberta. Scheduled around your operations.",
  path: "/fleet-operators/",
});

const audiences: { icon: IconName; title: string; need: string; how: string }[] = [
  {
    icon: "user-check",
    title: "Private owners",
    need: "An aircraft that looks as cared for as it's maintained, without losing a weekend to it.",
    how: "Recurring plans timed around your flying, with one person who knows your aircraft.",
  },
  {
    icon: "building",
    title: "Corporate flight departments",
    need: "A consistent standard for principals and guests, with zero impact on dispatch.",
    how: "Written scope, condition logs and work done overnight or during planned downtime.",
  },
  {
    icon: "briefcase",
    title: "Charter operators",
    need: "Quick, reliable turns between legs and a cabin that's always presentable.",
    how: "Cabin refreshes between legs, deep details on scheduled down days, priority callouts.",
  },
  {
    icon: "graduation",
    title: "Flight schools",
    need: "High-utilisation trainers that stay clean, safe and professional-looking.",
    how: "Rotating fleet schedules, cockpit care for heavy-use panels, volume pricing.",
  },
  {
    icon: "wind",
    title: "Helicopter operators",
    need: "Rotorcraft that live outdoors and work in dust, snow and exhaust.",
    how: "Exhaust and oil film removal, windscreen care and protection suited to rotorcraft.",
  },
  {
    icon: "badge-check",
    title: "Aircraft brokers",
    need: "Listings that photograph well and aircraft that impress on the pre-buy walkaround.",
    how: "Pre-sale presentation details, timed to photography and buyer visits.",
  },
  {
    icon: "store",
    title: "FBOs",
    need: "A detailing partner you can offer to transient and based customers.",
    how: "On-call service at your facility, coordinated with your line team and hangar plan.",
  },
];

const windows = [
  { code: "OVN", title: "Overnight", text: "The aircraft lands in the evening and departs clean in the morning. We work while the crew rests." },
  { code: "TURN", title: "Between legs", text: "Focused cabin and exterior refreshes sized to the ground time you actually have." },
  { code: "MX", title: "Planned downtime", text: "Correction and coatings scheduled alongside inspections, when the aircraft is already in the hangar." },
];

export default function FleetOperatorsPage() {
  return (
    <>
      <PageHero
        label="Fleet & operators · Ops-first scheduling"
        title={
          <>
            Detailing that works <span className="text-sky">around your schedule.</span>
          </>
        }
        intro="Whether you fly one aircraft or manage twenty, the work is planned around your operation. Overnight, between legs, or during planned maintenance."
        image={{ name: "helicopter-helipad", alt: "A white and black light helicopter parked on a helipad marked in yellow" }}
      />

      <section aria-labelledby="who-title" className="bg-cloud py-24 sm:py-32">
        <div className="container-x">
          <SectionLabel index="01">Who we serve</SectionLabel>
          <h2 id="who-title" className="mt-4 max-w-3xl text-4xl font-medium text-navy sm:text-5xl">
            Different operations. Same standard.
          </h2>
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={(i % 3) * 0.06} className="flex flex-col rounded-2xl border border-aluminium bg-white p-7">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy text-sky">
                  <Icon name={a.icon} className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl font-medium text-navy">{a.title}</h3>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="label-mono text-[0.68rem] text-slate">The need</dt>
                    <dd className="mt-1 text-navy">{a.need}</dd>
                  </div>
                  <div>
                    <dt className="label-mono text-[0.68rem] text-horizon">How we help</dt>
                    <dd className="mt-1 text-slate">{a.how}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="windows-title" className="blueprint py-24 text-cloud sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel index="02" tone="dark">
              Scheduling
            </SectionLabel>
            <h2 id="windows-title" className="mt-4 text-4xl font-medium sm:text-5xl">
              We fit into your ground time, not the other way round.
            </h2>
            <p className="mt-5 text-lg text-mist">
              Tell us your schedule and your hangar access. We plan the scope to the time available and confirm it in
              writing before we start.
            </p>
            <div className="mt-10 overflow-hidden rounded-2xl border border-aluminium/15">
              <Picture
                name="jet-tarmac-blue"
                alt="A sleek light jet with a glossy dark paint finish parked on the ramp at dusk"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
          <ol className="space-y-4">
            {windows.map((w, i) => (
              <Reveal as="li" key={w.code} delay={i * 0.08}>
                {/* styled like a flight progress strip */}
                <div className="grid grid-cols-[5rem_1fr] overflow-hidden rounded-xl border border-aluminium/20 bg-navy-800/80">
                  <div className="flex flex-col items-center justify-center border-r border-dashed border-aluminium/25 bg-horizon/30 py-6">
                    <span className="font-mono text-lg font-medium text-amber">{w.code}</span>
                    <span className="label-mono mt-1 text-[0.62rem] text-sky">0{i + 1}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-medium">{w.title}</h3>
                    <p className="mt-2 text-mist">{w.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <li className="rounded-xl border border-dashed border-aluminium/25 p-6">
              <h3 className="label-mono text-sky">Fleet programs include</h3>
              <ul className="mt-4 grid gap-3 text-cloud sm:grid-cols-2">
                {[
                  "Per-tail standard and checklist",
                  "Condition log with photos",
                  "One point of contact",
                  "Consolidated monthly invoicing",
                  "Priority callouts",
                  "Volume pricing",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-amber" />
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </div>
      </section>

      <FinalCta title="Set up a fleet program." text="Tell us how many aircraft, where they're based and how they fly. We'll propose a schedule and a per-tail price." />
    </>
  );
}

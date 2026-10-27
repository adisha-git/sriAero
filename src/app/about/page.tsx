import { User } from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Picture } from "@/components/ui/Picture";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { certifications, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About SriAero: Calgary Aircraft Detailing Specialists",
  description:
    "SriAero is a Calgary-based, aviation-focused detailing company using aviation-specific methods and aircraft-safe chemistry. Mobile, insured, one point of contact.",
  path: "/about/",
});

const reasons: { icon: IconName; title: string; text: string; placeholder?: boolean }[] = [
  { icon: "map-pin", title: "Mobile hangar service", text: "We bring water management, power and products to your hangar or FBO. Your aircraft doesn't need to move." },
  { icon: "shield-check", title: "Aviation-approved products", text: "Cleaners, polishes and coatings chosen for aircraft paint, aluminium, acrylic and certified interior materials." },
  { icon: "file-text", title: "Written standard procedures", text: "Every service follows a written procedure and checklist, so the result doesn't depend on who's holding the polisher." },
  { icon: "user-check", title: "One point of contact", text: "One person schedules, scopes and signs off your work, and knows your aircraft's history." },
  { icon: "shield", title: "Fully insured", text: "Liability coverage for work on and around aircraft. Certificates available on request." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label={`About · Est. ${site.established} · CYYC`}
        title={
          <>
            We treat the finish the way an engineer <span className="text-sky">treats the airframe.</span>
          </>
        }
        intro="SriAero is a Calgary-based detailing company that works only on aircraft. That focus shapes everything: the products we choose, the procedures we write down and the way we hand back every aircraft."
        image={{ name: "propeller-vintage", alt: "Polished propeller and spinner in front of a red radial engine, inside a hangar" }}
      />

      <section aria-labelledby="story-title" className="bg-cloud py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionLabel index="01">Our story</SectionLabel>
            <h2 id="story-title" className="mt-4 text-4xl font-medium text-navy sm:text-5xl">
              Built for aircraft, not adapted from cars.
            </h2>
          </div>
          <div className="space-y-5 text-lg text-slate">
            <p>
              Aircraft aren&apos;t big cars. Their paint systems are thinner and more expensive to replace. Their
              windows are acrylic. Their leading edges, static ports and de-ice boots each need their own approach. And
              their owners and operators measure everything against an airworthiness standard.
            </p>
            <p>
              SriAero was started in Calgary to bring that same discipline to detailing. We use aviation-specific
              methods and aircraft-safe chemistry, we write down how each job is done, and we document the condition of
              every aircraft before and after we touch it.
            </p>
            <p>
              Our home is the Calgary area, and Southern Alberta&apos;s weather is a big part of why we do this:
              chinooks, hail, road salt, de-icing fluid and a lot of sun at altitude. We know what it does to an
              aircraft, and how to keep it from taking hold.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-title" className="blueprint py-24 text-cloud sm:py-32">
        <div className="container-x">
          <SectionLabel index="02" tone="dark">
            Why SriAero
          </SectionLabel>
          <h2 id="why-title" className="mt-4 max-w-3xl text-4xl font-medium sm:text-5xl">
            Five things you can hold us to.
          </h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-aluminium/15 bg-aluminium/15 md:grid-cols-2 lg:grid-cols-5">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 0.06} className="bg-navy p-7">
                <span className="label-mono text-amber">0{i + 1}</span>
                <Icon name={r.icon} className="mt-5 size-7 text-sky" />
                <h3 className="mt-5 text-xl font-medium">{r.title}</h3>
                {r.placeholder && <PlaceholderBadge className="mt-2" />}
                <p className="mt-3 text-mist">{r.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="founder-title" className="bg-white py-24 sm:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative">
            {/* PLACEHOLDER – replace with a portrait of the founder (add to /images-src, run npm run images, use <Picture>) */}
            <div className="flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-aluminium bg-cloud text-slate">
              <User aria-hidden="true" className="size-16 text-aluminium" strokeWidth={1} />
              <PlaceholderBadge />
              <span className="label-mono text-[0.7rem]">Founder portrait</span>
            </div>
          </div>
          <div>
            <SectionLabel index="03">Founder</SectionLabel>
            <h2 id="founder-title" className="mt-4 flex flex-wrap items-center gap-3 text-4xl font-medium text-navy sm:text-5xl">
              {site.founder.name} <PlaceholderBadge />
            </h2>
            <p className="label-mono mt-3 text-horizon">{site.founder.role}</p>
            <p className="mt-6 text-lg text-slate">{site.founder.bio}</p>

            {certifications.length > 0 && (
              <div className="mt-10 border-t border-aluminium pt-8">
                <h3 className="label-mono flex items-center gap-3 text-navy">
                  Insurance, training & memberships <PlaceholderBadge />
                </h3>
                <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                  {certifications.map((c) => (
                    <li key={c.name} className="rounded-xl border border-aluminium p-4">
                      <p className="font-display font-medium text-navy">{c.name}</p>
                      <p className="mt-1 text-sm text-slate">{c.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-label="Alberta skies" className="relative h-[42vh] min-h-72 overflow-hidden bg-navy">
        <Picture name="rockies-gondola" alt="Rocky Mountain peaks under a dramatic cloudy sky near Banff, Alberta" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
        <p className="label-mono absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-cloud">
          Southern Alberta · Where we fly
        </p>
      </section>

      <FinalCta />
    </>
  );
}

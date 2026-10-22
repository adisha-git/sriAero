import { Check } from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/config/site";
import { serviceGroups } from "@/content/services";
import { businessId, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Aircraft Detailing Services: Exterior, Interior & Ceramic Coating",
  description:
    "Aircraft wash, waterless dry wash, brightwork polishing, paint correction, aircraft ceramic coating and full cabin detailing in Calgary and Southern Alberta. See what's included.",
  path: "/services/",
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": serviceGroups.flatMap((g) =>
    g.services.map((s) => ({
      "@type": "Service",
      "@id": `${site.url}/services/#${s.id}`,
      name: s.name,
      serviceType: `Aircraft ${g.title.toLowerCase()} detailing`,
      description: s.description,
      provider: { "@id": businessId },
      areaServed: { "@type": "AdministrativeArea", name: "Southern Alberta" },
      url: `${site.url}/services/#${s.id}`,
    })),
  ),
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services · Nose to tail"
        title={
          <>
            Aircraft detailing, <span className="text-sky">done to an aviation standard.</span>
          </>
        }
        intro="Exterior, interior, protection and recurring programs for pistons through large-cabin jets. All mobile, all at your hangar or FBO in Calgary and Southern Alberta."
        image={{ name: "jet-g550", alt: "A white long-range business jet on the ramp beneath a blue sky" }}
      />

      {/* Section jump links */}
      <nav aria-label="Service categories" className="sticky top-16 z-30 border-b border-aluminium bg-white/95 backdrop-blur">
        <ul className="container-x flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {serviceGroups.map((g) => (
            <li key={g.id} className="shrink-0">
              <a
                href={`#${g.id}`}
                className="label-mono inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-navy transition-colors hover:bg-cloud hover:text-horizon"
              >
                <span className="text-horizon">({g.index})</span> {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {serviceGroups.map((g, gi) => (
        <section
          key={g.id}
          id={g.id}
          aria-labelledby={`${g.id}-title`}
          className={`scroll-mt-32 py-20 sm:py-28 ${gi % 2 ? "bg-white" : "bg-cloud"}`}
        >
          <div className="container-x">
            <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <SectionLabel index={g.index}>{g.title}</SectionLabel>
                <h2 id={`${g.id}-title`} className="mt-4 text-4xl font-medium text-navy sm:text-5xl">
                  {g.heading}
                </h2>
                <p className="mt-5 max-w-2xl text-lg text-slate">{g.intro}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-aluminium">
                <Picture name={g.image} alt={g.imageAlt} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[16/9] w-full object-cover" />
              </div>
            </div>

            <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {g.services.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.id}
                  delay={(i % 3) * 0.06}
                  className="scroll-mt-32 rounded-2xl border border-aluminium bg-white p-6 sm:p-7"
                >
                  <article id={s.id} aria-labelledby={`${s.id}-name`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex size-12 items-center justify-center rounded-xl bg-horizon/8 text-horizon ring-1 ring-horizon/15">
                        <Icon name={s.icon} className="size-6" />
                      </span>
                      <span className="label-mono text-[0.68rem] text-slate">
                        {g.index}.{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 id={`${s.id}-name`} className="mt-5 text-xl font-medium text-navy">
                      {s.name}
                    </h3>
                    <p className="mt-3 text-slate">{s.description}</p>
                    <h4 className="label-mono mt-6 text-[0.68rem] text-horizon">What&apos;s included</h4>
                    <ul className="mt-3 space-y-2">
                      {s.includes.map((item) => (
                        <li key={item} className="flex gap-3 text-[0.94rem] text-navy">
                          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-horizon" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <FinalCta
        title="Not sure what your aircraft needs?"
        text="Send us the type, registration and a few photos. We'll recommend a scope, and tell you what can wait."
      />
      <JsonLd data={serviceSchema} />
    </>
  );
}

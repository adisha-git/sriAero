import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { serviceGroups } from "@/content/services";

const cards = [
  {
    group: "exterior",
    summary: "Wet or waterless wash, brightwork, paint correction, windows, de-ice boots, belly and gear.",
    image: "jet-tarmac-blue",
    alt: "Close view of a sleek light jet with a polished, reflective paint finish on the ramp at dusk",
  },
  {
    group: "interior",
    summary: "Full cabin detail, leather care and repair, extraction, veneers, galley, lav and flight deck.",
    image: "cabin-jet-leather",
    alt: "Business jet cabin with cream leather seats facing a polished wood table",
  },
  {
    group: "protection",
    summary: "Ceramic coatings, polymer sealants and brightwork sealing, built for Alberta's climate.",
    image: "turboprop-spinner",
    alt: "Mirror-polished propeller spinner reflecting the sky on a parked turboprop",
  },
] as const;

export function ServicesOverview() {
  return (
    <section aria-labelledby="services-title" className="bg-cloud py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <SectionLabel index="01">Services</SectionLabel>
            <h2 id="services-title" className="mt-4 text-4xl font-medium text-navy sm:text-5xl">
              Nose to tail, inside and out.
            </h2>
          </div>
          <p className="max-w-xl text-lg text-slate lg:justify-self-end">
            Three disciplines, one standard. Every visit starts with a walkaround and a written scope, and ends with a
            walkaround you sign off.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => {
            const group = serviceGroups.find((g) => g.id === card.group)!;
            return (
              <Reveal as="li" key={card.group} delay={i * 0.1}>
                <Link
                  href={`/services/#${group.id}`}
                  className="shine group flex h-full flex-col overflow-hidden rounded-2xl border border-aluminium bg-white shadow-[0_1px_0_rgb(11_27_43/0.04)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-flight)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgb(11_27_43/0.45)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Picture
                      name={card.image}
                      alt={card.alt}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-flight)] group-hover:scale-[1.04]"
                    />
                    <span className="label-mono absolute top-4 left-4 rounded-full bg-navy/80 px-3 py-1.5 text-sky backdrop-blur">
                      ({group.index}) {group.title}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="flex items-center justify-between gap-4 text-2xl font-medium text-navy">
                      {group.title}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 text-horizon transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </h3>
                    <p className="mt-3 text-slate">{card.summary}</p>
                    <p className="label-mono mt-auto pt-6 text-horizon">{group.services.length} services →</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

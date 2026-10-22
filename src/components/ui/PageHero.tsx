import { Clouds } from "./Clouds";
import { Picture } from "./Picture";
import { SectionLabel } from "./SectionLabel";

type PageHeroProps = {
  label: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  image?: { name: string; alt: string };
  children?: React.ReactNode;
};

export function PageHero({ label, title, intro, image, children }: PageHeroProps) {
  return (
    <section className="blueprint relative isolate overflow-hidden text-cloud">
      <Clouds className="-z-10 opacity-60" />
      <div className={`container-x grid items-center gap-12 py-20 sm:py-24 ${image ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
        <div className="max-w-3xl">
          <SectionLabel tone="dark">{label}</SectionLabel>
          <h1 className="mt-5 text-[2.6rem] leading-[1.05] font-medium sm:text-6xl">{title}</h1>
          <div className="mt-6 max-w-2xl text-lg text-aluminium sm:text-xl">{intro}</div>
          {children}
        </div>
        {image && (
          <div className="relative hidden lg:block">
            <div className="overflow-hidden rounded-2xl border border-aluminium/15">
              <Picture
                name={image.name}
                alt={image.alt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
            <span aria-hidden="true" className="absolute -bottom-3 -left-3 size-16 border-b-2 border-l-2 border-amber" />
            <span aria-hidden="true" className="absolute -top-3 -right-3 size-16 border-t-2 border-r-2 border-sky" />
          </div>
        )}
      </div>
    </section>
  );
}

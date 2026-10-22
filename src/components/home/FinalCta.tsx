import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Clouds } from "@/components/ui/Clouds";
import { Picture } from "@/components/ui/Picture";
import { site } from "@/config/site";

export function FinalCta({
  title = "Book your aircraft in.",
  text = "Tell us the aircraft, the airport and what you need. We'll come back with a scope, a price and a time that works around your flying.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-navy py-28 text-cloud sm:py-36">
      <Picture
        name="hangar-silhouette"
        alt=""
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(11_27_43/0.4),rgb(11_27_43/0.95)_70%)]" />
      <Clouds className="-z-[5]" />

      <div className="container-x text-center">
        <p className="label-mono inline-flex items-center gap-3 text-sky">
          <span aria-hidden="true" className="size-2 rounded-full bg-amber [animation:beacon_1.4s_ease-in-out_infinite]" />
          Ready for departure
        </p>
        <h2 id="cta-title" className="mx-auto mt-6 max-w-3xl text-5xl font-medium sm:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-aluminium">{text}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/contact/" variant="amber" arrow>
            Request a Quote
          </Button>
          <a
            href={site.contact.phoneHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cloud/30 px-6 font-mono text-cloud transition-colors hover:border-sky hover:text-sky"
          >
            <Phone aria-hidden="true" className="size-4" />
            {site.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

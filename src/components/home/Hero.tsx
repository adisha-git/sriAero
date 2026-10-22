import { Button } from "@/components/ui/Button";
import { Clouds } from "@/components/ui/Clouds";
import { Picture } from "@/components/ui/Picture";
import { HeroAircraft } from "./HeroAircraft";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-end overflow-hidden bg-navy text-cloud sm:items-center"
    >
      <Picture
        name="jet-golden-hour"
        alt="A white business jet parked on the ramp at sunset, low sun glowing beneath its wing"
        priority
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      {/* navy gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(11_27_43/0.94)_0%,rgb(11_27_43/0.78)_45%,rgb(11_27_43/0.25)_100%),linear-gradient(0deg,rgb(11_27_43/0.95)_0%,rgb(11_27_43/0)_45%)]"
      />
      <HeroAircraft />
      <Clouds className="-z-[5] opacity-70" />

      <div className="container-x relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="label-mono mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sky opacity-0 [animation:rise-in_0.7s_var(--ease-flight)_0.1s_forwards]">
            <span aria-hidden="true" className="h-px w-8 bg-amber" />
            CYYC · Calgary · Southern Alberta
          </p>
          <h1
            id="hero-title"
            className="text-[2.6rem] leading-[1.04] font-medium sm:text-6xl lg:text-7xl"
          >
            Aviation-grade detailing, <span className="text-sky">delivered to your hangar.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-aluminium sm:text-xl">
            Mobile exterior, interior and protection services for private, corporate and commercial aircraft across
            Calgary and Southern Alberta, scheduled around your flying.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact/" variant="amber" arrow>
              Request a Quote
            </Button>
            <Button href="/services/" variant="ghost-dark">
              Explore Services
            </Button>
          </div>
        </div>

        <dl className="mt-16 hidden max-w-2xl grid-cols-3 gap-6 border-t border-aluminium/15 pt-6 sm:grid">
          {[
            ["Mode", "Mobile · Hangar / FBO"],
            ["Scope", "Ext · Int · Protection"],
            ["Range", "Southern AB · W. Canada"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label-mono text-sky/80">{k}</dt>
              <dd className="mt-1 font-mono text-sm text-cloud">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHero } from "@/components/ui/PageHero";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { airports, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Quote: Mobile Aircraft Detailing Calgary",
  description:
    "Request a quote for aircraft detailing in Calgary and Southern Alberta. Tell us your aircraft, home airport and the services you need, and we'll reply with a scope and price.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact · Request a quote"
        title={
          <>
            Tell us about <span className="text-sky">your aircraft.</span>
          </>
        }
        intro={`A few details are all we need to scope the job. We'll reply with a price and available dates, ${site.contact.responseTime}.`}
      />

      <section aria-label="Quote request" className="scroll-mt-24 bg-cloud py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div className="rounded-2xl border border-aluminium bg-white p-6 sm:p-10">
            <h2 className="label-mono mb-8 flex items-center gap-3 text-horizon">
              <span aria-hidden="true" className="h-px w-8 bg-amber" /> Quote request · Form QR-01
            </h2>
            <QuoteForm />
          </div>

          <aside aria-label="Contact details" className="space-y-6">
            <div className="blueprint rounded-2xl p-8 text-cloud">
              <h2 className="label-mono text-sky">Direct line</h2>
              <ul className="mt-6 space-y-5">
                <li>
                  <a href={site.contact.phoneHref} className="group flex items-start gap-4">
                    <Phone aria-hidden="true" className="mt-1 size-5 text-amber" />
                    <span>
                      <span className="block text-sm text-mist">Phone</span>
                      <span className="font-mono text-lg group-hover:text-sky">{site.contact.phoneDisplay}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.email}`} className="group flex items-start gap-4">
                    <Mail aria-hidden="true" className="mt-1 size-5 text-amber" />
                    <span>
                      <span className="block text-sm text-mist">Email</span>
                      <span className="break-all text-lg group-hover:text-sky">{site.contact.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-1 size-5 text-amber" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                    </svg>
                    <span>
                      <span className="block text-sm text-mist">Instagram</span>
                      <span className="text-lg group-hover:text-sky">{site.social.instagramHandle}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <Clock aria-hidden="true" className="mt-1 size-5 text-amber" />
                  <span>
                    <span className="block text-sm text-mist">Hours</span>
                    <span>{site.contact.hours}</span>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin aria-hidden="true" className="mt-1 size-5 text-amber" />
                  <span>
                    <span className="block text-sm text-mist">Base</span>
                    <span>
                      {site.address.city}, {site.address.regionName} · Mobile service
                    </span>
                  </span>
                </li>
              </ul>
              <div className="mt-8 border-t border-aluminium/15 pt-6">
                <SocialIcons />
              </div>
            </div>

            <div className="rounded-2xl border border-aluminium bg-white p-8">
              <h2 className="label-mono text-horizon">Airports served</h2>
              <ul className="mt-5 space-y-3">
                {airports.map((a) => (
                  <li key={a.code} className="flex gap-4 text-navy">
                    <span className="w-12 font-mono text-horizon">{a.code}</span>
                    {a.name}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate">Travel available across Western Canada.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

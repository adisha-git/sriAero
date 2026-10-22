import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { airports, nav, site } from "@/config/site";
import { serviceGroups } from "@/content/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="blueprint relative overflow-hidden text-cloud">
      {/* Runway centreline */}
      <div aria-hidden="true" className="flex h-1 gap-6 overflow-hidden opacity-60">
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="h-full w-10 shrink-0 bg-aluminium/40" />
        ))}
      </div>

      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-5">
          <Logo variant="white" height={44} />
          <p className="max-w-xs text-mist">
            Mobile aircraft detailing for private, corporate and commercial aircraft. We come to your hangar or FBO.
          </p>
          <p className="label-mono text-sky">Calgary, Alberta · Serving Western Canada</p>
          <SocialIcons />
        </div>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="label-mono mb-4 text-aluminium">
            Services
          </h2>
          <ul className="space-y-2.5">
            {serviceGroups.map((g) => (
              <li key={g.id}>
                <Link href={`/services/#${g.id}`} className="text-mist transition-colors hover:text-sky">
                  {g.title}
                </Link>
              </li>
            ))}
            {nav
              .filter((n) => n.href !== "/services/")
              .map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-mist transition-colors hover:text-sky">
                    {n.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-airports">
          <h2 id="footer-airports" className="label-mono mb-4 text-aluminium">
            Airports
          </h2>
          <ul className="space-y-2.5">
            {airports.map((a) => (
              <li key={a.code}>
                <Link href="/#service-area" className="group flex gap-3 text-mist transition-colors hover:text-sky">
                  <span className="font-mono text-sm text-sky/80 group-hover:text-sky">{a.code}</span>
                  {a.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="label-mono mb-4 text-aluminium">Contact</h2>
          <ul className="space-y-3 text-mist">
            <li>
              <a href={site.contact.phoneHref} className="flex items-center gap-3 hover:text-sky">
                <Phone aria-hidden="true" className="size-4 text-sky" />
                <span className="font-mono">{site.contact.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 break-all hover:text-sky">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-sky" />
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-sky" />
              <span>
                Mobile service from {site.address.city}, {site.address.regionName}
              </span>
            </li>
          </ul>
          <Link
            href="/contact/"
            className="shine mt-6 inline-flex min-h-11 items-center rounded-full bg-amber px-5 font-display text-sm font-semibold text-navy hover:bg-amber-300"
          >
            <span className="relative z-[2]">Request a Quote</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-aluminium/10">
        <div className="container-x flex flex-col gap-3 py-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy/" className="hover:text-sky">
              Privacy Policy
            </Link>
            <span className="label-mono text-sky/70" aria-hidden="true">
              CYYC · 51.11N 114.02W
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

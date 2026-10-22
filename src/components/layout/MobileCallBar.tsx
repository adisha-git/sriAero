import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/config/site";

/** Fixed tap-to-call and quote bar on small screens. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-aluminium/15 bg-navy/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={site.contact.phoneHref}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cloud/30 font-display font-semibold text-cloud"
        >
          <Phone aria-hidden="true" className="size-4" /> Call now
        </a>
        <Link
          href="/contact/"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-amber font-display font-semibold text-navy"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}

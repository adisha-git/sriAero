import { BadgeCheck, MapPin, ShieldCheck, Truck } from "lucide-react";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { trustItems } from "@/config/site";

const icons = [Truck, BadgeCheck, ShieldCheck, MapPin];

export function TrustStrip() {
  return (
    <section aria-label="Why operators choose SriAero" className="border-y border-aluminium/60 bg-white">
      <ul className="container-x grid grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li
              key={item.label}
              className="flex items-center gap-4 border-aluminium/60 py-6 not-last:border-r max-lg:nth-2:border-r-0 max-lg:nth-[-n+2]:border-b lg:px-6 lg:first:pl-0"
            >
              <Icon aria-hidden="true" className="ml-4 size-6 shrink-0 text-horizon lg:ml-0" strokeWidth={1.6} />
              <div>
                <p className="label-mono text-[0.68rem] text-slate">{item.readout}</p>
                <p className="flex flex-wrap items-center gap-2 font-display font-medium text-navy">
                  {item.label}
                  {item.placeholder && <PlaceholderBadge />}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

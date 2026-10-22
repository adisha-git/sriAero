import { Preloader } from "@/components/layout/Preloader";
import { AircraftTypes } from "@/components/home/AircraftTypes";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { NoseToTail } from "@/components/home/NoseToTail";
import { ProcessFlightPath } from "@/components/home/ProcessFlightPath";
import { ServiceAreaMap } from "@/components/home/ServiceAreaMap";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { StatsCounters } from "@/components/home/StatsCounters";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Aircraft Detailing Calgary | Mobile Jet Detailing in Alberta",
    description:
      "SriAero is a mobile aircraft detailing company in Calgary. Exterior wash, brightwork, paint correction, ceramic coatings and cabin detailing at your hangar across Southern Alberta.",
    path: "/",
  }),
  title: { absolute: "Aircraft Detailing Calgary | Mobile Jet Detailing in Alberta | SriAero" },
};

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Hero />
      <TrustStrip />
      <ServicesOverview />
      <StatsCounters />
      <BeforeAfter />
      <NoseToTail />
      <AircraftTypes />
      <ProcessFlightPath />
      <Testimonials />
      <ServiceAreaMap />
      <FinalCta />
    </>
  );
}

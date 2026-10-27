import { Gallery } from "@/components/Gallery";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Aircraft Detailing Gallery: Jets, Turboprops & Helicopters",
  description:
    "Exterior, interior and brightwork aircraft detailing in Calgary and Southern Alberta: polished spinners, leading edges, cabins and paint finishes.",
  path: "/gallery/",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        label="Gallery · Ramp & hangar"
        title={
          <>
            The finish, <span className="text-sky">up close.</span>
          </>
        }
        intro="Exterior finishes, cabins and brightwork. Filter by discipline, or open the before-and-after set to compare."
      />
      <section aria-label="Photo gallery" className="bg-cloud py-16 sm:py-24">
        <div className="container-x">
          <Gallery />
        </div>
      </section>
      <FinalCta />
    </>
  );
}

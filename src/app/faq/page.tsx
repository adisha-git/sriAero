import { Plus } from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { faqs } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Aircraft Detailing FAQ: Calgary & Southern Alberta",
  description:
    "Answers on mobile aircraft detailing in Calgary: airports served, timing, product safety, detailing frequency, wax vs ceramic coating, winter work and pricing.",
  path: "/faq/",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        label="FAQ · Pre-flight briefing"
        title={
          <>
            Questions, <span className="text-sky">answered straight.</span>
          </>
        }
        intro="The things owners and operators ask us most. If yours isn't here, call or send a note and we'll answer it."
      />
      <section aria-label="Frequently asked questions" className="bg-cloud py-20 sm:py-28">
        <div className="container-x max-w-4xl">
          <div className="divide-y divide-aluminium overflow-hidden rounded-2xl border border-aluminium bg-white">
            {faqs.map((f, i) => (
              <details key={f.q} className="group" name="faq">
                <summary className="flex cursor-pointer list-none items-center gap-5 p-6 transition-colors hover:bg-cloud sm:p-7 [&::-webkit-details-marker]:hidden">
                  <span className="label-mono w-8 shrink-0 text-horizon">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="flex-1 font-display text-lg font-medium text-navy sm:text-xl">{f.q}</h2>
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-aluminium text-horizon transition-transform duration-300 group-open:rotate-45 group-open:border-amber group-open:bg-amber group-open:text-navy">
                    <Plus aria-hidden="true" className="size-4" />
                  </span>
                </summary>
                <div className="px-6 pb-7 pl-[4.75rem] text-slate sm:px-7 sm:pl-[5.25rem]">
                  <p className="max-w-2xl">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <FinalCta title="Still have a question?" text="Call, email or send the quote form. A real person who knows aircraft will get back to you." />
      <JsonLd data={faqSchema} />
    </>
  );
}

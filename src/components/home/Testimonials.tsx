"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { testimonials } from "@/config/site";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  if (!count) return null;

  return (
    <section aria-labelledby="testimonials-title" className="bg-cloud py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="06">PIREPs · Client reports</SectionLabel>
            <h2 id="testimonials-title" className="mt-4 text-4xl font-medium text-navy sm:text-5xl">
              What operators say
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              aria-controls="testimonial-track"
              className="inline-flex size-12 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-horizon hover:text-horizon"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              aria-controls="testimonial-track"
              className="inline-flex size-12 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-horizon hover:text-horizon"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        <div
          className="mt-12 overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div
            id="testimonial-track"
            className="flex transition-transform duration-700 ease-[var(--ease-flight)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
            aria-live="polite"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="w-full shrink-0 px-px"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
                inert={i !== index}
              >
                <figure className="grid gap-8 rounded-2xl border border-aluminium bg-white p-8 sm:p-12 lg:grid-cols-[auto_1fr]">
                  <Quote aria-hidden="true" className="size-10 text-sky" strokeWidth={1.4} />
                  <div>
                    <h3 className="label-mono mb-4 text-horizon">{t.title}</h3>
                    <blockquote className="font-display text-2xl leading-snug text-navy sm:text-3xl">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-aluminium pt-6">
                      <span className="font-semibold text-navy">{t.name}</span>
                      {t.role && <span className="text-slate">{t.role}</span>}
                      {t.aircraft && <span className="label-mono text-horizon">{t.aircraft}</span>}
                    </figcaption>
                  </div>
                </figure>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              className="flex size-8 items-center justify-center"
            >
              <span className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-horizon" : "w-3 bg-aluminium"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Picture } from "@/components/ui/Picture";
import { gallery, galleryCategories, type GalleryCategory } from "@/content/gallery";

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const items = gallery
    .map((item, index) => ({ ...item, index }))
    .filter((i) => (filter === "all" ? i.category !== "before-after" : i.category === filter));

  const current = open === null ? null : items[open];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const step = (dir: number) => setOpen((o) => (o === null ? o : (o + dir + items.length) % items.length));

  return (
    <>
      <div role="group" aria-label="Filter gallery" className="flex flex-wrap gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
            className="label-mono min-h-11 rounded-full border px-5 transition-colors aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-cloud border-aluminium bg-white text-navy hover:border-horizon"
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {items.length} photos
      </p>

      <ul className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <li key={`${item.name}-${item.category}`} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setOpen(i);
              }}
              className="group relative block w-full overflow-hidden rounded-2xl bg-navy text-left"
              aria-label={`Open ${item.caption}`}
            >
              <Picture
                name={item.name}
                alt={item.alt}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className={`h-auto w-full transition-transform duration-700 ease-[var(--ease-flight)] group-hover:scale-[1.03] ${
                  item.category === "before-after" ? "aspect-[16/10] object-cover" : ""
                }`}
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-navy/90 to-transparent p-4 pt-12">
                <span className="label-mono text-cloud">{item.caption}</span>
                <Maximize2 aria-hidden="true" className="size-4 shrink-0 text-sky opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
              {item.category === "before-after" && (
                <span className="label-mono absolute top-3 left-3 rounded-full bg-amber px-3 py-1 text-[0.65rem] text-navy">Before / After</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={current ? current.caption : "Photo viewer"}
        onClose={() => {
          setOpen(null);
          lastTrigger.current?.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" && current?.category !== "before-after") step(1);
          if (e.key === "ArrowLeft" && current?.category !== "before-after") step(-1);
        }}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        className="m-auto max-h-[96dvh] w-[min(92vw,1200px)] max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-navy/90 backdrop:backdrop-blur-sm"
      >
        {current && (
          <figure className="flex flex-col">
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="font-mono text-sm text-mist">
                {(open ?? 0) + 1} / {items.length}
              </span>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="inline-flex size-11 items-center justify-center rounded-full bg-cloud/10 text-cloud hover:bg-cloud/20">
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className="inline-flex size-11 items-center justify-center rounded-full bg-cloud/10 text-cloud hover:bg-cloud/20">
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
                <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="inline-flex size-11 items-center justify-center rounded-full bg-amber text-navy hover:bg-amber-300">
                  <X aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
            {current.category === "before-after" ? (
              <div className="mx-auto w-full rounded-2xl bg-white p-3" style={{ maxWidth: "calc(72dvh * 1.6)" }}>
                <BeforeAfterSlider after={current.name} before={current.before} alt={current.alt} sizes="92vw" />
              </div>
            ) : (
              <Picture
                name={current.name}
                alt={current.alt}
                sizes="92vw"
                className="mx-auto max-h-[78dvh] w-auto rounded-2xl object-contain"
              />
            )}
            <figcaption className="label-mono mt-3 text-center text-cloud">{current.caption}</figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}

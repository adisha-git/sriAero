/**
 * Gallery items. The current photos are licensed stock imagery used for layout.
 * PLACEHOLDER – replace with photos of your own work (drop originals in /images-src,
 * run `npm run images`, then list them here).
 */
export type GalleryCategory = "exterior" | "interior" | "brightwork" | "before-after";

export type GalleryItem = {
  name: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  /** For before-after items: a real "before" photo. Omit to show a simulated comparison. */
  before?: string;
};

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "brightwork", label: "Brightwork" },
  { id: "before-after", label: "Before & After" },
];

export const gallery: GalleryItem[] = [
  { name: "jet-golden-hour", category: "exterior", caption: "Business jet · Ramp at dusk", alt: "White business jet on the ramp at sunset with the sun low beneath its wing" },
  { name: "cabin-jet-leather", category: "interior", caption: "Cabin · Leather & veneer", alt: "Business jet cabin with cream leather club seats and a gloss wood table" },
  { name: "turboprop-spinner", category: "brightwork", caption: "Turboprop · Polished spinner", alt: "Mirror-polished propeller spinner and blades on a single-engine turboprop" },
  { name: "jet-g550", category: "exterior", caption: "Large-cabin jet · Exterior", alt: "Long-range business jet parked on the ramp under a clear blue sky" },
  { name: "cockpit-panel", category: "interior", caption: "Flight deck · Instrument panel", alt: "Close-up of round analogue gauges on an aircraft instrument panel" },
  { name: "propeller-vintage", category: "brightwork", caption: "Radial engine · Polished prop", alt: "Polished propeller hub and blades in front of a red radial engine cowling inside a hangar" },
  { name: "piston-tarmac", category: "exterior", caption: "Piston · Ramp", alt: "Single-engine piston aircraft with a yellow spinner, propeller turning, on a ramp with hills behind" },
  { name: "fuselage-aluminium", category: "brightwork", caption: "Bare-metal fuselage", alt: "Polished aluminium fuselage panels and cabin windows of a vintage airliner" },
  { name: "helicopter-helipad", category: "exterior", caption: "Helicopter · Helipad", alt: "Light helicopter parked on a helipad with yellow markings" },
  { name: "cabin-cessna", category: "interior", caption: "Light aircraft · Cabin", alt: "Interior of a light aircraft with beige leather seats and side windows" },
  { name: "warbird-night", category: "brightwork", caption: "Polished warbird · Night ramp", alt: "Polished bare-metal vintage fighter aircraft parked on the ramp at night" },
  { name: "floatplane-lake", category: "exterior", caption: "Float plane · Lake", alt: "Red and white float plane on a calm lake lined with autumn trees" },
  { name: "propeller-black", category: "brightwork", caption: "Propeller · Hangar", alt: "Black propeller blades and polished spinner in front of a radial engine" },
  { name: "jet-tarmac-blue", category: "exterior", caption: "Light jet · Gloss finish", alt: "Light jet with a glossy dark paint finish on the ramp at dusk" },
  { name: "fuselage-aluminium", category: "before-after", caption: "Bare-metal correction", alt: "polished aluminium fuselage panels" },
  { name: "turboprop-spinner", category: "before-after", caption: "Spinner restoration", alt: "propeller spinner on a turboprop" },
  { name: "jet-g550", category: "before-after", caption: "Paint revitalisation", alt: "business jet paint finish" },
];

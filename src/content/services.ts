import type { IconName } from "@/components/ui/Icon";

export type Service = {
  id: string;
  name: string;
  icon: IconName;
  description: string;
  includes: string[];
};

export type ServiceGroup = {
  id: "exterior" | "interior" | "protection" | "programs";
  index: string;
  title: string;
  heading: string;
  intro: string;
  image: string;
  imageAlt: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "exterior",
    index: "01",
    title: "Exterior",
    heading: "Exterior care, from radome to tail cone",
    intro:
      "Every exterior detail starts with a walkaround and ends with one. In between, we work panel by panel with methods and chemistry chosen for aircraft paint, aluminium, composites and acrylic, never automotive shortcuts.",
    image: "jet-g550",
    imageAlt: "A white long-range business jet parked on the ramp under a clear blue sky",
    services: [
      {
        id: "wet-wash",
        name: "Exterior wet wash",
        icon: "droplets",
        description:
          "A full hand wash on the ramp or in a wash bay, using pH-balanced aviation soaps and controlled rinse water kept away from probes, vents and seals.",
        includes: [
          "Pre-wash walkaround and photo record of existing condition",
          "Pitot-static ports, AOA vanes and vents masked",
          "Two-bucket hand wash with soft mitts, top to bottom",
          "Low-pressure rinse and blown-out panel seams",
          "Spot-free dry and final walkaround",
        ],
      },
      {
        id: "dry-wash",
        name: "Waterless dry wash",
        icon: "leaf",
        description:
          "Our standard method in the hangar. An encapsulating dry-wash product lifts dirt and leaves a protective film, with no runoff on the hangar floor and no water near avionics bays.",
        includes: [
          "No water, no runoff, no drain requirements",
          "Safe inside heated hangars all winter",
          "Light protective film left on painted surfaces",
          "Can run alongside scheduled maintenance in the same hangar",
        ],
      },
      {
        id: "wax-sealant",
        name: "Wax & sealant",
        icon: "sparkles",
        description:
          "Hand-applied carnauba or synthetic sealant for depth, gloss and a slicker surface that sheds bugs, exhaust and grime between washes.",
        includes: [
          "Surface prepared and decontaminated first",
          "Product chosen for paint system and hangar time",
          "Hand application and buff-off, panel by panel",
          "Sealing of painted leading-edge areas where approved",
        ],
      },
      {
        id: "brightwork",
        name: "Brightwork polishing",
        icon: "sun",
        description:
          "Leading edges, spinners, cowls and engine inlets brought back from dull oxidation to a clear, mirror finish using aluminium-specific compounds.",
        includes: [
          "Leading edges and wing root fairings",
          "Propeller spinners and hubs",
          "Engine inlet lips and nacelle trim",
          "Polished cowls and bare-metal panels",
          "Optional brightwork sealing to extend the finish",
        ],
      },
      {
        id: "paint-correction",
        name: "Paint correction & revitalisation",
        icon: "layers",
        description:
          "Machine correction to remove oxidation, swirl marks and water spotting from aircraft paint, with film thickness checked so we take off only what is needed.",
        includes: [
          "Paint depth readings before and after",
          "Test spot to set the least aggressive method that works",
          "Single- or multi-stage machine polishing",
          "Masking of decals, registration marks and seams",
          "Finished with sealant or ceramic coating",
        ],
      },
      {
        id: "windows",
        name: "Window & acrylic restoration",
        icon: "scan",
        description:
          "Cleaning, polishing and protection for windscreens and cabin windows, using acrylic- and polycarbonate-safe products only. Never ammonia, never paper towel.",
        includes: [
          "Inspection for crazing, scratches and delamination",
          "Approved acrylic cleaner and microfibre only",
          "Fine-scratch removal and polishing where suitable",
          "Anti-static protectant to resist dust",
        ],
      },
      {
        id: "deice-boots",
        name: "De-ice boot cleaning & conditioning",
        icon: "snowflake",
        description:
          "Pneumatic de-ice boots cleaned and treated with conditioner suited to the boot manufacturer's guidance, to keep the rubber supple and the surface even.",
        includes: [
          "Gentle cleaning of wing, tail and propeller boots",
          "Removal of exhaust film and bug residue",
          "Boot conditioner applied per manufacturer guidance",
          "Condition noted for your maintenance provider",
        ],
      },
      {
        id: "belly",
        name: "Belly degreasing & exhaust stains",
        icon: "flame",
        description:
          "The belly collects oil, hydraulic film and exhaust soot. We degrease it thoroughly with aviation-safe degreasers and lift baked-on exhaust staining aft of the stacks.",
        includes: [
          "Belly and lower fuselage degreased",
          "Exhaust trail and soot removal",
          "Drain masts and antennas cleaned around, not over",
          "Protective sealant on cleaned paint",
        ],
      },
      {
        id: "gear",
        name: "Landing gear & wheel well cleaning",
        icon: "circle-dot",
        description:
          "Gear legs, wheels and wheel wells cleaned of grease, brake dust and runway grime, without forcing product into bearings, sensors or harnesses.",
        includes: [
          "Wheels, hubs and brake area cleaned",
          "Gear legs and doors degreased",
          "Wheel wells wiped and detailed by hand",
          "Tires dressed with a non-sling, aviation-safe product",
        ],
      },
    ],
  },
  {
    id: "interior",
    index: "02",
    title: "Interior",
    heading: "Cabin and flight deck, held to a flight-department standard",
    intro:
      "The cabin is where your passengers judge the aircraft. We detail it the way a completion centre would: careful with every finish, methodical about every compartment, and safe for the materials certified into it.",
    image: "cabin-jet-leather",
    imageAlt: "Business jet cabin with cream leather club seats, a polished wood table and oval windows",
    services: [
      {
        id: "full-cabin",
        name: "Full cabin detail",
        icon: "armchair",
        description:
          "A top-to-bottom cabin detail: headliner, sidewalls, seats, tables, carpets, cabinetry and every cupholder in between.",
        includes: [
          "Dry vacuum with HEPA filtration throughout",
          "Seat tracks, rails and side ledges cleaned",
          "Headliner and sidewall panels wiped down",
          "Window shades and reveals detailed",
          "Final cabin walkthrough before handover",
        ],
      },
      {
        id: "extraction",
        name: "Carpet & upholstery extraction",
        icon: "wind",
        description:
          "Low-moisture hot-water extraction that lifts embedded soil from carpet and fabric seating while keeping the cabin dry for quick return to service.",
        includes: [
          "Pre-treatment of traffic lanes and spots",
          "Low-moisture extraction to protect subfloors",
          "Air movers to speed drying",
          "Fabric protector on request",
        ],
      },
      {
        id: "leather",
        name: "Leather cleaning & conditioning",
        icon: "droplet",
        description:
          "Aircraft leather is usually treated for flammability and finished with a protective topcoat. We clean and condition with products that respect both.",
        includes: [
          "Leather type and finish assessed first",
          "Gentle agitation with soft brushes",
          "pH-neutral cleaner, then conditioner",
          "Matte, factory-look finish, never greasy",
        ],
      },
      {
        id: "leather-repair",
        name: "Leather repair & re-dye",
        icon: "pen-tool",
        description:
          "Scuffs, colour loss and wear on bolsters and armrests repaired and re-coloured to match, extending the life of the original upholstery.",
        includes: [
          "Colour matched to the existing hide",
          "Scuff, crease and wear repair",
          "Re-dye and protective topcoat",
          "Referral to an approved upholstery shop where needed",
        ],
      },
      {
        id: "veneer",
        name: "Wood veneer & trim polishing",
        icon: "table",
        description:
          "High-gloss veneers, plated hardware and trim cleaned and polished with non-abrasive products, removing fingerprints and haze without marking the lacquer.",
        includes: [
          "Veneer tables, cabinets and side ledges",
          "Plated and brushed metal hardware",
          "Placards cleaned around, not over",
        ],
      },
      {
        id: "stains",
        name: "Stain removal",
        icon: "eraser",
        description:
          "Coffee, wine, ink and hydraulic fluid. We identify the stain and the fibre first, then treat it with the least aggressive method that works.",
        includes: [
          "Spot testing on hidden areas",
          "Targeted treatment by stain type",
          "Honest advice if a stain is permanent",
        ],
      },
      {
        id: "cockpit",
        name: "Cockpit & avionics-safe cleaning",
        icon: "gauge",
        description:
          "Glass displays, panels and controls cleaned with avionics-safe products applied to the cloth, never sprayed. Switch positions are left exactly as we found them.",
        includes: [
          "Displays and glareshield cleaned with approved products",
          "Yokes, sidesticks and throttle quadrant wiped",
          "Pilot seats, rails and footwells detailed",
          "Switch positions photographed and left untouched",
        ],
      },
      {
        id: "lav-galley",
        name: "Lavatory & galley sanitation",
        icon: "sparkle",
        description:
          "Lavatory and galley surfaces cleaned and sanitised with products compatible with aircraft finishes and potable-water systems.",
        includes: [
          "Lavatory surfaces, fixtures and mirrors",
          "Galley counters, inserts and drawers",
          "Waste bins and touchpoints sanitised",
        ],
      },
      {
        id: "odour",
        name: "Odour treatment",
        icon: "wind",
        description:
          "Smoke, pet and moisture odours treated at the source, followed by a neutral finish. No heavy fragrances left behind in the cabin.",
        includes: [
          "Source identification and removal",
          "Enzyme or oxidising treatment as appropriate",
          "Cabin air and soft goods refreshed",
        ],
      },
    ],
  },
  {
    id: "protection",
    index: "03",
    title: "Protection & Restoration",
    heading: "Protection that holds up to Alberta weather",
    intro:
      "Hail, UV at altitude, chinooks and road salt drifting off the highway all wear on a finish. Protection makes every wash easier and keeps the paint, metal and acrylic looking the way you paid for.",
    image: "turboprop-spinner",
    imageAlt: "Polished chrome propeller spinner and blades of a single-engine turboprop on the ramp",
    services: [
      {
        id: "ceramic",
        name: "Ceramic coatings",
        icon: "shield",
        description:
          "Aviation-specific ceramic coatings bond to the paint to give long-term gloss, UV resistance and a hydrophobic surface that sheds exhaust, bugs and grime.",
        includes: [
          "Full decontamination and paint correction first",
          "Panel wipe to ensure a clean bond",
          "Coating applied and levelled by hand",
          "Cure time planned around your schedule",
          "Maintenance wash guidance for your crew",
        ],
      },
      {
        id: "polymer",
        name: "Polymer sealants",
        icon: "shield-check",
        description:
          "A durable synthetic barrier for aircraft that need protection fast. Good for operators who can't give up the cure time a ceramic coating needs.",
        includes: [
          "Applied after wash and decontamination",
          "Months of protection depending on use",
          "Can be layered for added durability",
        ],
      },
      {
        id: "brightwork-sealing",
        name: "Brightwork sealing",
        icon: "gem",
        description:
          "After polishing, bare metal is sealed to slow re-oxidation, so leading edges and spinners stay bright longer between visits.",
        includes: [
          "Applied directly after brightwork polishing",
          "Slows oxidation and water spotting",
          "Easier maintenance washes",
        ],
      },
    ],
  },
  {
    id: "programs",
    index: "04",
    title: "Programs",
    heading: "Recurring care, planned like maintenance",
    intro:
      "Most aircraft look their best when care is scheduled rather than reactive. Our programs set a standard, a frequency and a single point of contact, so your aircraft is always ready to be seen.",
    image: "hangar-silhouette",
    imageAlt: "A business jet silhouetted in a dark hangar under rows of overhead lights",
    services: [
      {
        id: "maintenance-plans",
        name: "Recurring maintenance plans",
        icon: "calendar",
        description:
          "Monthly or quarterly visits with a set scope, so the finish never drifts far from its best. Pricing is fixed per visit and agreed in advance.",
        includes: [
          "Monthly or quarterly schedule",
          "Written scope per visit",
          "Condition log kept for each aircraft",
          "Priority booking for ad-hoc requests",
        ],
      },
      {
        id: "fleet",
        name: "Fleet programs",
        icon: "plane",
        description:
          "For operators, flight schools and charter companies: a consistent standard across every tail, scheduled around your flying, with one invoice and one contact.",
        includes: [
          "Per-tail standard and checklist",
          "Scheduling around operations and maintenance",
          "Consolidated monthly invoicing",
          "Volume pricing",
        ],
      },
      {
        id: "pre-sale",
        name: "Pre-sale & broker presentation",
        icon: "badge-check",
        description:
          "Prepare an aircraft for listing photos, buyer inspections and delivery. First impressions show up on the walkaround, in the photos and in the offer.",
        includes: [
          "Full exterior correction and protection",
          "Deep cabin and flight-deck detail",
          "Brightwork and window restoration",
          "Ready-for-photos finish and walkaround",
        ],
      },
      {
        id: "seasonal",
        name: "Seasonal prep",
        icon: "snowflake",
        description:
          "Calgary's climate is hard on a finish. Spring de-winterising removes de-icing residue, sand and grime; pre-winter protection seals the surface before the cold sets in.",
        includes: [
          "Spring: de-icing fluid and grime removal, belly degrease, inspection photos",
          "Spring: wash, decontaminate and refresh protection",
          "Fall: sealant or coating top-up before winter",
          "Fall: brightwork sealing and boot conditioning",
        ],
      },
    ],
  },
];

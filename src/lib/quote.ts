// Shared by the quote form (client) and /api/contact (server), so both agree on options and limits.

export const serviceOptions = [
  "Exterior wet wash",
  "Waterless dry wash",
  "Brightwork polishing",
  "Paint correction",
  "Ceramic coating / sealant",
  "Window & acrylic restoration",
  "Full cabin detail",
  "Leather care or repair",
  "De-ice boots / belly / gear",
  "Recurring plan",
  "Fleet program",
  "Pre-sale / seasonal prep",
];

export const maxLengths = {
  name: 100,
  company: 120,
  phone: 30,
  email: 254,
  aircraft: 120,
  airportOther: 100,
  message: 3000,
} as const;

export const emailPattern = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/;

/** Name of the hidden honeypot field. Real visitors never fill it in. */
export const honeypotField = "_gotcha";

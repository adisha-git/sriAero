// Generates every SriAero brand asset from one geometry definition.
// Text is converted to outlines so the SVGs render identically everywhere.
//
// Usage: npm run brand
// Output: /public/brand/* and the Next.js icon files in /src/app/

import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const BRAND = "public/brand";
const APP = "src/app";
fs.mkdirSync(BRAND, { recursive: true });

const C = {
  navy: "#0B1B2B",
  horizon: "#1E4D7B",
  sky: "#8EC5E8",
  aluminium: "#C9D1D9",
  amber: "#E8A33D",
  cloud: "#F5F7FA",
};

const font = (pkg, file) =>
  opentype.parse(
    fs.readFileSync(path.join("node_modules/@fontsource", pkg, "files", file)).buffer,
  );
const grotesk600 = font("space-grotesk", "space-grotesk-latin-600-normal.woff");
const grotesk300 = font("space-grotesk", "space-grotesk-latin-300-normal.woff");
const grotesk500 = font("space-grotesk", "space-grotesk-latin-500-normal.woff");
const mono500 = font("jetbrains-mono", "jetbrains-mono-latin-500-normal.woff");

/* ------------------------------------------------------------------ */
/* Icon: two swept slivers form a forward chevron (a delta wing seen   */
/* from above, nose to the right) with a four-point glint on the       */
/* upper surface. Drawn on a 64×64 grid.                               */
/* ------------------------------------------------------------------ */
const ICON_UPPER = "M60 29.5 L5 7 L23 29.5 Z";
const ICON_LOWER = "M60 34.5 L5 57 L23 34.5 Z";
const GLINT = "M41 9 L42.6 14.4 L48 16 L42.6 17.6 L41 23 L39.4 17.6 L34 16 L39.4 14.4 Z";

function iconGroup({ upper, lower, glint, id }) {
  return `
  <defs>
    <linearGradient id="${id}" x1="5" y1="7" x2="60" y2="30" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${upper[0]}"/>
      <stop offset="1" stop-color="${upper[1]}"/>
    </linearGradient>
  </defs>
  <path d="${ICON_UPPER}" fill="url(#${id})"/>
  <path d="${ICON_LOWER}" fill="${lower}"/>
  <path d="${GLINT}" fill="${glint}"/>`;
}

const VARIANTS = {
  colour: { upper: [C.sky, C.horizon], lower: C.horizon, glint: C.amber, sri: C.navy, aero: C.horizon },
  white: { upper: [C.cloud, C.sky], lower: C.sky, glint: C.amber, sri: C.cloud, aero: C.sky },
};

// opentype.js's toPathData() occasionally emits "NaN" when rounding, so serialise ourselves.
const n = (v) => (Math.round(v * 100) / 100).toString();
function toD(commands) {
  return commands
    .map((c) => {
      if (c.type === "M" || c.type === "L") return `${c.type}${n(c.x)} ${n(c.y)}`;
      if (c.type === "Q") return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
      if (c.type === "C") return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
      return "Z";
    })
    .join("");
}

// Lays glyphs out one by one (no kerning or substitutions; fine at logo sizes).
function textPath(f, text, x, baseline, size, fill) {
  const scale = size / f.unitsPerEm;
  let cursor = x;
  const parts = [];
  for (const ch of text) {
    const glyph = f.charToGlyph(ch);
    parts.push(toD(glyph.getPath(cursor, baseline, size).commands));
    cursor += glyph.advanceWidth * scale;
  }
  return { d: parts.join(""), width: cursor - x, fill };
}

function logoSVG(variant) {
  const v = VARIANTS[variant];
  const size = 44;
  const baseline = 47;
  const x0 = 76;
  const sri = textPath(grotesk600, "Sri", x0, baseline, size, v.sri);
  const aero = textPath(grotesk300, "Aero", x0 + sri.width + 1, baseline, size, v.aero);
  const width = Math.ceil(x0 + sri.width + 1 + aero.width + 4);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 64" width="${width}" height="64" role="img" aria-label="SriAero">
  <title>SriAero</title>${iconGroup({ ...v, id: `sa-${variant}` })}
  <path d="${sri.d}" fill="${sri.fill}"/>
  <path d="${aero.d}" fill="${aero.fill}"/>
</svg>
`;
}

function iconSVG(variant = "colour", { background } = {}) {
  const v = VARIANTS[variant];
  const bg = background
    ? `<rect width="64" height="64" rx="14" fill="${background}"/>`
    : "";
  // When placed on a tile, scale the mark down slightly so it has breathing room.
  const inner = background
    ? `<g transform="translate(8 8) scale(0.75)">${iconGroup({ ...v, id: `sa-i-${variant}` })}</g>`
    : iconGroup({ ...v, id: `sa-i-${variant}` });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">${bg}${inner}
</svg>
`;
}

/* ------------------------------------------------------------------ */
/* Open Graph image, 1200×630                                         */
/* ------------------------------------------------------------------ */
function ogSVG() {
  const grid = [];
  for (let x = 0; x <= 1200; x += 30)
    grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="${C.sky}" stroke-opacity="${x % 150 === 0 ? 0.12 : 0.05}"/>`);
  for (let y = 0; y <= 630; y += 30)
    grid.push(`<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="${C.sky}" stroke-opacity="${y % 150 === 0 ? 0.12 : 0.05}"/>`);

  const label = textPath(mono500, "CYYC · CALGARY, ALBERTA · MOBILE AIRCRAFT DETAILING", 80, 132, 20, C.sky);
  const h1a = textPath(grotesk500, "Aviation-grade detailing,", 80, 300, 64, C.cloud);
  const h1b = textPath(grotesk500, "delivered to your hangar.", 80, 378, 64, C.cloud);
  const sub = textPath(grotesk300, "Private, corporate and commercial aircraft · Southern Alberta", 80, 438, 28, C.aluminium);

  const v = VARIANTS.white;
  const sri = textPath(grotesk600, "Sri", 172, 560, 52, v.sri);
  const aero = textPath(grotesk300, "Aero", 172 + sri.width + 1, 560, 52, v.aero);

  // Runway edge lights along the bottom edge.
  const lights = [];
  for (let i = 0; i < 14; i++)
    lights.push(`<circle cx="${700 + i * 36}" cy="560" r="4" fill="${C.amber}" fill-opacity="${0.35 + i * 0.045}"/>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.9">
      <stop offset="0" stop-color="${C.horizon}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${C.navy}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${C.navy}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  ${grid.join("")}
  <rect x="80" y="160" width="64" height="3" fill="${C.amber}"/>
  <path d="${label.d}" fill="${label.fill}"/>
  <path d="${h1a.d}" fill="${h1a.fill}"/>
  <path d="${h1b.d}" fill="${h1b.fill}"/>
  <path d="${sub.d}" fill="${sub.fill}"/>
  <g transform="translate(80 504) scale(1.2)">${iconGroup({ ...v, id: "sa-og" })}</g>
  <path d="${sri.d}" fill="${sri.fill}"/>
  <path d="${aero.d}" fill="${aero.fill}"/>
  ${lights.join("")}
</svg>`;
}

/* ------------------------------------------------------------------ */
const write = (file, data) => {
  fs.writeFileSync(file, data);
  console.log(`✓ ${file}`);
};

write(`${BRAND}/logo.svg`, logoSVG("colour"));
write(`${BRAND}/logo-white.svg`, logoSVG("white"));
write(`${BRAND}/icon.svg`, iconSVG("colour"));
write(`${BRAND}/icon-white.svg`, iconSVG("white"));

// Favicon set: the mark on a navy tile so it reads on light and dark browser chrome.
const tile = iconSVG("white", { background: C.navy });
write(`${BRAND}/favicon.svg`, tile);
write(`${APP}/icon.svg`, tile);

const png = (svg, size) => sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toBuffer();
const apple = await sharp(Buffer.from(iconSVG("white", { background: C.navy }).replace('rx="14"', 'rx="0"')), { density: 600 })
  .resize(180, 180)
  .png()
  .toBuffer();
write(`${BRAND}/apple-touch-icon.png`, apple);
write(`${APP}/apple-icon.png`, apple);

const ico = await pngToIco([await png(tile, 16), await png(tile, 32), await png(tile, 48)]);
write(`${BRAND}/favicon.ico`, ico);
write(`${APP}/favicon.ico`, ico);
write(`${BRAND}/icon-512.png`, await png(tile, 512));

const og = await sharp(Buffer.from(ogSVG())).png({ compressionLevel: 9 }).toBuffer();
write(`${BRAND}/og-image.png`, og);

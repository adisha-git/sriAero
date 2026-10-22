// Converts originals in /images-src into responsive WebP files in /public/images
// and writes their dimensions to src/config/image-meta.json (used for width/height
// attributes so images never cause layout shift).
//
// Usage: npm run images
// Add a new photo: drop a .jpg/.png into /images-src, run the script, then
// reference it by file name (without extension) through the <Picture> component.

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "images-src";
const OUT = "public/images";
const META = "src/config/image-meta.json";
const WIDTHS = [640, 1280, 1920];

// Optional per-image crops, as fractions of the original (left, top, width, height).
const CROPS = {
  // Removes a bystander's silhouette from the right edge of the frame.
  "helicopter-helipad": { left: 0, top: 0.3, width: 0.66, height: 0.5 },
};

fs.mkdirSync(OUT, { recursive: true });
const meta = {};

for (const file of fs.readdirSync(SRC).sort()) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, "");
  let base = sharp(path.join(SRC, file)).rotate();
  const info = await base.metadata();
  let w = info.width;
  let h = info.height;

  const crop = CROPS[name];
  if (crop) {
    const region = {
      left: Math.round(crop.left * w),
      top: Math.round(crop.top * h),
      width: Math.round(crop.width * w),
      height: Math.round(crop.height * h),
    };
    base = sharp(await base.extract(region).toBuffer());
    w = region.width;
    h = region.height;
  }

  const buffer = await base.toBuffer();
  for (const target of WIDTHS) {
    const width = Math.min(target, w);
    await sharp(buffer)
      .resize({ width })
      .webp({ quality: target >= 1920 ? 72 : 76, effort: 5 })
      .toFile(path.join(OUT, `${name}-${target}.webp`));
  }
  meta[name] = { width: w, height: h };
  console.log(`✓ ${name} (${w}×${h})`);
}

fs.writeFileSync(META, JSON.stringify(meta, null, 2) + "\n");
console.log(`Wrote ${META}`);

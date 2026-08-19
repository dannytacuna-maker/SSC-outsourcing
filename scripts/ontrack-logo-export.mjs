// Cuts distributable OnTrack logo PNGs from the brochure-extracted lockup.
// Run from ONTRACK/web (sharp resolves from that project).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(process.cwd() + "/package.json");
const sharp = require("sharp");

const SRC = "public/logo-ontrack-source.png";
const OUT = path.resolve(process.cwd(), "../LOGO");
fs.mkdirSync(OUT, { recursive: true });

// Source is 1877x1000: bracket + wordmark on top, "CON RESPALDO DE" strapline
// inside the bracket's bottom bar, partner marks below. Keep the top block and
// wipe the strapline, which only lives to the right of the bracket.
const CROP = { left: 20, top: 20, width: 1840, height: 715 };
const STRAP = { x0: 595, y0: 620, y1: 715 };

const { data, info } = await sharp(SRC)
  .extract(CROP)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: w, height: h } = info;

function build(mode, colorOnly = false) {
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const srcY = y + CROP.top;
      const srcX = x + CROP.left;
      if (srcX >= STRAP.x0 && srcY >= STRAP.y0 && srcY <= STRAP.y1) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a === 0) continue;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const colored = max - min > 45;

      if (colored) {
        out[i] = r;
        out[i + 1] = g;
        out[i + 2] = b;
        out[i + 3] = a;
        continue;
      }
      if (colorOnly) continue;

      // Neutral ink: rebuild coverage from luminance so the white paper drops out.
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const cover = Math.round((255 - lum) * (a / 255));
      if (cover <= 2) continue;
      const ink = mode === "white" ? 255 : 17;
      out[i] = ink;
      out[i + 1] = ink;
      out[i + 2] = ink;
      out[i + 3] = cover;
    }
  }
  return sharp(out, { raw: { width: w, height: h, channels: 4 } }).png();
}

async function write(name, pipeline) {
  const file = path.join(OUT, name);
  await pipeline.toFile(file);
  const meta = await sharp(file).metadata();
  console.log(name, `${meta.width}x${meta.height}`, `${Math.round(fs.statSync(file).size / 1024)}kb`);
}

const PAD = 60;
const trimmed = (mode) =>
  build(mode)
    .trim({ threshold: 1 })
    .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } });

// Master files at native resolution.
await write("ontrack-logo-dark.png", trimmed("dark"));
await write("ontrack-logo-white.png", trimmed("white"));

// Flattened version for Office docs / anything that mishandles alpha.
await write(
  "ontrack-logo-on-white.png",
  trimmed("dark").flatten({ background: "#ffffff" }),
);

// Oversized export for print and large-format use. Sharp extends after
// resizing, so target the artwork width minus the padding it adds back.
await write(
  "ontrack-logo-dark-4000w.png",
  trimmed("dark").resize({ width: 4000 - PAD * 2, kernel: "lanczos3" }),
);
await write(
  "ontrack-logo-white-4000w.png",
  trimmed("white").resize({ width: 4000 - PAD * 2, kernel: "lanczos3" }),
);

// Square arrow mark on its own, for avatars and favicons. The wordmark overlaps
// the bracket, so keep only the orange artwork rather than cropping letters.
const markRegion = await build("dark", true)
  .extract({ left: 0, top: 0, width: 620, height: 700 })
  .toBuffer();
const markBuf = await sharp(markRegion).trim({ threshold: 1 }).toBuffer();
const markMeta = await sharp(markBuf).metadata();
const side = Math.max(markMeta.width, markMeta.height) + 120;
await write(
  "ontrack-mark-1024.png",
  sharp({
    create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: markBuf, gravity: "center" }])
    .png()
    .resize({ width: 1024, height: 1024, kernel: "lanczos3" }),
);

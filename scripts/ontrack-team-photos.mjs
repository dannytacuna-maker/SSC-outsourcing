// Cuts the OnTrack team gallery shots from the original FOTOS-SSC captures.
// Run from ONTRACK/web (sharp resolves from that project).
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(process.cwd() + "/package.json");
const sharp = require("sharp");

const SRC_DIR = "C:/Users/danny/Desktop/Projects/SSC/FOTOS-SSC/FOTOS-SSC/GRUPOS";
const OUT_DIR = path.resolve(process.cwd(), "public/photos");

const shots = [
  { src: "IMG_5453.jpg", out: "team-boardroom.jpg", focusY: 0.5 },
  { src: "IMG_4801.jpg", out: "team-floor.jpg", focusY: 0.52 },
];

for (const shot of shots) {
  const input = sharp(path.join(SRC_DIR, shot.src));
  const meta = await input.metadata();

  // 4:3 landscape window, as tall as the frame allows, biased to the subjects.
  const targetRatio = 4 / 3;
  let cropW = meta.width;
  let cropH = Math.round(cropW / targetRatio);
  if (cropH > meta.height) {
    cropH = meta.height;
    cropW = Math.round(cropH * targetRatio);
  }
  const left = Math.round((meta.width - cropW) / 2);
  const top = Math.min(
    Math.max(Math.round(meta.height * shot.focusY - cropH / 2), 0),
    meta.height - cropH,
  );

  const outPath = path.join(OUT_DIR, shot.out);
  await input
    .extract({ left, top, width: cropW, height: cropH })
    .resize({ width: 2400, kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toFile(outPath);

  const outMeta = await sharp(outPath).metadata();
  console.log(shot.out, `${outMeta.width}x${outMeta.height}`, `from ${meta.width}x${meta.height}`);
}

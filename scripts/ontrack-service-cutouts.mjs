import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(path.join(process.cwd(), "package.json"));
const sharp = require("sharp");
const { removeBackground } = require("@imgly/background-removal-node");

const SRC = "C:/Users/danny/Desktop/Projects/SSC/FOTOS-SSC/fotos";
const OUT = path.resolve(process.cwd(), "public/photos");

const shots = [
  ["accounting", "IMG_4536.jpg"],
  ["payroll", "IMG_4109-3.jpg"],
  ["tax-cr", "IMG_4225.jpg"],
  ["einvoice", "IMG_6008.jpg"],
  ["freezone", "IMG_6052.jpg"],
  ["audit", "IMG_6116.jpg"],
];

await fs.mkdir(OUT, { recursive: true });

for (const [service, file] of shots) {
  const srcPath = path.join(SRC, file);
  const workPath = path.join(OUT, `_work-${service}.jpg`);
  const outPath = path.join(OUT, `service-${service}.png`);

  await sharp(srcPath)
    .rotate()
    .resize({
      width: 2400,
      height: 2400,
      fit: "inside",
      withoutEnlargement: true,
      kernel: "lanczos3",
    })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(workPath);

  console.log("cutout", service, "…");
  const workBuf = await fs.readFile(workPath);
  const blob = await removeBackground(
    new Blob([workBuf], { type: "image/jpeg" }),
    {
      output: { format: "image/png", quality: 1 },
    },
  );
  const cutout = Buffer.from(await blob.arrayBuffer());

  await sharp(cutout)
    .trim({ threshold: 8 })
    .resize({
      width: 2200,
      height: 2200,
      fit: "inside",
      withoutEnlargement: true,
      kernel: "lanczos3",
    })
    .png({ compressionLevel: 7, quality: 100 })
    .toFile(outPath);

  await fs.unlink(workPath).catch(() => {});
  await fs.unlink(path.join(OUT, `service-${service}.jpg`)).catch(() => {});

  const meta = await sharp(outPath).metadata();
  const size = Math.round((await fs.stat(outPath)).size / 1024);
  console.log(service, `${meta.width}x${meta.height}`, `${size}kb`);
}

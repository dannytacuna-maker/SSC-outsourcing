import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(process.cwd() + "/package.json");
const sharp = require("sharp");

const sourceRoot =
  "C:/Users/danny/Desktop/Projects/SSC/FOTOS-SSC/FOTOS-SSC";
const outputRoot = path.resolve(process.cwd(), "public/photos");

const photos = [
  ["accounting", "CORREOS/IMG_4851.jpg"],
  ["payroll", "CORREOS/IMG_4936.jpg"],
  ["tax-cr", "CORREOS/IMG_5407.jpg"],
  ["einvoice", "REMODELACION/IMG_4278.jpg"],
  ["freezone", "TONOS NUEVOS/IMG_5671.jpg"],
  ["audit", "SHIRLEY/IMG_5798.jpg"],
];

for (const [service, source] of photos) {
  await sharp(path.join(sourceRoot, source))
    .resize({
      width: 1800,
      height: 1500,
      fit: "cover",
      position: "attention",
      kernel: "lanczos3",
    })
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toFile(path.join(outputRoot, `service-${service}.jpg`));
}

// Flattens the white logo export onto ink so transparency can be eyeballed.
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(process.cwd() + "/package.json");
const sharp = require("sharp");

const src = path.resolve(process.cwd(), "../LOGO/ontrack-logo-white.png");
const out = path.resolve(import.meta.dirname, "preview-white-on-dark.png");

await sharp(src).flatten({ background: "#0b0d10" }).toFile(out);
console.log(out);

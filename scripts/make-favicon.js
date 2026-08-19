const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Clean SSC mark for tab use — no side rules (they fight the letters at favicon size).
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="#014070"/>
  <text x="256" y="292" text-anchor="middle" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="150" font-weight="800" fill="#ffffff" letter-spacing="8">SSC</text>
</svg>`;

const root = "C:/Users/danny/Desktop/Projects/SSC";
const targets = [
  path.join(root, "src/app/icon.png"),
  path.join(root, "public/favicon-ssc.png"),
];

(async () => {
  const buf = Buffer.from(svg);
  for (const target of targets) {
    await sharp(buf).png().toFile(target);
  }
  await sharp(buf)
    .resize(180, 180)
    .png()
    .toFile(path.join(root, "public/apple-touch-icon.png"));
  console.log("ok", fs.statSync(targets[0]).size);
})();

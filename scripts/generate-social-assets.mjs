import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";
import { put } from "@vercel/blob";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const assets = join(root, "src/assets");
const publicDir = join(root, "public");

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("Missing BLOB_READ_WRITE_TOKEN");
  process.exit(1);
}

const logoSource = readFileSync(join(assets, "logo-sc.png"));
const navy = "#0e1a2b";
const gold = "#b8943a";
const cream = "#f5f0e8";

async function pngAt(size) {
  return sharp(logoSource)
    .resize(size, size, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

const logo = await sharp(logoSource)
  .resize(320, 320, { fit: "inside", withoutEnlargement: true })
  .png()
  .toBuffer();

const logoMeta = await sharp(logo).metadata();
const logoLeft = Math.round((1200 - logoMeta.width) / 2);

const socialSvg = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${navy}"/>
  <text x="600" y="470" text-anchor="middle" fill="${gold}" font-family="Georgia, serif" font-size="44" letter-spacing="10">STERLING CREST</text>
  <text x="600" y="515" text-anchor="middle" fill="${cream}" font-family="Arial, sans-serif" font-size="18" letter-spacing="14">FINANCIAL GROUP</text>
</svg>
`);

const socialCard = await sharp(socialSvg)
  .composite([{ input: logo, top: 95, left: logoLeft }])
  .webp({ quality: 90, effort: 6 })
  .toBuffer();

const favicon32 = await pngAt(32);
const favicon180 = await pngAt(180);
const favicon256 = await pngAt(256);
const favicon16 = await pngAt(16);
const favicon48 = await pngAt(48);
const faviconIco = await toIco([favicon16, favicon32, favicon48]);

writeFileSync(join(publicDir, "favicon.ico"), faviconIco);
writeFileSync(join(publicDir, "favicon.png"), favicon256);
writeFileSync(join(publicDir, "apple-touch-icon.png"), favicon180);

const uploads = [
  { name: "favicon.ico", buffer: faviconIco, contentType: "image/x-icon" },
  { name: "favicon-32.png", buffer: favicon32, contentType: "image/png" },
  { name: "apple-touch-icon.png", buffer: favicon180, contentType: "image/png" },
];

const urls = {};

for (const item of uploads) {
  const blob = await put(`images/${item.name}`, item.buffer, {
    access: "public",
    contentType: item.contentType,
    token,
    allowOverwrite: true,
    addRandomSuffix: false,
  });
  urls[item.name] = blob.url;
  console.log(`${item.name}: ${(item.buffer.length / 1024).toFixed(1)} KB → ${blob.url}`);
}

const socialBlob = await put("images/social-card.webp", socialCard, {
  access: "public",
  contentType: "image/webp",
  token,
  allowOverwrite: true,
  addRandomSuffix: false,
});

urls["social-card.webp"] = socialBlob.url;
console.log(`social-card.webp: ${(socialCard.length / 1024).toFixed(1)} KB → ${socialBlob.url}`);

writeFileSync(
  join(publicDir, "site.webmanifest"),
  JSON.stringify(
    {
      name: "Sterling Crest Financial Group",
      short_name: "Sterling Crest",
      icons: [
        { src: urls["favicon-32.png"], sizes: "32x32", type: "image/png" },
        { src: urls["apple-touch-icon.png"], sizes: "180x180", type: "image/png" },
      ],
      theme_color: navy,
      background_color: navy,
      display: "standalone",
    },
    null,
    2,
  ),
);

console.log("\nCDN URLs:");
console.log(JSON.stringify(urls, null, 2));

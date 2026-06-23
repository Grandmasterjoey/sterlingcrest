import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
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

const socialBlob = await put("images/social-card.webp", socialCard, {
  access: "public",
  contentType: "image/webp",
  token,
  addRandomSuffix: false,
});

const faviconPng = await sharp(logoSource)
  .resize(256, 256, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

writeFileSync(join(publicDir, "favicon.png"), faviconPng);

const appleTouchIcon = await sharp(logoSource)
  .resize(180, 180, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

writeFileSync(join(publicDir, "apple-touch-icon.png"), appleTouchIcon);

console.log(`social-card.webp: ${(socialCard.length / 1024).toFixed(1)} KB → ${socialBlob.url}`);
console.log("Updated public/favicon.png and public/apple-touch-icon.png");

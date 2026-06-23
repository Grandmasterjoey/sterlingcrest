import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { put } from "@vercel/blob";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const assets = join(root, "src/assets");

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("Missing BLOB_READ_WRITE_TOKEN");
  process.exit(1);
}

const uploads = [
  {
    name: "hero-dusk.webp",
    buffer: () =>
      sharp(readFileSync(join(assets, "hero-dusk.png")))
        .webp({ quality: 82, effort: 6 })
        .toBuffer(),
  },
  {
    name: "logo-sc.webp",
    buffer: () =>
      sharp(readFileSync(join(assets, "logo-sc.png")))
        .resize(256, 256, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 90, effort: 6 })
        .toBuffer(),
  },
  {
    name: "logo-gold.webp",
    buffer: () =>
      sharp(readFileSync(join(assets, "logo-gold.png")))
        .resize(256, 256, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 90, effort: 6 })
        .toBuffer(),
  },
];

const urls = {};

for (const item of uploads) {
  const buffer = await item.buffer();
  const blob = await put(`images/${item.name}`, buffer, {
    access: "public",
    contentType: "image/webp",
    token,
    allowOverwrite: true,
    addRandomSuffix: false,
  });
  urls[item.name] = blob.url;
  console.log(`${item.name}: ${(buffer.length / 1024).toFixed(1)} KB → ${blob.url}`);
}

console.log("\nCDN URLs:");
console.log(JSON.stringify(urls, null, 2));

// Turns the original photos of the cabins (scripts/originals) into WebP in two widths.
// Only real photos of La Marquesa live here: the stock villas of the 2023 beta were removed.
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = path.resolve("scripts/originals");
const out = path.resolve("public/fotos");
await mkdir(out, { recursive: true });

for (const file of await readdir(src)) {
  const name = path.parse(file).name;
  for (const width of [800, 1600]) {
    const info = await sharp(path.join(src, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toFile(path.join(out, `${name}-${width}.webp`));
    console.log(`${name}-${width}.webp`, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`);
  }
}

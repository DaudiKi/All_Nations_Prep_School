/**
 * Builds web-ready brand assets from the school's brand pack.
 *
 * Reads the RGB (digital) SVGs from "Brand Guidelines - All Nations Pre School",
 * normalises their colours to the values published in the style guidelines,
 * gives every file a meaningful name, optimises it, and writes a typed manifest.
 *
 * Re-run this whenever the brand pack changes:  npm run brand
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { optimize } from "svgo";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, "..", "..");
const PACK = join(REPO, "Brand Guidelines - All Nations Pre School", "FINAL FILES");
const OUT = join(REPO, "web", "public", "brand");
const MANIFEST = join(REPO, "web", "lib", "brand", "assets.ts");

/* ---------------------------------------------------------------------------
 * Colour.
 *
 * The artwork was exported from CMYK and its RGB values drifted from the hex
 * values printed in the style guidelines. The guidelines are the published
 * spec — the school quotes them to printers — so they win, and the artwork is
 * normalised to match on the way in.
 * ------------------------------------------------------------------------- */
const BRAND = {
  ink:   "#023266", // Inky Blue      — main
  gold:  "#F1A719", // Yellow Banana  — main
  green: "#019042", // Fruity Green   — accent
  sky:   "#028593", // Blue Sky       — accent
  grey:  "#D6D6D6", // Cloudy Grey    — accent
  white: "#FFFFFF",
};

/** artwork hex -> canonical brand token */
const NORMALISE = {
  "#f2a819": "gold",  "#f1a719": "gold",
  "#023266": "ink",
  "#019642": "green", "#019042": "green",
  "#028b99": "sky",   "#028593": "sky",
  "#d6d6d6": "grey",
  "#fff": "white", "#ffffff": "white",
};

/** a sorted colour set -> the colourway name we publish it under */
const COLOURWAYS = {
  "gold,ink":   "ink-gold",    // first-choice pairing in the guidelines
  "ink,sky":    "ink-sky",     // second-choice pairing
  "gold,green": "green-gold",  // alternative use
  "gold,sky":   "sky-gold",    // alternative use
  "gold,white": "white-gold",  // reversed, for Inky Blue grounds
};

/** Colourways the guidelines name as first choice, surfaced in the manifest. */
const PREFERRED = new Set(["ink-gold", "white-gold", "mono"]);

/* ---------------------------------------------------------------------------
 * Shape naming.
 *
 * Each icon set ships 3 distinct shapes in 8 colourways. Shapes are identified
 * by hashing their path geometry, which is colour-independent. These seeds map
 * one known file per shape to a human name; everything else follows by hash.
 * ------------------------------------------------------------------------- */
const SHAPE_SEEDS = {
  "PRIMARY ICON SET":    { "Asset 13": "badge",       "Asset 12": "children",       "Asset 14": "smile" },
  "INNOVATIVE ICON SET": { "Asset 55": "puzzle",      "Asset 54": "lightbulb",      "Asset 56": "cloud" },
  "DIVERSE ICON SET":    { "Asset 78": "shapes",      "Asset 79": "child-triangle", "Asset 80": "child-circle" },
  // The school set ships FOUR artworks, not three as the guidelines page implies,
  // and two of them are missing colourways. See the coverage warning below.
  "SCHOOL ICON SET":     { "Asset 100": "punctuation","Asset 101": "numbers",
                           "Asset 102": "letters",    "Asset 105": "letters-lowercase" },
};

const LOGO_DIRS = {
  "PRIMARY LOGO":   "primary",   // badge + full name, horizontal
  "SECONDARY LOGO": "secondary", // badge above name, vertical
  "LOGO MARK":      "mark",      // the badge alone — official symbol
  "NAME":           "wordmark",  // school name only
  "SCHOOL NAME":    "wordmark",
};

const PATTERN_DIRS = {
  "OFFICIAL SCHOOL PATTERN": "official",
  "INNOVATION PATTERN":      "innovation",
  "DIVERSITY PATTERN":       "diversity",
};

/* ------------------------------------------------------------------------- */

const walk = (dir) => {
  const out = [];
  if (!statSafe(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.toLowerCase().endsWith(".svg")) out.push(p);
  }
  return out;
};
const statSafe = (p) => { try { return statSync(p); } catch { return null; } };

/** Colours declared in the file, as canonical brand tokens. */
function coloursOf(svg) {
  const found = new Set();
  for (const hex of svg.match(/#[0-9a-fA-F]{3,6}\b/g) ?? []) {
    const token = NORMALISE[hex.toLowerCase()];
    if (token) found.add(token);
  }
  return found;
}

/**
 * Colour-independent fingerprint of the artwork itself.
 *
 * Path data is sorted before hashing: the colourways of one icon carry the same
 * paths but emit them in whatever order their fill classes fell in, so hashing
 * them in document order splits a single icon into several phantom shapes.
 */
function geometryHash(svg) {
  const paths = [...svg.matchAll(/\sd="([^"]+)"/g)].map((m) => m[1]).sort().join("");
  const prims = [...svg.matchAll(/<(circle|rect|ellipse|polygon|polyline)\b([^>]*)>/g)]
    .map((m) => m[2].replace(/\s*(fill|class|style)="[^"]*"/g, "")).sort().join("");
  return createHash("md5").update(paths + prims).digest("hex").slice(0, 10);
}

/** Rewrite every artwork colour to its guidelines value. */
function normaliseColours(svg) {
  return svg.replace(/#[0-9a-fA-F]{3,6}\b/g, (hex) => {
    const token = NORMALISE[hex.toLowerCase()];
    return token ? BRAND[token] : hex;
  });
}

/**
 * Turn a single-colour file into one that inherits `currentColor`, so one file
 * serves the solid ink, gold, white and black variants the guidelines approve.
 * Only ever applied to files that are already a single flat colour, so this
 * never recolours parts of a logo against the brand's cautions.
 */
function toCurrentColor(svg) {
  let out = svg
    .replace(/<style>[\s\S]*?<\/style>/g, "")                 // drop the .cls-N fills
    .replace(/\sclass="cls-\d+"/g, "")
    .replace(/\sfill="(?!none)[^"]*"/g, "")                   // drop literal fills, keep fill="none"
    .replace(/fill\s*:\s*(?!none)[^;"]+;?/g, "");             // drop inline style fills
  // Put a single inheritable fill on the root.
  out = out.replace(/<svg\b/, '<svg fill="currentColor"');
  return out;
}

const SVGO_CONFIG = {
  multipass: true,
  plugins: [
    // svgo v4 drops removeViewBox from preset-default, so the viewBox — which is
    // what lets these scale — is preserved without an override.
    { name: "preset-default", params: { overrides: { cleanupIds: { minify: true } } } },
    { name: "removeDimensions" },    // drop width/height so CSS controls size
    { name: "sortAttrs" },
  ],
};

function emit(relPath, svg) {
  const full = join(OUT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  const { data } = optimize(svg, { ...SVGO_CONFIG, path: full });
  writeFileSync(full, data, "utf8");
  return data.length;
}

/* ------------------------------------------------------------------------- */

const stats = { read: 0, written: 0, skipped: 0, bytesIn: 0, bytesOut: 0 };
const manifest = { logos: {}, icons: {}, patterns: {} };
const warnings = [];

/**
 * Build one family (a logo variation, an icon set, or a pattern).
 *
 * `singleShape` says the directory holds exactly one artwork, so every file in
 * it is a colourway of that artwork. Logos and patterns are like this, and they
 * must not be split by geometry: some reversed variants were exported with a
 * fractionally different viewBox, which would otherwise read as a new shape.
 * Icon sets hold three artworks each, so those are grouped by geometry.
 */
function buildFamily({ files, group, family, shapeSeeds, singleShape = false }) {
  const byShape = new Map();          // geometryHash -> { name, variants: Map<colourway, svg> }
  const seedByAsset = shapeSeeds ?? null;

  for (const file of files) {
    const raw = readFileSync(file, "utf8");
    stats.read++; stats.bytesIn += raw.length;

    const hash = singleShape ? family : geometryHash(raw);
    if (!byShape.has(hash)) {
      byShape.set(hash, { name: singleShape ? family : null, variants: new Map(), box: null });
    }
    const shape = byShape.get(hash);

    // Intrinsic size, so consumers can reserve the right aspect ratio and the
    // logo can never be skewed — one of the guidelines' seven cautions.
    if (!shape.box) {
      const vb = raw.match(/viewBox="([\d.\-\s]+)"/);
      if (vb) {
        const [, , w, h] = vb[1].trim().split(/\s+/).map(Number);
        if (w && h) shape.box = { width: Math.round(w), height: Math.round(h) };
      }
    }

    // Seed the human name from a known asset number.
    if (seedByAsset) {
      const m = file.match(/(Asset \d+)/);
      if (m && seedByAsset[m[1]]) shape.name = seedByAsset[m[1]];
    }

    const cols = coloursOf(raw);
    const key = [...cols].sort().join(",");
    let colourway = COLOURWAYS[key];

    if (!colourway) {
      // Single flat colour (or no declared fill at all) -> one currentColor file.
      if (cols.size <= 1) colourway = "mono";
      else { warnings.push(`unmapped colourway [${key}] in ${file}`); continue; }
    }

    // Prefer the plainest source for mono: no <style> block at all.
    if (colourway === "mono") {
      const plain = !/<style>/.test(raw);
      const existing = shape.variants.get("mono");
      if (existing && !(plain && !existing.plain)) continue;
      shape.variants.set("mono", { svg: toCurrentColor(normaliseColours(raw)), plain });
    } else {
      if (shape.variants.has(colourway)) { stats.skipped++; continue; }
      shape.variants.set(colourway, { svg: normaliseColours(raw), plain: false });
    }
  }

  // Name any shape the seeds did not cover.
  let n = 0;
  for (const shape of byShape.values()) if (!shape.name) shape.name = `${family}-${String(++n).padStart(2, "0")}`;

  const richest = Math.max(...[...byShape.values()].map((s) => s.variants.size));
  for (const shape of byShape.values()) {
    if (shape.variants.size < richest) {
      warnings.push(
        `${group}/${family}/${shape.name} ships ${shape.variants.size} colourway(s) ` +
        `where others in the set ship ${richest} — incomplete in the brand pack`);
    }
    const entryKey = singleShape ? family : `${family}/${shape.name}`;
    const colourways = [];
    for (const [colourway, { svg }] of [...shape.variants].sort()) {
      const base = singleShape
        ? `${group}/${family}/${family}-${colourway}.svg`
        : `${group}/${family}/${shape.name}-${colourway}.svg`;
      stats.bytesOut += emit(base, svg);
      stats.written++;
      colourways.push(colourway);
    }
    manifest[group][entryKey] = {
      dir: `${group}/${family}`,
      stem: singleShape ? family : shape.name,
      width: shape.box?.width ?? 0,
      height: shape.box?.height ?? 0,
      colourways: colourways.sort(),
    };
  }
}

/* ------------------------------------------------------------------------- */

console.log("Building brand assets from:", PACK.replace(REPO + "/", ""));
if (!statSafe(PACK)) { console.error("Brand pack not found. Nothing to do."); process.exit(1); }
rmSync(OUT, { recursive: true, force: true });

// Logos
for (const [dirName, family] of Object.entries(LOGO_DIRS)) {
  const roots = walk(join(PACK, "LOGO FILES")).filter(
    (f) => f.includes("RGB") && f.includes(`/${dirName}/`)
  );
  if (roots.length) buildFamily({ files: roots, group: "logos", family, singleShape: true });
}

// Icons
for (const [setDir, seeds] of Object.entries(SHAPE_SEEDS)) {
  const family = setDir.replace(" ICON SET", "").toLowerCase();
  const files = walk(join(PACK, "ICON FILES", setDir)).filter((f) => f.includes("RGB"));
  if (files.length) buildFamily({ files, group: "icons", family, shapeSeeds: seeds });
}

// Patterns
for (const [dirName, family] of Object.entries(PATTERN_DIRS)) {
  const files = walk(join(PACK, "PATTERN FILES", dirName)).filter((f) => f.includes("RGB"));
  if (files.length) buildFamily({ files, group: "patterns", family, singleShape: true });
}

/* ---- manifest ---------------------------------------------------------- */
const lines = [];
lines.push("// GENERATED FILE — do not edit by hand.");
lines.push("// Run `npm run brand` to rebuild from the brand pack.");
lines.push("");
lines.push("/** Approved colourways. `mono` inherits `currentColor`. */");
lines.push('export type Colourway =');
lines.push("  | " + ["ink-gold", "ink-sky", "green-gold", "sky-gold", "white-gold", "mono"].map((c) => `"${c}"`).join("\n  | ") + ";");
lines.push("");
lines.push("/** Colourways the style guidelines name as first choice. */");
lines.push(`export const PREFERRED_COLOURWAYS = ${JSON.stringify([...PREFERRED])} as const;`);
lines.push("");

const asEntries = (obj) =>
  Object.entries(obj).sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n");

lines.push("export const LOGOS = {\n" + asEntries(manifest.logos) + "\n} as const;");
lines.push("");
lines.push("export const ICONS = {\n" + asEntries(manifest.icons) + "\n} as const;");
lines.push("");
lines.push("export const PATTERNS = {\n" + asEntries(manifest.patterns) + "\n} as const;");
lines.push("");
lines.push("export type LogoName = keyof typeof LOGOS;");
lines.push("export type IconName = keyof typeof ICONS;");
lines.push("export type PatternName = keyof typeof PATTERNS;");
lines.push("");
lines.push("export type BrandAsset = {");
lines.push("  dir: string; stem: string;");
lines.push("  /** Intrinsic viewBox size — use it to hold the aspect ratio. */");
lines.push("  width: number; height: number;");
lines.push("  colourways: readonly string[];");
lines.push("};");
lines.push("");
lines.push("/** Public path for one asset, e.g. brandAsset(ICONS['primary/badge'], 'ink-gold') */");
lines.push("export function brandAsset(");
lines.push("  entry: BrandAsset,");
lines.push("  colourway: Colourway,");
lines.push("): string {");
lines.push("  return `/brand/${entry.dir}/${entry.stem}-${colourway}.svg`;");
lines.push("}");
lines.push("");
lines.push("/**");
lines.push(" * The nearest approved colourway an asset actually ships.");
lines.push(" *");
lines.push(" * Not every artwork in the brand pack ships every colourway, so asking for one");
lines.push(" * it lacks must fall back to something approved rather than 404.");
lines.push(" */");
lines.push("export function resolveColourway(entry: BrandAsset, wanted: Colourway): Colourway {");
lines.push("  const available = entry.colourways as readonly Colourway[];");
lines.push("  if (available.includes(wanted)) return wanted;");
lines.push("  for (const preferred of PREFERRED_COLOURWAYS) {");
lines.push("    if (available.includes(preferred as Colourway)) return preferred as Colourway;");
lines.push("  }");
lines.push("  return available[0];");
lines.push("}");
lines.push("");

mkdirSync(dirname(MANIFEST), { recursive: true });
writeFileSync(MANIFEST, lines.join("\n"), "utf8");

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
console.log(`  read     ${stats.read} source SVGs (${kb(stats.bytesIn)})`);
console.log(`  wrote    ${stats.written} optimised SVGs (${kb(stats.bytesOut)})`);
console.log(`  saved    ${(100 - (stats.bytesOut / stats.bytesIn) * 100).toFixed(1)}%`);
console.log(`  logos    ${Object.keys(manifest.logos).length}`);
console.log(`  icons    ${Object.keys(manifest.icons).length}`);
console.log(`  patterns ${Object.keys(manifest.patterns).length}`);
if (warnings.length) { console.log("\n  warnings:"); warnings.forEach((w) => console.log("   -", w)); }

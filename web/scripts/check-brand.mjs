/**
 * Brand and de-template guard.
 *
 * Phase 8 of the plan was a one-off sweep. This makes it permanent: the things
 * that survive a rebuild by accident are exactly the things nobody thinks to
 * re-check, so they are checked on every run and in CI.
 *
 *   npm run check:brand
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const APP = dirname(fileURLToPath(import.meta.url)) + "/..";
const SKIP = new Set(["node_modules", ".next", ".git", ".data", "public"]);
// Documentation is excluded on purpose: the README and code comments explain
// where this site came from and which values were normalised away, and that
// history is worth keeping. The check is about what SHIPS to a visitor.
const EXT = new Set([".ts", ".tsx", ".css", ".mjs", ".js", ".json"]);

/* --- 1. Template residue ------------------------------------------------- */
const RESIDUE = [
  { re: /\bbloomy\b/i, what: "the template's name" },
  { re: /alevweb/i, what: "the template vendor's handle" },
  { re: /lemonsqueezy/i, what: "the template's checkout link" },
  { re: /framer\.website|framerusercontent|events\.framer/i, what: "a Framer URL" },
  { re: /example\.com/i, what: "a placeholder domain" },
  { re: /\(555\)\s?\d{3}-\d{4}/, what: "the template's placeholder phone number" },
  { re: /Sunshine Street/i, what: "the template's placeholder address" },
  { re: /hello@bloomyedu\.com/i, what: "the template's placeholder email" },
];

/* --- 2. Off-brand colour -------------------------------------------------- */
const APPROVED = new Set(
  [
    "#023266", "#f1a719", "#019042", "#028593", "#d6d6d6",
    "#02717d", // Blue Sky darkened for small text — see globals.css
    "#ffffff", "#fff", "#000000", "#000",
    // approved tints — "use lighter or darker tones of the brand colors"
    "#355b85", "#6784a3", "#9aadc2", "#d9e0e8", "#f0f3f6",
    "#f4b947", "#f7ca75", "#f9dca3", "#fdf2dc", "#fefaf1",
    "#34a668", "#67bc8e", "#99d3b3", "#d9eee3", "#f0f8f4",
    "#359da9", "#67b6be", "#9aced4", "#d9edef", "#f0f8f9",
    // one semantic colour for form errors, which the brand has no token for
    "#b3261e",
  ].map((c) => c.toLowerCase()),
);

/* --- 3. Contrast ---------------------------------------------------------- */
const lum = (hex) => {
  const v = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const CONTRACTS = [
  { name: "body text (ink on white)", fg: "#023266", bg: "#FFFFFF", min: 4.5 },
  { name: "primary button (ink on gold)", fg: "#023266", bg: "#F1A719", min: 4.5 },
  { name: "secondary button (white on ink)", fg: "#FFFFFF", bg: "#023266", min: 4.5 },
  { name: "footer links (white on ink)", fg: "#FFFFFF", bg: "#023266", min: 4.5 },
  { name: "eyebrow on ink (gold on ink)", fg: "#F1A719", bg: "#023266", min: 4.5 },
  // Blue Sky is an accent, not a text colour. These assert that the darkened
  // shade is used for small text and clears AA on every ground it sits on.
  { name: "link text (sky-dark on white)", fg: "#02717D", bg: "#FFFFFF", min: 4.5 },
  { name: "eyebrow (sky-dark on grey tint)", fg: "#02717D", bg: "#F0F3F6", min: 4.5 },
  { name: "eyebrow (sky-dark on gold tint)", fg: "#02717D", bg: "#FDF2DC", min: 4.5 },
  { name: "muted text (ink-t20 on white)", fg: "#355B85", bg: "#FFFFFF", min: 4.5 },
  { name: "muted text (ink-t20 on grey tint)", fg: "#355B85", bg: "#F0F3F6", min: 4.5 },
];

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXT.has(extname(p))) files.push(p);
  }
})(APP);

const problems = [];

for (const file of files) {
  const rel = relative(APP, file);
  if (rel.startsWith("scripts/check-brand")) continue; // this file names the patterns
  // Strip comments. Provenance notes legitimately name the template and the
  // superseded artwork values; only shipped code and content are checked.
  const text = readFileSync(file, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");

  // The style guide is internal developer tooling, noindex and disallowed in
  // robots.txt. It names the template deliberately, to explain where the
  // layout came from. The public site may not.
  if (!rel.startsWith("app/styleguide/")) {
    for (const { re, what } of RESIDUE) {
      if (re.test(text)) problems.push(`${rel}: contains ${what}`);
    }
  }

  // Colour literals in source. Generated files are excluded: the asset manifest
  // and the brand SVGs are produced by the pipeline, which normalises them.
  // Two files are exempt from the colour rule for good reason:
  //  - lib/brand/assets.ts is generated by the pipeline, which normalises.
  //  - the pipeline itself must name the superseded artwork values in order
  //    to map them away.
  const COLOUR_EXEMPT = ["lib/brand/assets.ts", "scripts/build-brand-assets.mjs"];
  if (!COLOUR_EXEMPT.some((f) => rel === f)) {
    for (const hex of text.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []) {
      const h = hex.toLowerCase();
      if (h.length === 9 || h.length === 5) continue; // alpha variants
      if (!APPROVED.has(h)) problems.push(`${rel}: off-brand colour ${hex}`);
    }
  }
}

for (const c of CONTRACTS) {
  const r = ratio(c.fg, c.bg);
  if (r < c.min) problems.push(`contrast: ${c.name} is ${r.toFixed(2)}:1, below ${c.min}:1`);
}

if (problems.length) {
  console.error("Brand check FAILED\n");
  for (const p of problems) console.error("  ✗", p);
  console.error(`\n${problems.length} problem(s).`);
  process.exit(1);
}

console.log("Brand check passed");
console.log(`  ${files.length} files scanned`);
console.log(`  no template residue, no off-brand colour`);
for (const c of CONTRACTS) console.log(`  ${ratio(c.fg, c.bg).toFixed(2)}:1  ${c.name}`);

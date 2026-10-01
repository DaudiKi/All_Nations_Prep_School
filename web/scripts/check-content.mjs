/**
 * Content audit.
 *
 * Lists everything the school still has to supply. Content gaps are deliberate
 * — the alternative was inventing plausible staff, fees and testimonials, which
 * is exactly what made the template unusable. This keeps the gaps visible.
 *
 *   npm run check:content
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const APP = dirname(fileURLToPath(import.meta.url)) + "/..";
const CONTENT = join(APP, "content");

const todos = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (![".ts", ".tsx"].includes(extname(p))) continue;
    const lines = readFileSync(p, "utf8").split("\n");
    lines.forEach((line, i) => {
      const m = line.match(/TODO:\s*"([^"]+)"/);
      if (m) todos.push({ file: relative(APP, p), line: i + 1, text: m[1] });
    });
  }
})(CONTENT);

// Collections the school has not populated.
const empties = [];
const site = readFileSync(join(CONTENT, "site.ts"), "utf8");
for (const name of ["STAFF", "POSTS", "GALLERY", "TESTIMONIALS", "TERM_DATES"]) {
  if (new RegExp(`export const ${name}[^=]*=\\s*\\[\\s*\\]`).test(site)) empties.push(name);
}

console.log("Content audit\n");

if (empties.length) {
  console.log("Empty collections — pages render an honest empty state until filled:");
  for (const e of empties) console.log(`  ·  ${e.toLowerCase().replace("_", " ")}`);
  console.log("");
}

if (todos.length) {
  console.log("Facts the school needs to confirm:");
  for (const t of todos) console.log(`  ·  ${t.text}\n       ${t.file}:${t.line}`);
  console.log("");
}

const total = empties.length + todos.length;
console.log(
  total === 0
    ? "Nothing outstanding."
    : `${total} item(s) outstanding. These are information gaps, not build failures.`,
);
// Never fails the build: missing school content must not block a deploy.

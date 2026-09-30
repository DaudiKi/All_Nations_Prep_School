# All Nations Prep School — website

A Next.js rebuild of the school's website, replacing the Bloomy Framer template
export at the repository root.

The export stays in place as the **visual reference** for layout, spacing and
motion. It is not the source of the new site, and it is not deployed.

## Status — Phase 1 of 12

The design system, the brand asset library and the motion primitives are in
place. Pages are built from Phase 4 onward; see the implementation plan.

Run it:

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run brand        # rebuild brand assets from the brand pack
```

The style guide at **`/styleguide`** renders everything Phase 1 produced —
palette with live contrast ratios, the six type levels, all four logo
variations in every approved colourway, all 13 icons, the patterns, and the
motion.

## How the brand is wired

Every brand decision lives in one of five places. Nothing else may hard-code a
colour, a font or an asset path.

| What | Where |
| --- | --- |
| Colour, type scale, radii, breakpoints, easing | `app/globals.css` (`@theme`) |
| Typeface | `app/fonts.ts` |
| Vision, mission, values, contact details | `lib/brand/school.ts` |
| Asset paths and colourways | `lib/brand/assets.ts` *(generated)* |
| Logo, icons, patterns | `components/brand/` |

Two guard rails are built into `app/globals.css`: Tailwind's default colour
palette and default breakpoints are both cleared. A stray `bg-red-500` or `sm:`
therefore fails to compile instead of quietly introducing a colour the brand
does not have or a fourth breakpoint the design never accounted for.

### Colour

Guidelines hex values are authoritative:

| | | |
| --- | --- | --- |
| Inky Blue | `#023266` | main |
| Yellow Banana | `#F1A719` | main |
| Fruity Green | `#019042` | accent |
| Blue Sky | `#028593` | accent |
| Cloudy Grey | `#D6D6D6` | accent |

The supplied artwork carried slightly different RGB — gold `#F2A819`, green
`#019642`, sky `#028B99` — almost certainly from a CMYK conversion. The asset
pipeline normalises it on import so the website agrees with the document the
school hands its printers.

**Yellow Banana measures 2.04:1 on white and can never carry text there.** The
primary button is a gold fill with Inky Blue text (6.23:1), which is also the
pairing the guidelines name as first choice.

### Typeface

The brand typeface is **Arial Rounded MT**. The pack ships it as desktop TTFs,
which are licensed for print and documents only — serving them as webfonts
needs a separate Monotype web licence.

**Nunito** stands in: rounded terminals, humanist, and its variable axis covers
all three brand weights. To swap in the licensed face, replace the loader in
`app/fonts.ts` with `next/font/local` and keep the `--font-brand` variable
name. Nothing else references a font family.

## The asset pipeline

`npm run brand` reads the RGB SVGs from `Brand Guidelines - All Nations Pre
School/`, and for each one:

1. normalises artwork colours to the guidelines hex values,
2. identifies the artwork by hashing its path geometry, so colourways of the
   same icon group together,
3. names it meaningfully — `logos/primary/primary-ink-gold.svg`, not
   `PRIMARY LOGOAsset 33.svg`,
4. collapses the single-colour variants into one `-mono.svg` that inherits
   `currentColor`,
5. optimises it with SVGO and records its intrinsic size,
6. writes the typed manifest at `lib/brand/assets.ts`.

160 source SVGs become 103 optimised files, 41% smaller. The manifest is
generated — edit the script, never the manifest.

### What the pipeline found in the pack

- The artwork/guidelines colour mismatch described above.
- The **school icon set holds four artworks, not three** as the guidelines page
  implies: mixed-case letters and a separate lowercase variant.
- **`icons/school/letters` ships one colourway** where the rest of its set ships
  five. The build warns about this on every run. Worth asking the designer for
  the missing exports.
- The patterns page says "we have 4 brand patterns" and lists three; only three
  exist in the pack.

## Brand rules enforced in code

The guidelines list seven cautions for the logo. Four are things a careless web
implementation breaks by accident, so `components/brand/Logo.tsx` makes them
impossible rather than leaving them in a PDF:

- **no new colours** — `colourway` is a fixed union generated from the manifest
- **no skewing** — width and height are always set together from the intrinsic
  viewBox
- **no recolouring or rearranging parts** — each variation ships as one flat
  file and nothing restyles its internals
- **protection area** — baked in as padding so no element can crowd the logo

`clearSpace` defaults to 0.3 of the rendered height. The guidelines define the
protection area by the "Unity Icon" placed around the logo; this is a
conservative reading of that page and **should be confirmed with the designer**
before launch.

## Motion

`components/motion/easing.ts` holds the template's signature, extracted from its
appear-animation payload: `cubic-bezier(0.44, 0, 0.56, 1)`, durations of 0.6s
and 1s, staggered delays at 0 / 0.6 / 0.8 / 1.8s, and an initial opacity of
0.001 rather than 0 so elements stay composited and do not flash on first paint.

`Reveal` and `SplitText` both stand still under `prefers-reduced-motion` —
rendering immediately rather than animating faster.

`SplitText` splits by word for presentation only: one semantic heading, with
`aria-label` carrying the real string. The export achieved the same effect by
emitting a duplicate heading set per breakpoint, which is why its homepage
carries fourteen `<h1>` elements.

## Open decisions

- Confirm the protection-area measure with the designer.
- Confirm whether the Arial Rounded MT web licence will be bought.
- Ask the designer for the missing `school/letters` colourways.

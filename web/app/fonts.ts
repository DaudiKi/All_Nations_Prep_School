import { Nunito } from "next/font/google";

/**
 * Brand typeface.
 *
 * The style guidelines specify Arial Rounded MT (Regular / Bold / Extra Bold).
 * The brand pack ships it as desktop TTFs, which are licensed for print and
 * documents only — serving them as webfonts needs a separate Monotype web
 * licence. Nunito stands in until that decision is revisited: rounded
 * terminals, humanist proportions, and a weight range that covers all three
 * brand weights.
 *
 * To swap in the licensed face, replace this loader with `next/font/local`
 * pointing at the WOFF2 files and keep the `--font-brand` variable name. No
 * component or stylesheet references a font family directly.
 */
export const brandFont = Nunito({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
  // No `weight` here on purpose. Nunito is a variable font, so the whole 200–1000
  // axis ships in one file and every weight the design uses — 400 body, 700 bold
  // sub-headings, 800 extra-bold main headings — is already covered. Listing
  // weights explicitly also makes next/font emit one @font-face per weight, which
  // Turbopack's font loader rejects outright ("queries have exactly one entry").
});

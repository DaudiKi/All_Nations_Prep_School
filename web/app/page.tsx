import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SCHOOL } from "@/lib/brand/school";

/**
 * Placeholder. The homepage is built in Phase 4; this stands in so the route
 * exists and the design system is reachable.
 */
export default function Home() {
  return (
    <main className="container-site flex min-h-dvh flex-col items-start justify-center gap-6 py-20">
      <Logo height={72} priority />
      <h1 className="type-display">{SCHOOL.name}</h1>
      <p className="type-body max-w-[60ch] text-ink-t20">
        {SCHOOL.motto}. The site is being rebuilt on the school&rsquo;s brand.
        Phase&nbsp;1 — the design system, the brand asset library and the motion
        primitives — is in place.
      </p>
      <Link
        href="/styleguide"
        className="type-sub3 inline-flex rounded-[var(--radius-pill)] bg-gold px-7 py-3 text-ink no-underline"
      >
        Open the style guide
      </Link>
    </main>
  );
}

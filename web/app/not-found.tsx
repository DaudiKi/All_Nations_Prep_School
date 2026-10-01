import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="container-site flex min-h-dvh flex-col items-center justify-center gap-6 py-20 text-center">
      <Logo height={56} />
      <BrandIcon name="school/punctuation" alt="" size={72} colourway="ink-gold" />
      <h1 className="type-display max-w-[16ch]">We could not find that page</h1>
      <p className="type-body max-w-[48ch] text-ink-t20">
        The page may have moved, or the link may be out of date. Everything on
        the site can be reached from the home page.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/" variant="primary">Back to the home page</Button>
        <Button href="/contact" variant="outline">Contact the school</Button>
      </div>
      <p className="type-small mt-4 text-ink-t20">
        Looking for admissions? <Link href="/admissions" className="font-bold text-sky-dark">Apply here</Link>.
      </p>
    </main>
  );
}

import { Button } from "@/components/ui/Button";
import { Pattern } from "@/components/brand/Pattern";
import { SCHOOL } from "@/lib/brand/school";

/** The "Let's Connect" band the template repeats on every page. */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-gold">
      <Pattern name="innovation" colourway="ink-gold" opacity={0.14} size={220} />
      <div className="container-site relative py-16 text-center md:py-20">
        <p className="type-small font-bold uppercase tracking-[0.16em] text-ink/70">Let&rsquo;s connect</p>
        <h2 className="type-sub1 mx-auto mt-3 max-w-[20ch] text-ink">
          Give your child a joyful start
        </h2>
        <p className="type-body mx-auto mt-4 max-w-[52ch] text-ink/80">
          {SCHOOL.name} is enrolling for Daycare, Kindergarten and Primary.
          Come and see the school for yourself.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/admissions" variant="secondary">Apply for a place</Button>
          <Button href="/contact" variant="outline">Book a visit</Button>
        </div>
      </div>
    </section>
  );
}

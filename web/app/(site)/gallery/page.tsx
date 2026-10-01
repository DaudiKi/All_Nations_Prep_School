import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { CtaBand } from "@/components/site/CtaBand";
import { Pattern } from "@/components/brand/Pattern";
import { cms } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Life at All Nations Prep School.",
};

export default async function GalleryPage() {
  const items = await cms.gallery();

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Pattern name="diversity" colourway="white-gold" opacity={0.1} size={280} />
        <div className="container-site relative py-16 md:py-24">
          <Pill tone="gold" tilt>Gallery</Pill>
          <h1 className="type-display mt-6 max-w-[16ch] text-white">Life at our school</h1>
        </div>
      </section>

      <Section ground="white">
        {items.length ? (
          <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
            {items.map((item) => (
              <li key={item.src} className="overflow-hidden rounded-[var(--radius-card)]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={450}
                  className="h-full w-full object-cover"
                />
                {item.caption ? <p className="type-small mt-2 text-ink-t20">{item.caption}</p> : null}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon="diverse/shapes"
            title="Photographs coming soon"
            body="We are gathering photographs of the classrooms, the playground and school events. Every picture of a child will be published only once we hold written consent from their parent."
          />
        )}
      </Section>

      <CtaBand />
    </>
  );
}

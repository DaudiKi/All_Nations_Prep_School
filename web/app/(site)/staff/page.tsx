import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Card, Pill } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { CtaBand } from "@/components/site/CtaBand";
import { Pattern } from "@/components/brand/Pattern";
import { cms } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Our staff",
  description: "The teachers and staff of All Nations Prep School.",
};

export default async function StaffPage() {
  const staff = await cms.staff();

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Pattern name="official" colourway="white-gold" opacity={0.1} size={280} />
        <div className="container-site relative py-16 md:py-24">
          <Pill tone="gold" tilt>Our staff</Pill>
          <h1 className="type-display mt-6 max-w-[18ch] text-white">
            The people who teach your child
          </h1>
        </div>
      </section>

      <Section ground="white">
        {staff.length ? (
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
            {staff.map((person) => (
              <li key={person.slug}>
                <Card>
                  <h2 className="type-sub3">{person.name}</h2>
                  <p className="type-small mt-1 font-bold text-sky-dark">{person.role}</p>
                  {person.bio ? <p className="type-body mt-3 text-ink-t20">{person.bio}</p> : null}
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon="primary/children"
            title="Staff profiles coming soon"
            body="We are preparing profiles for our teachers and staff, with their photographs and qualifications."
          />
        )}
      </Section>

      <CtaBand />
    </>
  );
}

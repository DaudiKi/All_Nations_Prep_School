import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Card";
import { SCHOOL } from "@/lib/brand/school";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the All Nations Prep School website.",
};

/**
 * DRAFT. The template's form asked parents to agree to "Terms & Conditions"
 * that did not exist anywhere on the site. This page exists so that the
 * consent the form asks for actually refers to something. It needs legal
 * review before launch.
 */
export default function TermsPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-site py-14 md:py-20">
          <Pill tone="gold" tilt>Legal</Pill>
          <h1 className="type-display mt-6 text-white">Terms of use</h1>
        </div>
      </section>

      <Section ground="white">
        <div className="max-w-[68ch]">
          <div className="mb-10 rounded-[var(--radius-card)] border-2 border-gold bg-gold-t94 p-5">
            <p className="type-small m-0 font-bold text-ink">Draft — not yet reviewed</p>
            <p className="type-small mt-2 text-ink">
              This page has not been reviewed by a lawyer and must be before the
              site goes live.
            </p>
          </div>

          <h2 className="type-sub3">About this website</h2>
          <p className="type-body text-ink-t20">
            This website is published by {SCHOOL.name} to give information about
            the school to parents and prospective parents.
          </p>

          <h2 className="type-sub3 mt-8">Information on this site</h2>
          <p className="type-body text-ink-t20">
            We keep this site as accurate as we can, but details such as fees,
            term dates and the classes we offer can change. Nothing on this
            website is an offer of a place. Please confirm anything you are
            relying on by contacting the school directly.
          </p>

          <h2 className="type-sub3 mt-8">Sending us an enquiry</h2>
          <p className="type-body text-ink-t20">
            When you send an enquiry you are asking us to contact you. We handle
            what you tell us as set out in our{" "}
            <Link href="/legal/privacy-policy" className="font-bold text-sky-dark">privacy notice</Link>.
            Please do not send us sensitive information through this website.
          </p>

          <h2 className="type-sub3 mt-8">Our name and badge</h2>
          <p className="type-body text-ink-t20">
            The school&rsquo;s name, badge and artwork on this site belong to the
            school and may not be reproduced without our permission.
          </p>

          <h2 className="type-sub3 mt-8">Contact</h2>
          <p className="type-body text-ink-t20">
            Questions about these terms: {SCHOOL.contact.email}.
          </p>
        </div>
      </Section>
    </>
  );
}

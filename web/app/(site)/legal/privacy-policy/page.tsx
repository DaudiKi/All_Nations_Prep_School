import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Card";
import { SCHOOL, ADDRESS_LINES } from "@/lib/brand/school";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How All Nations Prep School handles the information you give us.",
  robots: { index: true, follow: true },
};

/**
 * DRAFT. This describes what the website actually does, which is the hard part
 * and is accurate. It has NOT been reviewed by a lawyer, and Uganda's Data
 * Protection and Privacy Act (2019) may impose obligations — including
 * registration with the Personal Data Protection Office — that this does not
 * address. It must be reviewed before launch.
 */
export default function PrivacyPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-site py-14 md:py-20">
          <Pill tone="gold" tilt>Legal</Pill>
          <h1 className="type-display mt-6 text-white">Privacy notice</h1>
        </div>
      </section>

      <Section ground="white">
        <div className="max-w-[68ch]">
          <div className="mb-10 rounded-[var(--radius-card)] border-2 border-gold bg-gold-t94 p-5">
            <p className="type-small m-0 font-bold text-ink">Draft — not yet reviewed</p>
            <p className="type-small mt-2 text-ink">
              This notice describes what the website does today. It has not been
              reviewed by a lawyer and must be before the site goes live.
            </p>
          </div>

          <h2 className="type-sub3">Who we are</h2>
          <p className="type-body text-ink-t20">
            {SCHOOL.name}, {ADDRESS_LINES.join(", ")}. You can reach us at{" "}
            {SCHOOL.contact.email} or on {SCHOOL.contact.phones[0]}.
          </p>

          <h2 className="type-sub3 mt-8">What this website collects</h2>
          <p className="type-body text-ink-t20">
            The only information this website collects is what you type into an
            enquiry form: your name, your phone number, your email address, your
            child&rsquo;s first name, your child&rsquo;s age in years, the section you are
            interested in, and anything you choose to write in the message box.
          </p>
          <p className="type-body text-ink-t20">
            We ask for your child&rsquo;s age in years rather than their date of birth,
            because the year is all we need to advise you on a section.
          </p>

          <h2 className="type-sub3 mt-8">Why we collect it</h2>
          <p className="type-body text-ink-t20">
            To reply to your enquiry and to talk to you about a place for your
            child. We do this because you asked us to, by sending the form and
            ticking the box that says so.
          </p>

          <h2 className="type-sub3 mt-8">Who can see it</h2>
          <p className="type-body text-ink-t20">
            Staff in the school office. We also use suppliers who process it on
            our behalf: a hosting provider for the website, a database provider
            to store the enquiry, and an email provider to send you a
            confirmation and alert the office.
          </p>

          <h2 className="type-sub3 mt-8">How long we keep it</h2>
          <p className="type-body text-ink-t20">
            Enquiries that do not lead to a place are deleted on a schedule.
            Enquiries that do become part of your child&rsquo;s school record.
          </p>

          <h2 className="type-sub3 mt-8">Photographs of children</h2>
          <p className="type-body text-ink-t20">
            We publish a photograph of an identifiable child on this website only
            where we hold written permission from that child&rsquo;s parent or
            guardian. You can withdraw that permission at any time by contacting
            the school, and we will remove the photograph.
          </p>

          <h2 className="type-sub3 mt-8">Your rights</h2>
          <p className="type-body text-ink-t20">
            You can ask us what we hold about you or your child, ask us to
            correct it, or ask us to delete it. Write to {SCHOOL.contact.email} or
            call the school.
          </p>

          <h2 className="type-sub3 mt-8">Cookies</h2>
          <p className="type-body text-ink-t20">
            This website does not set advertising or tracking cookies.
          </p>
        </div>
      </Section>
    </>
  );
}

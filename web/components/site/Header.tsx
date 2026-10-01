import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";
import { NAV } from "./nav";
import { SCHOOL } from "@/lib/brand/school";
import { cms } from "@/lib/cms";

export async function Header() {
  const { announcement } = await cms.settings();

  return (
    <>
      {announcement.enabled ? (
        <div className="bg-ink text-white">
          <div className="container-site flex flex-wrap items-center justify-between gap-2 py-2.5">
            <p className="type-small m-0 font-semibold">
              <Link href={announcement.href} className="text-gold no-underline hover:underline">
                {announcement.text} &rarr;
              </Link>
            </p>
            <a
              href={`tel:${SCHOOL.contact.phones[0].replace(/\s/g, "")}`}
              className="type-small m-0 font-semibold tabular-nums text-white no-underline hover:text-gold"
            >
              {SCHOOL.contact.phones[0]}
            </a>
          </div>
        </div>
      ) : null}

      <header className="sticky top-0 z-40 border-b border-ink-t85 bg-white/95 backdrop-blur">
        <div className="container-site flex items-center justify-between gap-4 py-3">
          <Link href="/" className="no-underline" aria-label={`${SCHOOL.name} — home`}>
            <Logo height={44} clearSpace={0.1} priority />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="m-0 flex list-none items-center gap-7 p-0">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="type-small font-bold text-ink no-underline hover:text-sky-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Button href="/admissions" variant="primary" className="px-6 py-2.5">
              Apply
            </Button>
          </div>

          <MobileNav />
        </div>
      </header>
    </>
  );
}

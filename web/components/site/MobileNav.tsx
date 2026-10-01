"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV } from "./nav";
import { Button } from "@/components/ui/Button";
import { SCHOOL } from "@/lib/brand/school";

/**
 * Mobile navigation.
 *
 * The template export had no `aria-expanded` and no focus management anywhere.
 * This is built keyboard-operable from the start: the trigger announces its
 * state, Escape closes, focus moves into the panel and returns to the trigger,
 * and background scroll is locked while it is open.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-pill)] border-2 border-ink text-ink"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" fill="none">
          {open ? (
            <>
              <path d="M2 2l16 10M18 2L2 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M1 1h18M1 7h18M1 13h18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-[var(--header-h,72px)] z-50 overflow-y-auto bg-white px-5 pb-10 pt-6"
        >
          <nav aria-label="Main">
            <ul className="m-0 list-none p-0">
              {NAV.map((item) => (
                <li key={item.href} className="border-b border-ink-t85">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="type-sub3 block py-4 text-ink no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-7 flex flex-col gap-3">
            <Button href="/admissions" variant="primary">Apply for a place</Button>
            <Button href={`tel:${SCHOOL.contact.phones[0].replace(/\s/g, "")}`} variant="outline">
              {SCHOOL.contact.phones[0]}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

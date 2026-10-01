import { BrandIcon } from "@/components/brand/BrandIcon";
import type { IconName } from "@/lib/brand/assets";

/**
 * Shown where the school has not supplied content yet.
 *
 * Deliberately present rather than hidden: a section that quietly disappears
 * is easy to forget, and this is content someone still has to write. It reads
 * as intentional to a visitor and as a to-do to the school.
 */
export function EmptyState({
  icon = "innovative/cloud", title, body,
}: { icon?: IconName; title: string; body: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-ink-t60 bg-ink-t94 px-6 py-12 text-center">
      <div className="mb-4 flex justify-center">
        <BrandIcon name={icon} alt="" size={48} colourway="ink-gold" />
      </div>
      <p className="type-sub3 text-ink">{title}</p>
      <p className="type-body mx-auto mt-2 max-w-[48ch] text-ink-t20">{body}</p>
    </div>
  );
}

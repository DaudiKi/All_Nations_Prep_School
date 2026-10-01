# Sanity schemas

These mirror `content/types.ts` exactly. They are **not wired up yet** — the
site reads local content through `lib/cms` — but they are written and ready so
the switch is a contained piece of work rather than a redesign.

## To turn Sanity on

1. `npm create sanity@latest -- --project <new> --dataset production`
2. Copy `schemas/` into the studio, or mount the studio at `/studio` in this app.
3. Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and
   `SANITY_API_READ_TOKEN`.
4. Replace the bodies of the methods in `lib/cms/index.ts` with GROQ queries.
   No page changes — every method is already async and returns these shapes.
5. Add a webhook to `/api/revalidate` calling `revalidateTag`.

## Two fields that are doing real work

- **`alt` is required on every image.** The template shipped 805 images with no
  meaningful alt text. Making it required in the schema is the only reliable way
  not to repeat that.
- **`consentOnFile` on testimonials and gallery items.** Photo consent becomes
  part of the editing workflow rather than a policy nobody remembers. `lib/cms`
  filters out anything without it, so a mistake in the studio cannot publish a
  child's photograph.

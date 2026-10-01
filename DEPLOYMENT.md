# Deploying the All Nations Prep School website

The app lives in `web/`. The Framer template export at the repository root is
kept as a visual reference and is **not** deployed.

## 1. Vercel

1. Import `DaudiKi/All_Nations_Prep_School` into Vercel.
2. Set **Root Directory** to `web`. Nothing else needs changing — the framework
   is detected.
3. Add the environment variables below, **separately for Preview and
   Production**.
4. Deploy.

The site builds with none of these set, so a first deploy will succeed before
any account exists. Each variable turns one thing on.

| Variable | Without it | Needed for |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URLs fall back to localhost | Canonical tags, sitemap, robots, OG |
| `DATABASE_URL` | API refuses enquiries in production | Storing enquiries |
| `RESEND_API_KEY` | Emails are logged, not sent | Notifying the office and the parent |
| `MAIL_FROM`, `ADMISSIONS_EMAIL` | Defaults used | Who mail comes from and goes to |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Form unprotected; logs an error | Spam protection |
| `ADMIN_USER`, `ADMIN_PASSWORD` | `/admin/enquiries` disabled | Office access to enquiries |

## 2. Database

Create a Neon Postgres project, copy the **pooled** connection string into
`DATABASE_URL`, then create the table:

```bash
cd web
npx drizzle-kit push      # reads lib/db/schema.ts
```

Enquiries hold children's names and ages. Before launch, agree a retention
period and schedule the deletion of enquiries that never convert.

## 3. Domain and DNS

1. Add the domain in Vercel.
2. Create **exactly the records Vercel shows you** at the registrar. Do not copy
   IP addresses from documentation — Vercel prints the current ones.
3. TLS is issued automatically once DNS resolves.
4. Pick one canonical host (apex or `www`) and redirect the other, so search
   ranking is not split.

For a `.ac.ug` domain, check the current accreditation requirements with a
Ugandan registrar. `.co.ug` and `.com` need no paperwork.

## 4. Email deliverability

The school currently uses a Gmail address. Moving to `admissions@` on the
school's own domain is worth doing at launch — it is what parents expect, and
it makes SPF, DKIM and DMARC setup straightforward so confirmations do not land
in spam. Add the DNS records Resend gives you for the sending domain.

## 5. After launch

- Submit `/sitemap.xml` in Google Search Console.
- Create a Google Business Profile and make its details match the JSON-LD
  exactly (name, address, phone).
- Add error tracking (Sentry) and uptime monitoring that alerts a real phone.
- Schedule database backups.
- Watch Core Web Vitals for a fortnight on real Ugandan mobile networks — a lab
  score will not tell you what a parent on 3G experiences.

## 6. Things to do before you call it live

- [ ] Legal review of `/legal/privacy-policy` and `/legal/terms`
- [ ] Confirm whether registration with Uganda's Personal Data Protection
      Office is required under the Data Protection and Privacy Act (2019)
- [ ] Decide the Arial Rounded MT web licence question
- [ ] Confirm the logo protection-area measure with the designer
- [ ] Replace `ADMIN_USER`/`ADMIN_PASSWORD` basic auth with real accounts if
      more than a couple of people need the enquiry list
- [ ] Swap the in-memory rate limiter for Upstash Redis (see
      `lib/validation/guards.ts` — in-memory is per-instance and so is wrong
      on serverless)

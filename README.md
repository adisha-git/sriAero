# SriAero website

Marketing site for SriAero, a mobile aircraft detailing company based in Calgary, Alberta.

It's built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Framer Motion, and deployed to Vercel. Pages are prerendered; the quote form posts to a route handler that emails enquiries through Resend.

---

## Run locally

Requires **Node.js 20.9 or later**.

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Command           | What it does                                                         |
| ----------------- | -------------------------------------------------------------------- |
| `npm run build`   | Builds the production site                                           |
| `npm run start`   | Serves the production build locally (run `npm run build` first)      |
| `npm run lint`    | Runs ESLint                                                          |
| `npm run images`  | Converts photos in `/images-src` into responsive WebP files          |
| `npm run brand`   | Regenerates the logo, favicons and OG image from `scripts/build-brand.mjs` |

---

## Edit content

### Business details and placeholders: `src/config/site.ts`

This one file holds every placeholder:

- phone, email, hours, response time, address and social links
- founder name, role and bio
- stats (the animated counters), trust-strip claims, certifications and testimonials
- production domain (`site.url`), used for canonical URLs, the sitemap and schema

Every invented value is marked `// PLACEHOLDER – replace with real data`. To find them all:

```bash
grep -rn "PLACEHOLDER" src
```

While `showPlaceholderBadges` is `true`, sample content shows a small amber **SAMPLE** tag on the page so it can't go live unnoticed. Set it to `false` once everything is real.

### Other content

| What                              | Where                          |
| --------------------------------- | ------------------------------ |
| Services and "what's included"    | `src/content/services.ts`      |
| FAQ (also feeds `FAQPage` schema) | `src/content/faq.ts`           |
| Gallery photos and categories     | `src/content/gallery.ts`       |
| Airports on the map and form      | `airports` in `src/config/site.ts` |
| Page titles and meta descriptions | `metadata` at the top of each `src/app/**/page.tsx` |

### Photos

1. Put the original `.jpg` or `.png` in `/images-src`, using a short kebab-case name such as `citation-belly.jpg`.
2. Run `npm run images`. This writes `public/images/citation-belly-{640,1280,1920}.webp` and records the dimensions.
3. Use it as `<Picture name="citation-belly" alt="…" />`, or add it to `src/content/gallery.ts`.
4. Add a line to `public/images/CREDITS.md` if it isn't your own photo.

For real before/after pairs in the gallery, add `before: "your-before-photo"` to a `before-after` item. The slider then uses your photo instead of the simulated weathered version.

---

## Connect the quote form

The form at `/contact/` validates in the browser, then posts JSON to the `/api/contact/` route handler (`src/app/api/contact/route.ts`). The route validates everything again, checks the hidden honeypot field, and emails the enquiry through [Resend](https://resend.com) as plain text, with **Reply-To** set to the visitor's email address. Field options and length limits shared by both sides live in `src/lib/quote.ts`.

It needs three server-side environment variables (see `.env.example`). Never prefix them with `NEXT_PUBLIC_`:

| Variable             | Value                                                                 |
| -------------------- | --------------------------------------------------------------------- |
| `RESEND_API_KEY`     | A Resend API key with sending access                                  |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend, e.g. `SriAero Website <quotes@sriaero.ca>` |
| `CONTACT_TO_EMAIL`   | Inbox that receives enquiries, e.g. `info@sriaero.ca`                 |

### Spam protection

Before anything is sent, `/api/contact/` checks, in order:

1. **Rate limit**: 5 requests per 10 minutes per client IP, shared across all serverless instances through Upstash Redis (`src/lib/contact-security.ts`). Over the limit returns `429` with a `Retry-After` header.
2. **Request size, honeypot and field validation.**
3. **Cloudflare Turnstile**: the widget's token is verified with Cloudflare, including the hostname and the `quote` action. Missing, invalid, expired or reused tokens are rejected.

If Upstash or Cloudflare can't be reached, the email is **not** sent and the visitor sees an error, with their entries kept so they can retry.

| Variable                         | Value                                                                  |
| -------------------------------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key (public by design)                                  |
| `TURNSTILE_SECRET_KEY`           | Turnstile secret key                                                   |
| `TURNSTILE_ALLOWED_HOSTNAMES`    | Optional. Comma-separated; defaults to `www.sriaero.ca,sriaero.ca`     |
| `UPSTASH_REDIS_REST_URL`         | Upstash Redis REST URL (or `KV_REST_API_URL` from the Vercel integration) |
| `UPSTASH_REDIS_REST_TOKEN`       | Upstash Redis REST token (or `KV_REST_API_TOKEN`)                      |

To test locally, put the variables in `.env.local` and run `npm run dev`. Cloudflare's [test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) work outside Vercel production if you set `TURNSTILE_ALLOWED_HOSTNAMES=example.com`. If any variable is missing, the form shows its error message with your phone number and email.

---

## Deploy

The site is a regular Next.js app (not a static export), because the quote form needs a server route.

### Vercel

Import the repository. Vercel detects Next.js, so no extra build settings are needed. Add the three variables above under **Settings → Environment Variables**.

### Before launch

- Set `site.url` in `src/config/site.ts` to the real domain. This affects canonical URLs, the sitemap, `robots.txt` and the JSON-LD schema.
- Replace every placeholder (`grep -rn "PLACEHOLDER" src`) and set `showPlaceholderBadges: false`.
- Have the Privacy Policy (`src/app/privacy/page.tsx`) reviewed against your actual practices.
- Submit `https://your-domain/sitemap.xml` in Google Search Console and create a Google Business Profile.

---

## Project structure

```
images-src/             original photos (input for npm run images)
public/brand/           logo (colour, white, icon), favicon, apple-touch-icon, OG image
public/images/          optimised WebP photos + CREDITS.md
scripts/                build-brand.mjs, optimize-images.mjs
src/app/                routes: /, services, fleet-operators, gallery, about, faq, contact, privacy, sitemap, robots
src/components/home/    home page sections (hero, counters, nose-to-tail, flight path, radar map…)
src/components/layout/  header, footer, preloader, scroll progress, mobile call bar
src/components/ui/      shared pieces (Picture, Button, Reveal, BeforeAfterSlider, PageHero…)
src/components/forms/   QuoteForm
src/config/site.ts      business details and every placeholder
src/content/            services, FAQ, gallery
src/lib/seo.ts          per-page metadata + LocalBusiness schema
```

## Brand

The palette is defined as Tailwind theme tokens in `src/app/globals.css`, so you can use classes like `bg-navy`, `text-horizon`, `text-sky`, `border-aluminium`, `bg-amber` and `bg-cloud`.

| Token     | Hex       | Use                                |
| --------- | --------- | ---------------------------------- |
| navy      | `#0B1B2B` | dark backgrounds, header, footer   |
| horizon   | `#1E4D7B` | primary brand colour, links        |
| sky       | `#8EC5E8` | highlights, icons, text on dark    |
| aluminium | `#C9D1D9` | borders, dividers                  |
| amber     | `#E8A33D` | CTAs and key highlights only       |
| cloud     | `#F5F7FA` | light backgrounds                  |

Fonts are Space Grotesk (headings), Inter (body) and JetBrains Mono (instrument-style labels), loaded through `next/font`.

The logo mark is a forward chevron made of two swept wing slivers, with a four-point glint on the upper surface. All brand files are generated by `npm run brand`; edit the geometry at the top of `scripts/build-brand.mjs`.

## Accessibility and motion

- Every animation respects `prefers-reduced-motion`. Decorative motion stops, and scroll-linked elements show their final state.
- The menus, before/after slider, hotspots, carousel, gallery lightbox and form are all keyboard operable, with visible focus states.
- The colour pairs used for text meet WCAG AA contrast.

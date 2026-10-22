# SriAero website

Marketing site for SriAero, a mobile aircraft detailing company based in Calgary, Alberta.

It's built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Framer Motion, and exported as a fully static site (`output: "export"`). There's no backend: the quote form posts to Formspree or Netlify Forms.

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
| `npm run build`   | Builds the static site into `/out`                                   |
| `npm run preview` | Serves `/out` locally to check the production build                  |
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

The form at `/contact/` validates in the browser, then sends the request to one of two providers. Configure it with environment variables (see `.env.example`):

### Option A: Formspree (default, works on any host)

1. Create a free form at <https://formspree.io> and copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
2. Create `.env.local`:
   ```bash
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```
3. Add the same variable in your host's environment settings (Netlify or Vercel), or set it before running `npm run build` for cPanel uploads.

### Option B: Netlify Forms (Netlify hosting only)

1. Set `NEXT_PUBLIC_FORM_PROVIDER=netlify` and leave `NEXT_PUBLIC_FORM_ENDPOINT` empty.
2. Deploy to Netlify. The form is already marked `data-netlify="true"` with a honeypot field, so Netlify detects it at deploy time.
3. In Netlify, go to **Forms** and turn on email notifications.

If neither is configured, `npm run dev` simulates a successful submission so you can see the "Cleared for takeoff" state. A production build shows an error with your phone number and email instead.

---

## Deploy

`npm run build` produces a self-contained static site in `/out`.

### Netlify

`netlify.toml` is included. Connect the repository in Netlify. The build command (`npm run build`) and publish directory (`out`) are picked up automatically. Add your form environment variable under **Site configuration → Environment variables**.

### Vercel

Import the repository. Vercel detects Next.js and the static export, so no extra settings are needed. Add `NEXT_PUBLIC_FORM_ENDPOINT` under **Settings → Environment Variables**.

### cPanel or any static host

1. Set your form endpoint in `.env.local`.
2. Run `npm run build`.
3. Upload the **contents** of `/out` to `public_html`. The included `.htaccess` sets the 404 page, compression and caching for Apache.

Pages are exported as `/page/index.html` (`trailingSlash: true`), so clean URLs work on plain static hosting with no rewrites.

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

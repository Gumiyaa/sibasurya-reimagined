# PT Siba Surya — Reimagined Website

Production-quality static frontend for PT Siba Surya, a heavy-haulage and industrial logistics company established in 1951. The implementation follows the approved dark industrial design in `SS Reimagined.png`: oversized condensed headlines, thin rules, numbered section markers, asymmetric editorial grids, and a restrained red accent.

The site is a fully static Astro build. It does **not** include a backend, database, CMS, or server-side form handler.

---

## Requirements

- Node.js 20 LTS or newer
- npm 10 or newer
- Windows, macOS, or Linux

The build uses Sharp for Astro image optimisation. The approved install scripts for `sharp` and `esbuild` are declared in `package.json` under `allowScripts`.

---

## Quick start

```bash
npm install
cp .env.example .env        # PowerShell: Copy-Item .env.example .env
npm run dev
```

Development server: <http://localhost:4321/>

If npm blocks package build scripts, approve the two known-safe packages:

```bash
npm approve-scripts sharp esbuild
```

### Commands

| Command           | Purpose                                             |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the Astro development server with HMR        |
| `npm run check`   | Run `astro check` (TypeScript + Astro diagnostics)  |
| `npm run build`   | Build the static site into `dist/`                  |
| `npm run preview` | Preview the production build locally                |
| `npm start`       | Alias for `npm run dev`                             |

### Environment variables

Copy `.env.example` to `.env` and adjust as needed:

| Variable              | Purpose                                                     |
| --------------------- | ----------------------------------------------------------- |
| `PUBLIC_SITE_URL`     | Canonical origin, sitemap, Open Graph URL                   |
| `PUBLIC_API_BASE_URL` | Optional REST API origin. Empty = local data + offline form |

Contact numbers and emails are maintained in `src/data/company.ts` and `src/data/contact.ts` so they can be verified and updated alongside the rest of the company record.

`PUBLIC_*` variables are inlined at build time. Rebuild after changing them.

---

## Routes

| Route                        | Purpose                                                      |
| ---------------------------- | ------------------------------------------------------------ |
| `/`                          | Homepage, sections 01–10                                     |
| `/about/`                    | Company history, operating model, governance                 |
| `/services/`                 | Heavy haulage, dedicated fleet, corridor operations          |
| `/fleet/`                    | Fleet catalogue with capacity filters                        |
| `/fleet/[slug]/`             | Fleet category detail (4 categories)                         |
| `/network/`                  | Depot network, schematic map, corridor table, filters        |
| `/network/[slug]/`           | Branch detail (10 branches)                                  |
| `/values/`                   | AKTIF corporate values and governance                        |
| `/news/`                     | Editorial index with category filters (draft content)        |
| `/news/[slug]/`              | Article template (draft content)                             |
| `/careers/`                  | Vacancy index (draft content)                                |
| `/careers/[slug]/`           | Vacancy detail template (draft content)                      |
| `/contact/`                  | Contact channels, inquiry form, office information           |
| `/en/`                       | Short English overview (`lang="en"`, `noindex`)              |
| `/404.html`                  | Static not-found page (`noindex`)                            |

All internal navigation resolves to real pages. The header exposes the eight numbered reference sections; news and careers live in the utility bar and footer.

---

## Project structure

```text
src/
  assets/
    fonts/              Self-hosted Barlow Condensed + Inter
    images/             Temporary licensed stock placeholders
  components/
    fleet/              FleetCard, FleetFeature
    forms/              ContactForm
    layout/             PageHero, MainFooter
    navigation/         MainHeader, DesktopNavigation, MobileNavigation, LanguageSwitcher
    sections/           Homepage sections 01–09
    seo/                SEO.astro
    ui/                 Buttons, labels, headings, tables, panels, icons
  data/                 Typed local content set
  layouts/              MainLayout, ArticleLayout
  lib/
    api/                Content access boundary + inquiry adapter
    navigation.ts       Active-link helpers
  pages/                File-based routes
  styles/global.css     Design tokens, base styles, layout, prose, forms
  types/                Shared content and icon types
```

### Content and data layer

Content is defined in `src/data/` using TypeScript with strict types from `src/types/index.ts`:

- `company.ts`, `contact.ts`, `navigation.ts`, `statistics.ts`
- `fleet.ts`, `services.ts`, `branches.ts`, `corridors.ts`
- `values.ts`, `news.ts`, `careers.ts`
- `images.ts` — maps local `ImageMetadata` assets

Pages import content through `src/lib/api/index.ts` rather than directly from `src/data/`. The getters use the local typed dataset by default. When `PUBLIC_API_BASE_URL` is set, collection getters can read REST endpoints with a local fallback via `fetchCollection()`.

**Asset limitation:** fleet and news records keep local `ImageMetadata`, because the API boundary does not yet expose an asset resolver. If remote content is introduced, images still need a local or resolver-backed source.

### API contract (optional)

The inquiry adapter expects:

```http
POST {PUBLIC_API_BASE_URL}/inquiries
Content-Type: application/json
```

with the payload defined in `src/lib/api/inquiries.ts` (`name`, `company`, `email`, `phone`, `origin`, `destination`, `commodity`, `volume`, `message`, `inquiryType`).

Expected response:

```json
{ "reference": "SIBA-INQUIRY-0001" }
```

Collection endpoints currently used by the abstraction:

```text
GET /statistics
GET /branches
GET /corridors
GET /values
GET /careers
```

If the API is not configured, the contact form validates locally and honestly reports that **the request was not sent** (`not-configured`). It then offers mailto and telephone fallbacks. It never displays a fake success state and does not store data.

---

## Design system

- **Tokens:** CSS custom properties in `src/styles/global.css`
- **Typography:** Barlow Condensed (display) and Inter (body), self-hosted WOFF2, maximum two families
- **Colour:** near-black ink surfaces, paper text, muted/dim support tones, and a red accent
  - `--accent` is used for fills, borders, and decorative marks.
  - `--accent-ink` is the text-safe accent used wherever red is applied to type, maintaining WCAG AA contrast on every surface token.
- **Layout:** `.shell`, `.section`, asymmetric CSS grids, thin border system
- **Motion:** IntersectionObserver reveal animations that respect `prefers-reduced-motion`
- **Icons:** inline SVG from `src/types/icons.ts`; no icon package ships to the browser
- **Images:** Astro `<Image>` with local assets, responsive widths, lazy loading below the fold, and AVIF/WebP where supported

---

## Assets and placeholder policy

No official Siba Surya photo library or vehicle livery was supplied with the approved design reference. The official logo file (`sibasurya.png`) was provided after development and is now used throughout the site.

- The logo is the official Siba Surya artwork, cropped and resized to 900×793.
- All photography in `src/assets/images/` consists of temporary licensed stock placeholders. No image fabricates Siba Surya vehicle branding or livery.
- Replace the source files in `src/assets/images/` and update `src/data/images.ts` when official assets are available.
- Confirm stock-photo licence terms before public launch, or replace them with owned company photography.
- `public/og-cover.jpg` is a generated 1200×630 social cover; regenerate it if the wordmark or palette changes.
- Barlow Condensed and Inter are distributed under the SIL Open Font License.

---

## Data integrity and publishing policy

Some official company data was not available in the approved reference. In those cases the implementation uses clearly labelled placeholders or omits the claim rather than inventing facts.

- Branch contact details beyond the Semarang headquarters are not published.
- News articles and vacancies are marked as drafts, visibly labelled, and set to `noindex`.
- `/news/` and `/careers/` are excluded from `sitemap-0.xml` until officially verified.
- `/en/` is a short English overview, not a full translation, and is `noindex`.
- The 404 page is `noindex`.
- The contact form has no production backend and does not claim successful delivery.
- Certification scope, fleet availability, commercial terms, and operational statistics must be confirmed by PT Siba Surya before being relied on commercially.

SEO and indexing policy lives in:

- `astro.config.mjs` — sitemap filters
- `src/components/seo/SEO.astro` — canonical, Open Graph, Twitter, Organization JSON-LD
- `src/layouts/MainLayout.astro` — `lang`, `noindex`, article metadata

---

## Verification

Verified locally on Windows with Node.js, using `astro check`, `astro build`, Playwright Core against Microsoft Edge, and Lighthouse.

### Build and type checks

| Check                      | Result                          |
| -------------------------- | ------------------------------- |
| `npm run check`            | 0 errors, 0 warnings, 0 hints  |
| `npm run build`            | Success, 35 static pages        |
| Internal link crawl        | 34 unique links, 0 broken      |
| Route sweep (desktop/mobile) | 35 routes, 0 console/network/image/overflow issues |

Functional checks:

- Desktop navigation: 8 main links, homepage `h1` = “TERBESAR. TERLENGKAP. TERBAIK.”
- Mobile drawer: opens, locks scroll, closes on Escape, hidden after close
- Fleet filter: 4 categories → 1 result; count updates
- News filter: 4 articles → 1 result
- Network filter: 10 branches → search “medan” = 1; Sumatra filter = 4
- Contact form: 5 invalid fields flagged on empty submit; valid submit shows the honest no-backend status and a populated mailto fallback
- No missing image `alt` attributes; no horizontal overflow at 1440px or 390px

### Lighthouse — mobile homepage (local preview)

| Category       | Score |
| -------------- | ----: |
| Performance    |    99 |
| Accessibility  |   100 |
| Best Practices |   100 |
| SEO            |   100 |

Metrics: FCP 1.1 s, LCP 1.1 s, TBT 100 ms, CLS 0, total transfer 233 KiB.

Accessibility was also checked at 100 on sampled internal routes: `/about/`, `/services/`, `/fleet/`, `/fleet/heavy-haulage/`, `/network/`, `/network/semarang/`, `/values/`, `/news/`, `/careers/`, `/careers/sopir-truk-heavy/`, `/contact/`, and `/en/`.

These are local lab measurements, not production field data. Lighthouse scores vary with hardware, network, cache state, and Edge version.

---

## Deployment

The output is a static site in `dist/`.

1. Set `PUBLIC_SITE_URL` to the final public origin.
2. Run `npm run build`.
3. Upload `dist/` to any static host (Nginx, Apache, S3/CloudFront, Netlify, Vercel static, Cloudflare Pages).
4. Configure the host to serve `404.html` for missing routes.
5. Keep trailing slashes enabled (`/about/`, not `/about`).
6. Ensure correct cache headers for hashed `/_astro/*` assets and `public/og-cover.jpg`.

For a subdirectory deployment, adjust Astro’s `base` option before building.

---

## Known limitations

- The approved reference could not be visually inspected by the implementing model; layout was reconstructed through OCR, colour sampling, and programmatic layout analysis, then validated functionally with Playwright. A human design review against `SS Reimagined.png` is still recommended.
- Official photography, logo files, vehicle livery, branch contact details, verified news, and confirmed vacancy data are still pending.
- The inquiry form has no production backend until `PUBLIC_API_BASE_URL` points to a real endpoint.
- Remote API image resolution is not implemented.
- Lighthouse results are local and should be re-run against the deployed origin.

See `IMPLEMENTATION-REPORT.md` for the full implementation and verification record.

# Implementation Report — PT Siba Surya Website

**Project:** PT Siba Surya reimagined frontend  
**Reference:** `SS Reimagined.png`  
**Output:** Static Astro site in `dist/`  
**Date:** 6 November 2026

---

## 1. Objective

Replace the existing site experience with a complete, production-quality frontend that matches the approved dark industrial design direction and fixes the baseline UX, performance, accessibility, content, and route problems recorded in `AUDIT-UX-PERFORMA.md`.

The brief required:

- Astro, TypeScript strict mode, Tailwind CSS v4, Astro Assets, SSG
- No React/Vue/Angular/Bootstrap/jQuery, no backend, no heavy animation libraries
- Homepage sections 01–10 in the approved order
- All internal routes and detail templates
- Centralised data and an API abstraction
- Honest handling of missing official data and backend capabilities
- Actual verification of navigation, links, forms, images, console, responsiveness, TypeScript, and build

---

## 2. What was delivered

### Homepage

Sections implemented in order:

1. Hero — “TERBESAR. TERLENGKAP. TERBAIK.”
2. Operational statistics
3. Company legacy
4. Fleet catalogue preview
5. Services
6. Corridor network
7. AKTIF values
8. Corporate integrity / whistleblowing
9. Contact and inquiry form
10. Footer

### Full route set

| Route | Status |
| --- | --- |
| `/` | Complete |
| `/about/` | Complete |
| `/services/` | Complete |
| `/fleet/` | Complete, with capacity filters |
| `/fleet/[slug]/` | 4 category detail pages |
| `/network/` | Complete, with search, island filters, schematic map |
| `/network/[slug]/` | 10 branch detail pages |
| `/values/` | Complete |
| `/news/` | Complete template with draft content and filters |
| `/news/[slug]/` | 4 article templates |
| `/careers/` | Complete template with draft vacancies |
| `/careers/[slug]/` | 6 vacancy templates |
| `/contact/` | Channels, form, office, whistleblowing, map schematic |
| `/en/` | English overview, `lang="en"`, `noindex` |
| `/404.html` | Custom not-found page, `noindex` |

Total built pages: **35**.

### Architecture

- `src/data/` holds a typed local content set.
- `src/lib/api/index.ts` provides the content access boundary.
- `src/lib/api/client.ts` holds the optional REST client and local fallback.
- `src/lib/api/inquiries.ts` defines the inquiry contract and honest result union: `sent`, `not-configured`, `error`.
- `src/types/index.ts` and `src/types/icons.ts` provide strict shared types.
- `src/styles/global.css` contains design tokens, typography, layout primitives, forms, tables, prose styles, and reduced-motion-aware reveal animation.
- Components are grouped by purpose under `src/components/` and use no client framework.

### Design system

- Two typefaces only: Barlow Condensed and Inter, both self-hosted WOFF2.
- Dark industrial palette with thin rules, numbered labels, asymmetric grids, and red accents.
- `--accent` (`#e21d2e`) remains the visual fill/border red.
- `--accent-ink` (`#ff4d5b`) is used for red text so small labels meet WCAG AA on all surfaces.
- `--dim` was raised to `#8a92a0` to meet contrast requirements.
- Motion is limited to CSS transitions and an IntersectionObserver reveal that respects `prefers-reduced-motion`.
- Icons are inline SVG; no icon package is shipped.

### Accessibility

- Keyboard-accessible mobile drawer with focus trap, Escape close, scroll lock, and `inert`.
- Visible focus states, skip link, semantic landmarks, labelled forms, live form-status region.
- All images checked for `alt` attributes.
- Logo accessible name now matches visible text.
- Contrast remediated across dim labels and red text.
- Network map targets repositioned to satisfy WCAG 2.2 target-size spacing.
- Lighthouse Accessibility: **100** on the homepage and 12 sampled internal routes.

### SEO

- Canonical URLs, Open Graph, Twitter cards, `og-cover.jpg` (1200×630).
- Organization JSON-LD on the site layout; article metadata on detail pages.
- `sitemap-0.xml` includes core routes and excludes `/en/`, `/404`, `/news/`, and `/careers/`.
- Draft news/careers pages are visibly labelled and `noindex`.
- English overview and 404 are `noindex`.

### Performance

- Astro static output and component-scoped CSS.
- Self-hosted fonts with `font-display: swap` and preloads.
- Responsive Astro `<Image>` output; hero prioritised, below-fold images lazy.
- No client-side framework, no icon package, one small form script.
- Local mobile homepage Lighthouse: Performance **99**, LCP **1.1 s**, TBT **100 ms**, CLS **0**, transfer **233 KiB**.

---

## 3. Verification evidence

### Type and build checks

```text
npm run check
Result (72 files):
- 0 errors
- 0 warnings
- 0 hints

npm run build
35 page(s) built
Complete!
```

### Playwright route sweep

Executed against `npm run preview` with Microsoft Edge, at 1440×900 and 390×844:

```text
Routes checked:       35
Issues:                0
Internal links:       34 unique, 0 broken
Console errors:        0
Failed requests:       0
Broken images:         0
Images without alt:    0
Horizontal overflow:   0 at both viewports
```

### Functional tests

| Test | Result |
| --- | --- |
| Desktop navigation | 8 links visible |
| Homepage heading | “TERBESAR. TERLENGKAP. TERBAIK.” |
| Mobile drawer | Opens, scroll locks, Escape closes, hidden after close |
| Fleet filter | 4 categories → 1 visible; count reads “1” |
| News filter | 4 articles → 1 visible |
| Network search | “medan” → 1 branch |
| Network island filter | Sumatra → 4 branches; count reads “4” |
| Contact empty submit | 5 invalid fields flagged |
| Contact valid submit | Honest “belum terkirim” status; mailto/tel fallback visible |
| Mailto fallback | Contains the submitted payload |

### Lighthouse

Homepage, mobile, local preview, Edge headless:

| Category | Score |
| --- | ---: |
| Performance | 99 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Metrics: FCP 1.1 s, LCP 1.1 s, TBT 100 ms, CLS 0, total transfer 233 KiB.

Additional accessibility runs:

```text
/about/                       100
/services/                    100
/fleet/                       100
/fleet/heavy-haulage/         100
/network/                     100
/network/semarang/            100
/values/                      100
/news/                        100
/careers/                     100
/careers/sopir-truk-heavy/    100
/contact/                     100
/en/                          100
```

An earlier `/network/` result of 97 came from overlapping map-node click targets. The schematic positions were redistributed and the target-size audit now passes.

---

## 4. Issues found and fixed during verification

1. **TypeScript error in contact form validation** — `firstInvalid` narrowed to `never`; replaced with a typed `HTMLElement[]` collection.
2. **Mobile horizontal overflow on `/values/`** — oversized CTA heading; reduced font size below 30rem and added `overflow-wrap` to `.display`.
3. **Accessibility contrast** — dim labels failed at 3.45–3.74; raised `--dim` to `#8a92a0`; introduced `--accent-ink` for red text and applied it across 104 declarations.
4. **Logo accessible-name mismatch** — removed the conflicting `aria-label` so the visible wordmark supplies the name.
5. **Network map target size** — overlapping branch links failed WCAG 2.2 target spacing; redistributed map positions and removed the horizontal compression transform.

---

## 5. Data honesty and placeholders

The approved reference did not supply all official operational, editorial, HR, or asset data. The implementation deliberately avoids inventing it.

- No fake news or vacancy facts are presented as verified; both are labelled as drafts and excluded from the sitemap.
- Branch contact data beyond the Semarang headquarters is withheld.
- The inquiry form never fakes a successful submission. Without `PUBLIC_API_BASE_URL`, it reports `not-configured` and provides direct email/telephone fallbacks.
- Photography is temporary licensed stock; no Siba Surya livery is fabricated.
- The logo is a typographic placeholder.
- Certification, fleet availability, and commercial claims remain subject to official confirmation.

---

## 6. Pending items before public launch

| Item | Owner |
| --- | --- |
| Official logo files and brand assets | PT Siba Surya |
| Official photography, including fleet without fabricated branding | PT Siba Surya |
| Confirmed branch addresses and contact channels | PT Siba Surya |
| Verified news articles and publication dates | Communications |
| Verified vacancies and application process | HR |
| Confirmed certifications, validity, and scope | Compliance |
| Production inquiry endpoint and privacy/retention policy | Backend / Legal |
| Human visual comparison against `SS Reimagined.png` | Design |
| Production Lighthouse/field performance run | Engineering |
| Stock-image licence review or replacement | Legal / Brand |

---

## 7. Limitations of this report

- The implementing model cannot view images directly. The reference layout was reconstructed through OCR, colour sampling, and programmatic layout analysis, then validated functionally and with Lighthouse. This is not a substitute for a human visual design review.
- Lighthouse and Playwright results are local lab measurements against a local preview server, not production field data.
- The optional API path is implemented as an abstraction with documented endpoints, but no real backend was available to test end-to-end delivery.
- Build output and scores can shift with dependency updates, hardware, and Edge/Chrome versions.

---

## 8. Conclusion

The frontend is complete, type-safe, statically buildable, navigable, responsive, and honest about unverified data and missing backend capabilities. All required routes and content structures are present, the production build succeeds with 35 pages, and local verification found zero broken links, console errors, failed requests, broken images, missing alt attributes, or horizontal overflow. Accessibility and SEO reach 100 on the homepage in Lighthouse, with Performance 99 on the local mobile profile.

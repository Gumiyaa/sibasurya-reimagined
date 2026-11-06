# PT Siba Surya — Website Reimagined

Website company profile PT Siba Surya: perusahaan transportasi darat muatan berat dan logistik industrial sejak 1951. Dibangun dengan desain industrial gelap, tipografi tegas, dan fokus pada informasi armada, layanan, serta jaringan koridor Jawa–Sumatra.

## Teknologi

- [Astro](https://astro.build) 5 + TypeScript strict
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Astro Assets + Sharp untuk optimasi gambar
- Static Site Generation (SSG), npm

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # type check
npm run build    # build ke dist/
npm run preview  # preview hasil build
```

Copy `.env.example` ke `.env` untuk mengatur `PUBLIC_SITE_URL` dan `PUBLIC_API_BASE_URL` (opsional).

## Halaman

`/` · `/about/` · `/services/` · `/fleet/` · `/network/` · `/values/` · `/news/` · `/careers/` · `/contact/` · `/en/`

Detail tersedia untuk armada, cabang, berita, dan lowongan.

## Struktur

```
src/
  assets/        gambar, logo, font
  components/    UI, layout, navigasi, section
  data/          konten terpusat
  layouts/       kerangka halaman
  lib/api/       lapisan akses konten
  pages/         route Astro
  styles/        token desain + CSS global
```

## Catatan konten

- Logo resmi: `src/assets/images/sibasurya-logo.png` (dari `sibasurya.png`).
- Foto masih stok sementara, tanpa livery Siba Surya.
- Berita dan lowongan masih draft, diberi label, dan `noindex`.
- Form kontak belum terhubung backend produksi; tersedia fallback email/telepon.

# Audit UX & Performa — sibasurya.com

**Tanggal audit:** 6 November 2026
**Cakupan:** Beranda, Tentang Kami, Berita, Karir, Kontak, halaman cabang, versi EN
**Metode:** Lighthouse 12 (Edge headless, lokal), inspeksi HTML/DOM, uji header HTTP, WordPress REST API
**Batasan:** Skor Lighthouse mobile memakai simulasi 4G + CPU 4× lebih lambat. Angka aktual di perangkat pengguna bisa berbeda. PSI publik sedang rate-limit (HTTP 429), jadi pengukuran dilakukan lokal dengan konfigurasi default Lighthouse.

---

## 1. Ringkasan eksekutif

| Halaman | Perf | Aksesibilitas | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Beranda / mobile | **56** | 91 | 96 | 92 |
| Beranda / desktop | 82 | 92 | 96 | 92 |
| Tentang Kami / mobile | 84 | 95 | 100 | 92 |

**Diagnosis singkat:** situs ini bukan lambat karena satu hal, tapi karena **halaman depan membawa 12–17 MB aset** dan **popup yang muncul otomatis justru menjadi elemen LCP** (11,2 detik di mobile). Masalah terbesarnya bukan WordPress-nya, melainkan aset yang tidak dioptimalkan, plugin yang menumpuk, dan beberapa halaman yang isinya kosong.

### 5 temuan paling berdampak

1. **Popup "say no" muncul otomatis 500 ms setelah halaman dibuka** dan gambarnya (615×1024) menjadi elemen LCP. Popup tidak bisa ditutup dengan Esc atau klik overlay.
2. **Berat halaman depan 12,2 MB (mobile) / 17,4 MB (desktop)** — didominasi video hero 3,87 MB dan satu file PNG 2,16 MB.
3. **40 stylesheet + 34 script** dimuat di beranda, mayoritas render-blocking; ada 3–4 library ikon/font yang tumpang tindih.
4. **Halaman Berita kosong** (0 artikel) dan **halaman Karir tidak punya isi lowongan maupun cara melamar** — dua halaman yang masih ada di menu utama.
5. **Halaman Kontak tidak punya form, tautan `tel:`, `mailto:`, atau WhatsApp** — hanya teks dan peta. Tidak ada jalur konversi.

---

## 2. Baseline performa

### Beranda — mobile (Lighthouse, simulated 4G)

| Metrik | Nilai | Target wajar |
|---|---:|---:|
| First Contentful Paint | 5,0 s | < 1,8 s |
| **Largest Contentful Paint** | **11,2 s** | < 2,5 s |
| Speed Index | 17,6 s | < 3,4 s |
| Total Blocking Time | 21 ms | < 200 ms |
| Cumulative Layout Shift | 0,004 | < 0,1 |
| Time to Interactive | 13,7 s | < 3,8 s |
| Server response (TTFB) | 1,71 s | < 0,8 s |
| Total transfer | **12,2 MB** | < 1,5 MB |
| Request | 112 | < 50 |

### Beranda — desktop

| Metrik | Nilai |
|---|---:|
| FCP / LCP | 0,9 s / 1,8 s |
| Speed Index | 16,0 s |
| TBT / CLS | 0 ms / 0,001 |
| TTFB | 1,55 s |
| Total transfer | **17,4 MB** |
| Request | 114 |

> Catatan: desktop mengunduh gambar **12,7 MB** vs 7,5 MB di mobile. Artinya `srcset`/`sizes` belum tepat — desktop justru mendapat kandidat gambar yang jauh lebih besar.

### Rincian berat beranda (mobile)

| Tipe | Request | Transfer |
|---|---:|---:|
| Image | 28 | 7.548 KB |
| Media (video) | 1 | 3.872 KB |
| Script | 34 | 369 KB |
| Font | 6 | 222 KB |
| Stylesheet | 40 | 168 KB |
| Dokumen | 1 | 39 KB |

### File terberat

| File | Ukuran | Catatan |
|---|---:|---|
| `BackgroundHero.mp4` | 3,87 MB | Autoplay, tanpa poster, tetap diunduh di mobile |
| `k5.png` | 2,16 MB | 1458×1473 px, dipakai di bagian "Fakta" |
| `Flat-Bed-...-768x501.png` | 469 KB | |
| `Daf-6x4...-768x435.png` | 438 KB | |
| `light-768x511.png` | 428 KB | |
| `wb_3-2-768x510.png` | 427 KB | |
| `say-no-768x1278.jpg` | 188 KB | Popup — sekaligus elemen LCP |

Format gambar di beranda: **54 referensi PNG + 15 JPG, nol WebP/AVIF**.

---

## 3. Temuan kritis (P0)

### P0-1 — Popup otomatis menjadi LCP dan mengganggu pengalaman

**Bukti:**
- Lighthouse menandai LCP element: `<div id="popmake-3610">` → `figure > img.wp-image-4204` → `say-no-768x1278.jpg`.
- Konfigurasi Popup Maker: `"type":"auto_open"`, `"delay":"500"` (500 ms), cookie 1 bulan.
- `"overlay_click":false`, `"esc_press":false`, `"close":{"text":""}`.
- `role="dialog"` tanpa accessible name.

**Dampak:** pengunjung baru langsung "disambut" poster penuh layar sebelum melihat konten; di mobile popup 615×1024 praktis menutupi seluruh viewport; keyboard/screen reader tidak punya nama dialog; menutup popup membingungkan.

**Rekomendasi:**
- Matikan `auto_open` atau ubah menjadi trigger klik setelah 30 detik, dan jangan tampilkan di mobile.
- Aktifkan `esc_press`, `overlay_click`, dan beri tombol tutup yang jelas.
- Ganti gambar ke WebP ≤ 60 KB, atau jadikan popup berbasis teks + tautan.
- Beri `aria-labelledby` pada dialog.

---

### P0-2 — Berat aset tidak terkendali

**Bukti:**
- 12,2 MB / 112 request (mobile), 17,4 MB / 114 request (desktop).
- Video hero 3,87 MB diunduh meski layar mobile kecil.
- `k5.png` 2,16 MB untuk area yang tampil jauh lebih kecil.
- Semua gambar masih PNG/JPG; tidak ada WebP/AVIF.

**Rekomendasi:**
- Konversi seluruh gambar ke WebP/AVIF dan resize sesuai ukuran tampil. Target: gambar terbesar < 200 KB.
- Video hero: hapus autoplay di mobile, tambahkan `poster` ringan, `preload="none"`, atau ganti dengan gambar statis.
- Perbaiki `srcset`/`sizes` agar desktop tidak mengunduh versi raksasa.
- Aktifkan konversi otomatis (LiteSpeed Cache/ShortPixel/Imagify) sebagai langkah sementara.

---

### P0-3 — Render-blocking dan plugin yang tumpang tindih

**Bukti:**
- **40 stylesheet** dan **34 script** di beranda.
- Lighthouse: "Eliminate render-blocking resources" → potensi hemat **3.539 ms**.
- Contoh: `htmega-global-style.min.css` 48 KB (2.918 ms), `all.min.css` 12 KB (1.268 ms), `font-awesome.min.css` 12 KB (1.118 ms), `jquery.min.js` 29 KB (900 ms).
- Library ikon ganda: Font Awesome 4.7 + Font Awesome 5.15 + Elementor Icons + HT Mega Bootstrap.
- Unused CSS: HT Mega 48 KB, Astra 16+14 KB, Font Awesome 12 KB (×2).
- Unused JS: `smartslider-backgroundanimation.min.js` **109 KB**.
- Contact Form 7 memuat CSS di semua halaman padahal tidak ada form di mana pun.

**Rekomendasi:**
- Audit plugin: HT Mega, Smart Slider 3, Popup Maker, Contact Form 7 — hapus/Nonaktifkan yang tidak dipakai.
- Pilih satu library ikon (mis. ikon SVG inline atau Elementor Icons saja).
- Aktifkan "Generate Critical CSS" + defer JS (LiteSpeed Cache / Perfmatters / Asset CleanUp).
- Muat CSS/JS khusus halaman hanya di halaman terkait.

---

### P0-4 — Halaman Berita kosong

**Bukti:** `GET /wp-json/wp/v2/posts` → **0 post**. Isi halaman `/berita/` hanya heading "Berita" lalu footer. Halaman ini masih ada di menu utama, dan `/feed/` juga kosong.

**Dampak:** pengunjung mengira situs terbengkalai; tidak ada konten segar untuk SEO; link di menu utama berujung jalan buntu.

**Rekomendasi:** isi minimal 6–10 artikel (mis. rute baru, armada, sertifikasi, kegiatan), atau sembunyikan menu Berita sampai siap. Jangan biarkan halaman kosong terindeks.

---

### P0-5 — Halaman Karir tidak fungsional

**Bukti:**
- Tidak ada `<h1>` maupun `<h2>`.
- Isi lowongan dirender sebagai **slider Smart Slider 3** berisi 13 judul (Mekanik Las, Sopir Truk, Sales Executive, IT Developer, dll.).
- Tidak ada deskripsi, kualifikasi, lokasi, tanggal, atau tautan lamaran.
- Tidak ada tautan `mailto:`/form/WhatsApp untuk melamar.

**Dampak:** kandidat tidak bisa mengambil tindakan apa pun; halaman terlihat seperti daftar kata.

**Rekomendasi:** ubah menjadi daftar lowongan (judul, lokasi, tipe, ringkasan, tombol "Lamar"), atau minimal satu blok "Kirim CV ke rekrutmen@…" yang bisa diklik. Tambahkan `h1` dan struktur heading.

---

### P0-6 — Kontak tanpa jalur konversi

**Bukti di `/kontak-id/`:**
- `0` tautan `tel:`, `0` `mailto:`, `0` `wa.me`.
- Tidak ada elemen `<form>` sama sekali.
- Hanya teks "Telp: (024) 6584460", "Email: surya@sibagroup.net", dan iframe Google Maps.
- Tidak ada `<h2>`.

**Dampak:** di mobile, nomor telepon tidak bisa ditekan; prospek harus copy-paste manual. Tidak ada lead capture.

**Rekomendasi:** jadikan nomor `tel:` dan WhatsApp `wa.me/62…`; email `mailto:`; tambahkan form singkat (nama, perusahaan, kebutuhan, kontak) memakai CF7 yang sudah terpasang.

---

## 4. Temuan tinggi (P1)

### P1-1 — TTFB 1,5–1,7 detik, indikasi tanpa page cache

- Root document: **1.711 ms** (mobile), **1.552 ms** (desktop), **1.722 ms** (Tentang Kami).
- Tidak ada header `Cache-Control` pada dokumen HTML dan tidak terlihat `X-LiteSpeed-Cache`.
- Server LiteSpeed + PHP 7.4.33.

**Rekomendasi:** aktifkan full-page cache LiteSpeed, object cache (Redis/Memcached), dan periksa query/plugin yang berat. Target TTFB < 800 ms.

### P1-2 — Gambar tanpa format modern dan tanpa `alt`

- 0 WebP/AVIF di beranda.
- **30 dari 34** `<img>` di beranda punya `alt=""`; Tentang Kami 22, Karir 18.
- Gambar armada, layanan, dan sejarah adalah konten — bukan dekorasi — sehingga wajib punya alt deskriptif.

### P1-3 — Meta sosial & deskripsi tidak ada

- Beranda, Tentang Kami, Berita, Karir, Kontak: **tidak ada `<meta name="description">`**.
- Beranda: **0 tag Open Graph, 0 Twitter Card**.
- Judul EN dan ID sama: "Siba Surya – AKTIF"; halaman EN lain bergaya "Cabang Cilegon en", "Home en".

**Dampak:** preview tautan di WhatsApp/LinkedIn kosong; snippet Google tidak terkontrol.

### P1-4 — Duplikasi www dan non-www

- `https://www.sibasurya.com/` → **200**, tanpa canonical.
- `https://sibasurya.com/` → 200, dengan canonical ke non-www.
- `http://` → 301 ke HTTPS (baik).

**Rekomendasi:** 301 `www` → non-www (atau sebaliknya) di level server, lalu pastikan canonical konsisten.

### P1-5 — Navigasi cabang salah tautan / tidak lengkap

| Label di footer | URL | Kondisi |
|---|---|---|
| Cilegon | `/cabang-cilegon/` | **Halaman EN** (`lang="en-US"`, canonical ke `/en/cabang-cilegon/`). Halaman ID sebenarnya di `/cabang-cilegon-2/` |
| Jambi | `/cabang-tuban-3/` | Isi benar (Cabang Jambi), tapi slug menyesatkan |
| Medan | — | Halaman ada (`/cabang-medan/`) tapi **tidak ada di footer** |

**Rekomendasi:** perbaiki tautan Cilegon ke halaman ID, tambahkan Medan, dan rapikan slug (mis. `/cabang/jambi/`).

### P1-6 — Struktur heading & semantik lemah

| Halaman | H1 | H2 | H3 |
|---|---:|---:|---:|
| Beranda | 1 ("Home") | 8 | 0 |
| Tentang Kami | 1 | 4 | 0 |
| Kontak | 1 | 0 | 0 |
| Karir | **0** | 0 | 0 |
| Berita | 1 | 0 | 0 |

- H1 beranda hanya "Home" — tidak menjelaskan bisnis.
- Lighthouse menandai heading tidak berurutan (h4 melompat).
- Halaman EN memakai H1 "Home en".

### P1-7 — Kualitas terjemahan EN

Contoh: "Biggest Complete Best", "Home en", "Cabang Cilegon en", "Cabang Jambi en". Ini terbaca seperti hasil mesin/label internal, bukan copy untuk pasar Inggris.

---

## 5. Temuan sedang (P2)

| # | Temuan | Bukti / dampak |
|---|---|---|
| 1 | 5 keluarga font | Roboto, Roboto Slab, Montserrat, Noto Sans, Font Awesome; 6 request font / 222 KB |
| 2 | Cache TTL 0 untuk beberapa JS | `index.js`, `waypoints.js`, `jquery-migrate.min.js`, `ss-simple.min.js` → TTL 0 jam |
| 3 | Legacy JavaScript | Lighthouse: potensi hemat 140 ms; ada polyfill untuk browser modern |
| 4 | JS/CSS tidak diminify | Lighthouse: 130 ms (JS), beberapa file belum minified |
| 5 | Header & nav terduplikasi di DOM | 2 `<header>`, 2 `<nav>`, ID `1`–`8` muncul 2–3×; 898 node DOM |
| 6 | Gambar rasio salah | Best Practices menandai "incorrect aspect ratio" |
| 7 | Source map tidak tersedia | Best Practices (minor, tidak berdampak pengguna) |
| 8 | Counter bergantung JS | Angka "Fakta Tentang Kami" dirender "1" sebelum animasi; nilai asli `1951`, `1,6K+`, `13K+`, `400` |
| 9 | Konten sejarah berupa gambar | Tahun 1951–2018 adalah file PNG; tidak terbaca mesin pencari / screen reader |
| 10 | Tidak ada analytics | 0 GA4/GTM/Matomo/Clarity; tidak ada data untuk evaluasi |
| 11 | Touch target kecil | Bullet slider testimoni (`.n2-bullet`) ditandai terlalu kecil |
| 12 | Video `role="presentation"` | Lighthouse: role ARIA tidak kompatibel pada elemen video |
| 13 | Cookie tanpa notice | Cookie `pll_language` diset 1 tahun; belum ada banner/consent |
| 14 | Halaman 404 | Status 404 benar, tapi desain tidak dapat diverifikasi dari crawl |
| 15 | Tidak ada pencarian / breadcrumb | Navigasi hanya 5 item; halaman cabang tidak punya konteks hierarki |

---

## 6. Keamanan & konfigurasi

| Item | Status | Catatan |
|---|---|---|
| HTTPS | ✅ | HTTP → HTTPS 301 |
| HTTP/2–3 | ✅ | `alt-svc: h3` |
| Kompresi | ✅ | Brotli aktif |
| PHP | ⚠️ **7.4.33** | EOL sejak Nov 2022; versi terekspos lewat `X-Powered-By` |
| HSTS | ❌ | Tidak ada |
| CSP / `frame-ancestors` | ❌ | Tidak ada |
| `X-Content-Type-Options` | ❌ | Tidak ada |
| `Referrer-Policy` | ❌ | Tidak ada |
| `Permissions-Policy` | ❌ | Tidak ada |
| Versi WordPress | 7.1.4 | via meta generator |
| REST API | Terbuka | Normal, tapi sebaiknya batasi endpoint yang tidak perlu |
| Sitemap | ✅ | `/wp-sitemap.xml` |

**Rekomendasi:** upgrade PHP ke 8.2/8.3, sembunyikan `X-Powered-By`, tambahkan header keamanan, dan batasi akses `wp-json` bila tidak dipakai publik.

---

## 7. Yang sudah bagus

- **CLS hampir nol** (0,004) — layout tidak melompat saat load.
- **TBT sangat rendah** (21 ms) — masalahnya bukan JavaScript berat, tapi aset dan render-blocking.
- HTTPS, HTTP/3, dan Brotli sudah aktif.
- **Tidak ada third-party tracker** yang membebani (tapi juga berarti tidak ada analytics).
- `hreflang` sudah terpasang (6 entri) dan sitemap tersedia.
- Struktur URL cabang cukup rapi, hanya beberapa pengecualian.
- Jumlah halaman sedikit (32 halaman: 16 ID + 16 EN) — ini aset, karena rebuild akan relatif murah.

---

## 8. Roadmap perbaikan

### Quick wins — 1–3 hari

1. Matikan auto-popup; perbaiki tombol tutup + Esc + klik overlay; ganti gambar popup ke WebP.
2. Kompres & resize gambar (prioritas `k5.png`, foto armada, hero).
3. Ganti video hero dengan poster/gambar di mobile; `preload="none"`.
4. Aktifkan LiteSpeed full-page cache; ukur ulang TTFB.
5. Tambah `tel:`, `mailto:`, WhatsApp, dan form kontak.
6. Perbaiki tautan Cilegon, tambahkan Medan, rapikan slug Jambi.
7. Tambah meta description + Open Graph di semua halaman.
8. Isi `alt` untuk gambar konten.
9. 301 `www` → non-www.
10. Hapus/nonaktifkan plugin & library yang tidak dipakai.

### Jangka menengah — 2–6 minggu

1. Restrukturisasi IA: halaman **Layanan**, **Armada**, **Cabang**, **Berita**, **Karir** yang benar-benar berisi.
2. Rencana konten Berita (min. 1 artikel/bulan) dan halaman Karir dengan alur lamaran.
3. Audit ulang plugin; satukan ikon dan font (target ≤ 2 keluarga).
4. Critical CSS + defer JS + pemisahan aset per halaman.
5. Perbaiki struktur heading, landmark, dan urutan fokus.
6. Rapikan terjemahan EN (bukan sekadar label "en").
7. Pasang analytics + Search Console.

### Jangka panjang — rebuild

Dengan hanya 32 halaman dan kebutuhan utama profil + kontak + karier, situs statis (Astro/Next) atau WordPress yang dirapikan bisa mencapai:

| Metrik | Sekarang (mobile) | Target |
|---|---:|---:|
| Berat halaman | 12,2 MB | < 800 KB |
| Request | 112 | < 40 |
| LCP | 11,2 s | < 2,0 s |
| TTFB | 1,7 s | < 0,5 s |
| Skor performa | 56 | > 90 |

Rebuild bukan keharusan untuk memperbaiki semua masalah di atas — 70% perbaikan bisa dilakukan di instalasi WordPress saat ini.

---

## 9. Prioritas berdasarkan dampak vs usaha

| Prioritas | Aksi | Dampak | Usaha |
|---|---|---|---|
| 🔴 1 | Matikan/benahi popup | Tinggi | Rendah |
| 🔴 2 | Optimasi gambar + video | Tinggi | Sedang |
| 🔴 3 | Aktifkan page cache | Tinggi | Rendah |
| 🔴 4 | Isi Berita & Karir | Tinggi | Sedang |
| 🟠 5 | Form + tautan kontak | Tinggi | Rendah |
| 🟠 6 | Meta description + OG | Sedang | Rendah |
| 🟠 7 | Kurangi plugin/CSS/JS | Sedang | Sedang |
| 🟡 8 | Aksesibilitas (alt, heading, dialog) | Sedang | Rendah |
| 🟡 9 | Perbaikan tautan cabang | Sedang | Rendah |
| 🟡 10 | Header keamanan + PHP 8 | Sedang | Rendah |

---

## 10. Lampiran — cara mereproduksi

```bash
# Skor & metrik
npx lighthouse@12 https://sibasurya.com/ --output=json --output-path=lh.json

# Inventaris konten
curl https://sibasurya.com/wp-json/wp/v2/posts?per_page=100
curl https://sibasurya.com/wp-json/wp/v2/pages?per_page=100

# Header & kompresi
curl -I https://sibasurya.com/
```

Data mentah Lighthouse yang dipakai untuk audit ini:
`lh-home-mobile.json`, `lh-home-desktop.json`, `lh-about-mobile.json`
(lokasi: `C:\Users\lovan\AppData\Local\Temp\opencode\`)

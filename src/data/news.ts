import type { NewsArticle } from '@/types';
import { images } from './images';

/**
 * The previous site had no published news posts. These editorial drafts are
 * clearly labelled as drafts in the interface. They contain no invented
 * company events, dates or claims and exist so the listing/detail templates
 * can be reviewed. Replace with official editorial content before launch.
 */
export const newsArticles: NewsArticle[] = [
  {
    slug: 'tujuh-dekade-logistik-industrial',
    title: 'Tujuh dekade logistik industrial dari Semarang',
    excerpt:
      'Perjalanan panjang transportasi muatan berat tidak dibangun oleh satu unit truk, melainkan oleh disiplin pemeliharaan, tata kelola pengemudi, dan konsistensi pengiriman.',
    category: 'Rekam Jejak',
    status: 'draft',
    publishedAt: null,
    readingTime: '5 menit',
    image: images.heroNight,
    alt: 'Truk trailer melintas di jalan pegunungan pada malam hari',
    body: [
      'Sejak 1951, PT Siba Surya tumbuh bersama laju industrialisasi Republik Indonesia. Berawal dari angkutan lokal di Semarang, perusahaan bertransformasi menjadi bagian dari mobilitas industri baja, semen, kertas, dan manufaktur berat nasional.',
      'Pertumbuhan itu tidak hanya diukur dari jumlah unit. Yang lebih penting adalah kemampuan menjaga standar pemeliharaan, keselamatan, dan ketepatan waktu ketika volume muatan meningkat dan lintasan bertambah panjang.',
      'Hari ini jaringan operasional menghubungkan pelabuhan, sentra manufaktur, dan hub distribusi di Jawa dan Sumatra. Setiap perjalanan tetap bertumpu pada prinsip yang sama: muatan sampai utuh, tepat waktu, dan dapat dipertanggungjawabkan.',
    ],
  },
  {
    slug: 'membaca-kapabilitas-heavy-haulage',
    title: 'Membaca kapabilitas armada heavy haulage 55–65 ton',
    excerpt:
      'Kapasitas tonase bukan satu-satunya ukuran. Konfigurasi axle, pengamanan kargo, dan telemetri menentukan apakah sebuah muatan berat dapat bergerak dengan aman.',
    category: 'Armada',
    status: 'draft',
    publishedAt: null,
    readingTime: '4 menit',
    image: images.truckRoad,
    alt: 'Truk trailer melintas di jalan pada malam hari',
    body: [
      'Untuk komoditas seperti steel coil, pelat baja kapal, dan tiang pancang beton pracetak, pemilihan armada tidak bisa dilakukan hanya dengan melihat angka tonase. Diperlukan pemahaman tentang distribusi beban, titik pengikatan, dan geometri lintasan.',
      'Kategori heavy haulage menggunakan konfigurasi tri-axle dengan platform 12.000–14.500 mm. Heavy lashing chains dan winch coil well disiapkan untuk menjaga kargo tetap pada posisinya selama perjalanan.',
      'Lapisan pengawasan berikutnya adalah telemetri. GPS 24/7 dan speed governor membantu command desk membaca perilaku perjalanan, sementara pos checkpoint fisik memeriksa kondisi kendaraan dan pengemudi.',
    ],
  },
  {
    slug: 'disiplin-preventive-maintenance',
    title: 'Disiplin preventive maintenance di balik ketepatan waktu',
    excerpt:
      'Armada yang tidak dirawat dengan benar akan mengubah jadwal pengiriman menjadi risiko. Karena itu pemeliharaan tidak dialihdayakan.',
    category: 'Operasional',
    status: 'draft',
    publishedAt: null,
    readingTime: '4 menit',
    image: images.mechanic,
    alt: 'Mekanik memeriksa komponen mesin truk',
    body: [
      'Dalam angkutan muatan berat, breakdown di jalan nasional bukan sekadar keterlambatan. Ia dapat memengaruhi keselamatan, biaya, dan kepercayaan klien terhadap rantai pasok.',
      'Central Workshop di Semarang menjadi bagian dari arsitektur operasional: mekanik bersertifikat, mesin kalibrasi rem, stok suku cadang orisinal, dan mobile rescue unit yang siaga.',
      'Pendekatan ini menempatkan pemeliharaan sebagai fungsi preventif, bukan reaktif. Pemeriksaan dilakukan sebelum kerusakan menjadi kegagalan di lintasan.',
    ],
  },
  {
    slug: 'manifest-digital-dan-e-pod',
    title: 'Manifest digital dan e-POD untuk rantai pasok korporat',
    excerpt:
      'Integrasi ERP mempersingkat jarak antara keberangkatan armada dan konfirmasi serah terima barang di sistem pelanggan.',
    category: 'Teknologi',
    status: 'draft',
    publishedAt: null,
    readingTime: '3 menit',
    image: images.steelWarehouse,
    alt: 'Barisan material baja di dalam gudang industri',
    body: [
      'Bagi tim supply chain, informasi yang terlambat sama mahalnya dengan barang yang terlambat. Karena itu manifest digital dan Proof of Delivery elektronik menjadi bagian penting dari layanan angkutan industri.',
      'Sistem terpadu menghubungkan pemesanan ritase, penugasan armada, pelacakan muatan, dan penerbitan e-POD. Data perjalanan dapat diakses oleh tim klien tanpa entri ulang.',
      'Arah pengembangannya jelas: mengurangi friksi administrasi, menjaga akurasi manifest, dan memberi visibilitas yang lebih baik pada setiap tahap pengiriman.',
    ],
  },
];

export const newsBySlug = Object.fromEntries(newsArticles.map((article) => [article.slug, article]));
export const newsCategories = ['Semua', 'Rekam Jejak', 'Armada', 'Operasional', 'Teknologi'];

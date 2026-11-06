import type { Vacancy } from '@/types';

/**
 * Vacancy titles are based on the public career listing referenced in the
 * UX/performance audit. Full descriptions are editorial placeholders and are
 * marked as drafts until HR verifies location, contract type and requirements.
 */
export const vacancies: Vacancy[] = [
  {
    slug: 'mekanik-las',
    title: 'Mekanik Las',
    department: 'Workshop & Maintenance',
    location: 'Semarang, Jawa Tengah',
    type: 'Penuh waktu',
    experience: 'Pengalaman 2+ tahun',
    summary:
      'Melakukan perawatan dan perbaikan struktur rangka trailer, pengelasan komponen berat, serta inspeksi keselamatan unit sebelum beroperasi.',
    responsibilities: [
      'Pengelasan dan perbaikan struktur trailer serta komponen pendukung.',
      'Inspeksi kondisi rangka, sambungan, dan titik pengikatan kargo.',
      'Mendokumentasikan pekerjaan pemeliharaan sesuai prosedur workshop.',
    ],
    requirements: [
      'Pengalaman pengelasan industri atau kendaraan berat.',
      'Memahami standar keselamatan kerja bengkel.',
      'Bersedia ditempatkan di Semarang.',
    ],
    status: 'draft',
  },
  {
    slug: 'sopir-truk-heavy',
    title: 'Sopir Truk Heavy Haulage',
    department: 'Fleet Operations',
    location: 'Semarang · koridor Jawa & Sumatra',
    type: 'Penuh waktu',
    experience: 'SIM B2 Umum aktif',
    summary:
      'Mengoperasikan unit heavy haulage untuk pengiriman material industri antar plant, pelabuhan, dan proyek di koridor operasional perusahaan.',
    responsibilities: [
      'Menjalankan ritase sesuai manifest dan instruksi dispatch.',
      'Melakukan pemeriksaan kendaraan sebelum dan sesudah perjalanan.',
      'Menjaga disiplin waktu, keselamatan, dan integritas muatan.',
    ],
    requirements: [
      'SIM B2 Umum yang masih berlaku.',
      'Pengalaman mengemudikan truk berat atau trailer.',
      'Memahami rute Pantura dan/atau lintas Sumatra menjadi nilai tambah.',
    ],
    status: 'draft',
  },
  {
    slug: 'sales-executive',
    title: 'Sales Executive',
    department: 'Commercial',
    location: 'Semarang / Jakarta',
    type: 'Penuh waktu',
    experience: 'Pengalaman B2B 2+ tahun',
    summary:
      'Mengembangkan kemitraan dengan pelanggan korporat manufaktur, logistik, dan proyek infrastruktur untuk kebutuhan angkutan muatan berat.',
    responsibilities: [
      'Menyusun pipeline pelanggan korporat dan rencana penetrasi pasar.',
      'Menyiapkan proposal penawaran bersama tim dispatch.',
      'Menjaga hubungan jangka panjang dengan klien industri.',
    ],
    requirements: [
      'Pengalaman penjualan B2B, diutamakan logistik atau industri.',
      'Kemampuan komunikasi dan negosiasi yang kuat.',
      'Bersedia melakukan perjalanan dinas.',
    ],
    status: 'draft',
  },
  {
    slug: 'it-developer',
    title: 'IT Developer',
    department: 'Information Technology',
    location: 'Semarang, Jawa Tengah',
    type: 'Penuh waktu',
    experience: 'Pengalaman 2+ tahun',
    summary:
      'Mengembangkan dan memelihara integrasi sistem operasional, dashboard telemetri, serta antarmuka pelaporan untuk tim dispatch dan pelanggan.',
    responsibilities: [
      'Membangun integrasi API dengan sistem ERP dan mitra.',
      'Memelihara dashboard operasional dan pelaporan.',
      'Berkolaborasi dengan tim operasional untuk menerjemahkan kebutuhan lapangan.',
    ],
    requirements: [
      'Menguasai JavaScript/TypeScript atau bahasa backend yang relevan.',
      'Memahami REST API, basis data, dan dasar keamanan aplikasi.',
      'Pengalaman dengan sistem logistik menjadi nilai tambah.',
    ],
    status: 'draft',
  },
  {
    slug: 'admin-operasional',
    title: 'Admin Operasional',
    department: 'Operations Support',
    location: 'Semarang, Jawa Tengah',
    type: 'Penuh waktu',
    experience: 'Pengalaman 1+ tahun',
    summary:
      'Mendukung administrasi manifest, penjadwalan ritase, dan koordinasi dokumen perjalanan bersama tim dispatch dan workshop.',
    responsibilities: [
      'Menyiapkan dan memverifikasi dokumen manifest.',
      'Mengoordinasikan jadwal dengan pengemudi dan tim lapangan.',
      'Menyimpan rekam jejak operasional secara tertib.',
    ],
    requirements: [
      'Teliti, terorganisir, dan mampu bekerja dengan tenggat.',
      'Menguasai spreadsheet dan aplikasi administrasi.',
      'Bersedia bekerja dalam shift operasional.',
    ],
    status: 'draft',
  },
  {
    slug: 'safety-officer',
    title: 'Safety Officer',
    department: 'HSE & Compliance',
    location: 'Semarang · perjalanan dinas',
    type: 'Penuh waktu',
    experience: 'Pengalaman 2+ tahun',
    summary:
      'Menjaga penerapan standar keselamatan armada, audit checkpoint, serta kepatuhan terhadap prosedur ISO 39001 dan ISO 9001.',
    responsibilities: [
      'Melakukan audit keselamatan kendaraan dan perjalanan.',
      'Menyusun laporan insiden dan tindak lanjut perbaikan.',
      'Melatih pengemudi dan staf lapangan terkait prosedur keselamatan.',
    ],
    requirements: [
      'Pemahaman sistem manajemen keselamatan lalu lintas.',
      'Pengalaman audit lapangan di lingkungan transportasi atau industri.',
      'Kemampuan komunikasi dan pelaporan yang baik.',
    ],
    status: 'draft',
  },
];

export const vacanciesBySlug = Object.fromEntries(vacancies.map((vacancy) => [vacancy.slug, vacancy]));

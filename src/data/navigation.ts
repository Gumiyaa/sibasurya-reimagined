import type { NavigationItem } from '@/types';

export const mainNavigation: NavigationItem[] = [
  {
    index: '01',
    label: 'Beranda',
    href: '/',
    description: 'Halaman utama PT Siba Surya',
  },
  {
    index: '02',
    label: 'Sejarah',
    href: '/about/',
    description: 'Rekam jejak perusahaan sejak 1951',
  },
  {
    index: '03',
    label: 'Armada',
    href: '/fleet/',
    description: 'Katalog kapabilitas armada',
  },
  {
    index: '04',
    label: 'Layanan',
    href: '/services/',
    description: 'Arsitektur layanan terintegrasi',
  },
  {
    index: '05',
    label: 'Rute',
    href: '/network/',
    description: 'Jaringan cabang dan koridor',
  },
  {
    index: '06',
    label: 'Nilai',
    href: '/values/',
    description: 'Nilai AKTIF dan budaya perusahaan',
  },
  {
    index: '07',
    label: 'Tata Kelola',
    href: '/values/#integritas',
    description: 'Komitmen integritas dan whistleblowing',
  },
  {
    index: '08',
    label: 'Kontak',
    href: '/contact/',
    description: 'Konsultasi kontrak angkutan',
  },
];

export const utilityNavigation: NavigationItem[] = [
  { index: 'N1', label: 'Berita', href: '/news/', description: 'Kabar dan editorial perusahaan' },
  { index: 'N2', label: 'Karir', href: '/careers/', description: 'Peluang kerja di Siba Surya' },
];

export const footerNavigation = {
  perusahaan: [
    { label: 'Tentang Kami', href: '/about/' },
    { label: 'Nilai AKTIF', href: '/values/' },
    { label: 'Berita', href: '/news/' },
    { label: 'Karir', href: '/careers/' },
  ],
  layanan: [
    { label: 'Katalog Armada', href: '/fleet/' },
    { label: 'Layanan Terintegrasi', href: '/services/' },
    { label: 'Jaringan Cabang', href: '/network/' },
    { label: 'Kontak Dispatch', href: '/contact/' },
  ],
  armada: [
    { label: 'Heavy Haulage · 55–65 Ton', href: '/fleet/heavy-haulage/' },
    { label: 'Medium Carrier · 35–45 Ton', href: '/fleet/medium-carrier/' },
    { label: 'Light Flatbed · 20–25 Ton', href: '/fleet/light-flatbed/' },
    { label: 'Wingbox Enclosed · 25 Ton', href: '/fleet/wingbox-enclosed/' },
  ],
} as const;

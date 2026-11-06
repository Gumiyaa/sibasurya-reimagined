import type { ContactChannel } from '@/types';

export const contact = {
  channels: [
    {
      label: 'Telepon sentral',
      value: '(024) 6584460',
      href: 'tel:+62246584460',
      note: 'Senin–Sabtu · jam kerja operasional',
    },
    {
      label: 'Email dispatch',
      value: 'surya@sibagroup.net',
      href: 'mailto:surya@sibagroup.net?subject=Permintaan%20penawaran%20angkutan',
      note: 'Untuk permintaan penawaran & dokumen',
    },
    {
      label: 'Kantor pusat',
      value: 'Jl. Terboyo No. 7, Genuk, Semarang',
      href: '/contact/#kantor',
      note: 'Jawa Tengah 50112',
    },
  ] satisfies ContactChannel[],
  whistleblowing: {
    label: 'Whistleblowing GCG',
    value: '0813 9343 5205',
    href: 'https://wa.me/6281393435205',
    note: 'Kerahasiaan laporan dijamin sesuai kode etik pengawasan internal.',
  } satisfies ContactChannel,
  inquiryOptions: [
    'Kontrak angkutan jangka panjang',
    'Dedicated fleet / ritase harian',
    'Angkutan material curah berat',
    'Konsultasi rute & kapasitas',
    'Lainnya',
  ],
  commodityOptions: [
    'Besi & baja / steel coil',
    'Semen & bahan konstruksi',
    'FMCG / kertas / plastik',
    'Alat berat & mesin industri',
    'Kargo umum industri',
  ],
  formNote:
    'Formulir ini belum terhubung ke backend produksi. Setelah validasi, permintaan akan diteruskan ke tim dispatch melalui kanal resmi.',
  responseNote: 'Tim dispatch akan merespons pada jam operasional. Untuk urgensi, gunakan telepon sentral.',
} as const;

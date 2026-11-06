import type { CorporateValue, LeaderQuote } from '@/types';

export const values: CorporateValue[] = [
  {
    index: '01',
    letter: 'A',
    title: 'Adaptasi',
    english: 'Adaptability',
    description:
      'Fleksibilitas tanggap dalam menghadapi dinamika regulasi perhubungan, medan lintasan, serta kebutuhan spesifik industri klien.',
  },
  {
    index: '02',
    letter: 'K',
    title: 'Kerja Sama',
    english: 'Collaboration',
    description:
      'Sinergi kokoh lintas divisi lapangan dan kemitraan kolaboratif jangka panjang dengan korporasi manufaktur terbesar.',
  },
  {
    index: '03',
    letter: 'T',
    title: 'Tangguh',
    english: 'Resilience',
    description:
      'Daya tahan fisik armada dan ketangguhan mental tim dalam mengatasi kondisi cuaca dan tantangan rute lintas pulau.',
  },
  {
    index: '04',
    letter: 'I',
    title: 'Integritas',
    english: 'Integrity',
    description:
      'Kejujuran mutlak, transparansi faktual, penegakan disiplin kargo, dan zero tolerance terhadap suap atau kecurangan.',
  },
  {
    index: '05',
    letter: 'F',
    title: 'Fokus pada Pelanggan',
    english: 'Customer focus',
    description:
      'Konsentrasi tanpa kompromi pada keselamatan pengemudi, keutuhan tonase muatan, dan ketepatan waktu pengiriman.',
  },
];

export const leadershipQuotes: LeaderQuote[] = [
  {
    index: '01',
    quote: 'Sukses adalah beranjak dari kegagalan ke kegagalan tanpa kehilangan antusiasme.',
    name: 'Stefanus Suryaatmadja',
    role: 'Presiden Direktur',
  },
  {
    index: '02',
    quote: 'Tanpa disiplin dan kerja keras tidak akan ada perbaikan.',
    name: 'Daniel Setiawan',
    role: 'Presiden Komisaris',
  },
  {
    index: '03',
    quote: 'Inspirasi merupakan anugerah dari kerja keras dan fokus.',
    name: 'Markus Suryaatmadja',
    role: 'Direktur Keuangan',
  },
];

export const integrityStatement = {
  eyebrow: 'Komitmen integritas · Siba Surya',
  headline: 'Menolak segala bentuk suap, pungli, dan gratifikasi.',
  body: 'Kami berkomitmen mewujudkan kemitraan industri yang bersih, transparan, dan berintegritas penuh. Mohon untuk tidak memberikan imbalan, uang tips, hadiah, atau pemberian dalam bentuk apa pun kepada seluruh jajaran pengemudi, staf lapangan, maupun manajemen kami atas pelayanan yang diberikan.',
  note: 'Laporan Anda dijamin kerahasiaannya sesuai kode etik pengawasan internal direksi.',
} as const;

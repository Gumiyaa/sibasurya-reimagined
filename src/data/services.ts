import type { ServiceItem } from '@/types';
import { images } from './images';

export const services: ServiceItem[] = [
  {
    index: '01',
    kicker: 'Fleet informatics · real-time surveillance',
    title: 'Sistem Pemantauan & Pos Checkpoint 24/7',
    description:
      'Setiap muatan yang keluar dari plant klien dikawal oleh pos pemantauan fisik yang tersebar di sepanjang lintasan Pantura dan Sumatra. Pos-pos ini mencatat kondisi fisik ban, baut gandar, terpal muatan, serta kesehatan pengemudi secara berkala.',
    bullets: [
      '24/7 command desk di Semarang Fleet HQ',
      '50+ pos pantau fisik di koridor Pantura',
      'Sensor kecepatan, idle time, dan fatigue monitor',
    ],
    metrics: [
      { label: 'Command desk', value: 'Semarang HQ · 24/7' },
      { label: 'Jaringan fisik', value: '50+ pos pantau' },
      { label: 'Sertifikasi', value: 'ISO 39001 · ISO 9001' },
    ],
    image: images.controlRoom,
    alt: 'Operator memantau layar di ruang kendali industri',
  },
  {
    index: '02',
    kicker: 'Engineering rigor · preventive workshop',
    title: 'Bengkel Mandiri & Preventive Maintenance',
    description:
      'Kami tidak mengalihdayakan pemeliharaan armada ke pihak ketiga. Central Workshop di Semarang didukung tim mekanik bersertifikat, mesin kalibrasi rem, dan stok suku cadang orisinal pabrikan untuk meniadakan potensi breakdown di jalan nasional.',
    bullets: [
      'Central Workshop Terboyo, Semarang',
      'Mekanik bersertifikat & kalibrasi rem',
      'Mobile rescue unit siaga 24 jam',
    ],
    metrics: [
      { label: 'Fasilitas', value: 'Central Workshop Terboyo' },
      { label: 'Recovery', value: 'Mobile rescue 24 jam' },
      { label: 'Suku cadang', value: 'OEM parts' },
    ],
    image: images.mechanic,
    alt: 'Mekanik memeriksa mesin truk di bengkel',
  },
  {
    index: '03',
    kicker: 'Enterprise ERP · automated manifest',
    title: 'Komputerisasi ERP & Automated Manifest',
    description:
      'Sistem terpadu enterprise yang menghubungkan pemesanan ritase, penugasan armada, pelacakan muatan pelanggan korporat, hingga penerbitan Proof of Delivery (e-POD) instan yang terintegrasi langsung dengan rantai pasok manufaktur.',
    bullets: [
      'Integrasi corporate ERP API',
      'Manifest digital tanpa entri ulang',
      'e-POD instan untuk tim supply chain klien',
    ],
    metrics: [
      { label: 'Integrasi', value: 'Supply chain API' },
      { label: 'Dokumen', value: 'Automated manifest' },
      { label: 'Arsitektur', value: 'Zero manifest error' },
    ],
    image: images.steelWarehouse,
    alt: 'Gudang baja dengan barisan material industri tertata',
  },
];

export const operationalSteps = [
  {
    index: '01',
    title: 'Permintaan & perencanaan',
    description:
      'Tim dispatch memetakan asal-tujuan, tonase, dimensi kargo, dan kebutuhan penanganan khusus sebelum alokasi unit.',
  },
  {
    index: '02',
    title: 'Alokasi armada',
    description:
      'Kategori armada dipilih berdasarkan kapasitas, konfigurasi axle, dan kesesuaian rute. Manifest digital diterbitkan sebelum keberangkatan.',
  },
  {
    index: '03',
    title: 'Pengawalan & telemetri',
    description:
      'Perjalanan dipantau melalui command desk, pos checkpoint fisik, dan sensor kendaraan. Deviasi rute ditindaklanjuti segera.',
  },
  {
    index: '04',
    title: 'Serah terima & e-POD',
    description:
      'Bongkar-muat diverifikasi di lokasi tujuan. Proof of Delivery diterbitkan dan dikirim ke sistem rantai pasok klien.',
  },
] as const;

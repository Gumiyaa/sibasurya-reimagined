import type { FleetCategory } from '@/types';
import { images } from './images';

/**
 * Capacity bands, axle configuration and equipment notes are reproduced from
 * the approved design reference. They must be validated against the official
 * fleet register before the site goes live.
 */
export const fleetCategories: FleetCategory[] = [
  {
    slug: 'heavy-haulage',
    code: 'FLT-HVY-01',
    name: 'Heavy Haulage Trailer',
    shortName: 'Heavy',
    capacity: '55–65 Ton',
    capacityKg: '55.000–65.000 kg',
    axle: '3-axle tri-axle',
    flagship: true,
    description:
      'Didesain spesifik untuk mobilitas komoditas industri terberat tanpa risiko: kumparan baja (steel coils), pelat baja kapal, tiang pancang beton pracetak, dan mesin industri berskala besar.',
    commodities: ['Steel coil', 'Pelat baja', 'Tiang pancang beton', 'Mesin industri'],
    useCases: [
      'Pengiriman direct dari plant baja ke pelabuhan atau pabrik hilir',
      'Proyek infrastruktur dengan muatan oversize dan tonase tinggi',
      'Dedicated fleet untuk ritase harian manufaktur berat',
    ],
    specs: [
      { label: 'Daya muat maksimal', value: '55.000–65.000 kg' },
      { label: 'Panjang platform', value: '12.000–14.500 mm (40–45 ft)' },
      { label: 'Tipe / axle', value: '3-axle tri-axle heavy steel' },
      { label: 'Pengamanan kargo', value: 'Heavy lashing chains & winch coil well' },
      { label: 'Telemetri sistem', value: 'GPS 24/7 dual-server & speed governor' },
    ],
    image: images.heroNight,
    alt: 'Truk muatan berat melintas di jalan pegunungan pada malam hari',
  },
  {
    slug: 'medium-carrier',
    code: 'FLT-MED-02',
    name: 'Medium Carrier',
    shortName: 'Medium',
    capacity: '35–45 Ton',
    capacityKg: '35.000–45.000 kg',
    axle: 'Rigid, tronton & trailer 2-axle',
    description:
      'Unit multi-axle carrier untuk distribusi volume tinggi komoditas industri struktural, kargo curah kering berkarung, dan semen kemasan.',
    commodities: ['Semen kemasan', 'Gypsum', 'Beton pracetak', 'Kargo curah kering'],
    useCases: [
      'Distribusi semen dan material konstruksi antar plant',
      'Pengiriman volume tinggi dengan jadwal ritase rutin',
      'Feeder koridor Pantura dan Trans-Jawa',
    ],
    specs: [
      { label: 'Daya muat maksimal', value: '35.000–45.000 kg' },
      { label: 'Konfigurasi', value: 'Rigid, tronton & trailer 2-axle' },
      { label: 'Komoditas', value: 'Semen, gypsum, beton berdensitas tinggi' },
      { label: 'Monitoring', value: 'Checkpoint Pantura & GPS' },
      { label: 'Pengamanan kargo', value: 'Heavy tarpaulin & lashing' },
    ],
    image: images.redTrailer,
    alt: 'Trailer muatan berat dengan roda ganda di area industri',
  },
  {
    slug: 'light-flatbed',
    code: 'FLT-LGT-03',
    name: 'Light Rigid / Flatbed',
    shortName: 'Light',
    capacity: '20–25 Ton',
    capacityKg: '20.000–25.000 kg',
    axle: '2-axle rigid',
    description:
      'Unit lincah untuk transfer plant-to-warehouse jarak menengah dan inter-city shuttle muatan non-curah.',
    commodities: ['Bahan baku logam', 'Profil baja', 'Material konstruksi', 'Kargo palet'],
    useCases: [
      'Transfer plant-to-warehouse jarak menengah',
      'Inter-city shuttle untuk muatan non-curah',
      'Distribusi material proyek dengan akses terbatas',
    ],
    specs: [
      { label: 'Daya muat maksimal', value: '20.000–25.000 kg' },
      { label: 'Konfigurasi', value: 'Flatbed rigid / heavy tarpaulin' },
      { label: 'Komoditas', value: 'Bahan baku logam & profil baja' },
      { label: 'Monitoring', value: 'Telemetri aktif & rute feeder' },
      { label: 'Akses', value: 'Manuver area pabrik & gudang' },
    ],
    image: images.fleetRow,
    alt: 'Barisan truk trailer terparkir di depo logistik',
  },
  {
    slug: 'wingbox-enclosed',
    code: 'FLT-WGB-04',
    name: 'Wingbox Enclosed',
    shortName: 'Wingbox',
    capacity: '25 Ton',
    capacityKg: '25.000 kg',
    axle: 'Multi-axle enclosed',
    description:
      'Armada tertutup dengan sayap hidrolik penuh untuk kecepatan bongkar-muat forklift simultan. Proteksi total terhadap cuaca dan debu.',
    commodities: ['FMCG', 'Gula', 'Kertas', 'Produk plastik'],
    useCases: [
      'Distribusi FMCG dengan bongkar-muat forklift simultan',
      'Pengiriman produk yang sensitif terhadap cuaca dan debu',
      'Ritase volume tinggi dengan proteksi kargo penuh',
    ],
    specs: [
      { label: 'Daya muat maksimal', value: '25.000 kg (volume tinggi)' },
      { label: 'Bukaan', value: 'Dual-side hydraulic wing open' },
      { label: 'Komoditas', value: 'FMCG, gula, kertas, produk plastik' },
      { label: 'Security', value: 'Tamper-evident digital lock' },
      { label: 'Monitoring', value: 'GPS 24/7 & manifest digital' },
    ],
    image: images.boxTruck,
    alt: 'Truk box tertutup melintas di jalan perkotaan',
  },
];

export const fleetBySlug = Object.fromEntries(fleetCategories.map((item) => [item.slug, item]));

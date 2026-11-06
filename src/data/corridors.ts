import type { Corridor } from '@/types';

/**
 * Distance bands and commodity assignments are reproduced from the approved
 * design reference. They are indicative, not a schedule or a live rate card.
 */
export const corridors: Corridor[] = [
  {
    index: 'CR-01',
    route: 'Cilegon → Semarang / Surabaya',
    distance: '480–780 km',
    commodities: 'Baja plat, steel coil, billets',
    status: 'AKTIF 24/7',
    region: 'Jawa',
  },
  {
    index: 'CR-02',
    route: 'Tuban / Gresik → Jawa Tengah Barat',
    distance: '250–620 km',
    commodities: 'Semen kantong & bahan konstruksi',
    status: 'AKTIF 24/7',
    region: 'Jawa',
  },
  {
    index: 'CR-03',
    route: 'Jakarta → Semarang → Surabaya',
    distance: '760 km',
    commodities: 'FMCG, bahan baku kertas, plastik',
    status: 'AKTIF 24/7',
    region: 'Jawa',
  },
  {
    index: 'CR-04',
    route: 'Merak–Bakauheni → Medan',
    distance: '1.850 km',
    commodities: 'Baja konstruksi, infrastruktur proyek',
    status: 'AKTIF 24/7',
    region: 'Sumatra',
  },
];

export const corridorRegions = ['Semua', 'Jawa', 'Sumatra'] as const;

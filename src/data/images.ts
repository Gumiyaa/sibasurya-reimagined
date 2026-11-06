import heroTruck from '@/assets/images/hero-b.jpg';
import heroNight from '@/assets/images/hero-a.jpg';
import legacyWorkshop from '@/assets/images/workshop-red.jpg';
import steelWarehouse from '@/assets/images/steel-warehouse.jpg';
import fleetRow from '@/assets/images/fleet-row.jpg';
import redTrailer from '@/assets/images/red-trailer.jpg';
import truckRoad from '@/assets/images/truck-road.jpg';
import truckDusk from '@/assets/images/truck-dusk.jpg';
import trucksFog from '@/assets/images/trucks-fog.jpg';
import trucksDark from '@/assets/images/trucks-dark.jpg';
import workshop from '@/assets/images/workshop-red.jpg';
import mechanic from '@/assets/images/mechanic.jpg';
import controlRoom from '@/assets/images/control-room.jpg';
import port from '@/assets/images/port.jpg';
import crane from '@/assets/images/crane.jpg';
import boxTruck from '@/assets/images/box-truck.jpg';

/**
 * Temporary photography placeholders.
 *
 * No official Siba Surya photo library was supplied with this implementation.
 * These files are licensed stock photographs used strictly as temporary
 * stand-ins, with no fabricated Siba Surya livery or vehicle branding.
 * Replace the source files in src/assets/images and update the references
 * below when the official asset library is available.
 */
export const images = {
  heroTruck,
  heroNight,
  legacyWorkshop,
  steelWarehouse,
  fleetRow,
  redTrailer,
  truckRoad,
  truckDusk,
  trucksFog,
  trucksDark,
  workshop,
  mechanic,
  controlRoom,
  port,
  crane,
  boxTruck,
} as const;

export type SiteImage = (typeof images)[keyof typeof images];

import type { ImageMetadata } from 'astro';

export interface NavigationItem {
  index: string;
  label: string;
  href: string;
  description?: string;
}

export interface Statistic {
  value: string;
  unit: string;
  label: string;
  detail: string;
  index: string;
}

export interface FleetSpec {
  label: string;
  value: string;
}

export interface FleetCategory {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  capacity: string;
  capacityKg: string;
  axle: string;
  description: string;
  commodities: string[];
  useCases: string[];
  specs: FleetSpec[];
  image: ImageMetadata;
  alt: string;
  flagship?: boolean;
}

export interface ServiceItem {
  index: string;
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  image: ImageMetadata;
  alt: string;
}

export interface Branch {
  slug: string;
  index: string;
  city: string;
  region: string;
  island: 'Jawa' | 'Sumatra';
  role: string;
  coverage: string;
  commodities: string[];
  corridor: string;
  status: 'HQ' | 'DEPOT';
  address?: string;
  contactNote: string;
  mapPosition: { x: number; y: number };
}

export interface Corridor {
  index: string;
  route: string;
  distance: string;
  commodities: string;
  status: string;
  region: string;
}

export interface CorporateValue {
  letter: string;
  title: string;
  english: string;
  description: string;
  index: string;
}

export interface LeaderQuote {
  quote: string;
  name: string;
  role: string;
  index: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  status: 'draft' | 'published';
  publishedAt: string | null;
  readingTime: string;
  image: ImageMetadata;
  alt: string;
  body: string[];
}

export interface Vacancy {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  status: 'draft' | 'open';
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  note?: string;
}

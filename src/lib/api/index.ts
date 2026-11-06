import { fleetCategories } from '@/data/fleet';
import { services } from '@/data/services';
import { branches } from '@/data/branches';
import { corridors } from '@/data/corridors';
import { newsArticles } from '@/data/news';
import { vacancies } from '@/data/careers';
import { statistics } from '@/data/statistics';
import { values, leadershipQuotes } from '@/data/values';
import type {
  Branch,
  Corridor,
  CorporateValue,
  FleetCategory,
  LeaderQuote,
  NewsArticle,
  ServiceItem,
  Statistic,
  Vacancy,
} from '@/types';
import { fetchCollection } from './client';

/**
 * Content access boundary.
 *
 * Pages import these getters instead of data modules directly. Today they read
 * the typed local content set; when PUBLIC_API_BASE_URL is present the
 * collection endpoints are used with a local fallback. Asset-bearing records
 * (fleet, news) keep local image metadata until the API exposes an asset
 * resolver.
 */

export async function getStatistics(): Promise<Statistic[]> {
  return fetchCollection('/statistics', statistics);
}

export async function getFleetCategories(): Promise<FleetCategory[]> {
  return fleetCategories;
}

export async function getFleetCategory(slug: string): Promise<FleetCategory | undefined> {
  return fleetCategories.find((item) => item.slug === slug);
}

export async function getServices(): Promise<ServiceItem[]> {
  return services;
}

export async function getBranches(): Promise<Branch[]> {
  return fetchCollection('/branches', branches);
}

export async function getBranch(slug: string): Promise<Branch | undefined> {
  const all = await getBranches();
  return all.find((item) => item.slug === slug);
}

export async function getCorridors(): Promise<Corridor[]> {
  return fetchCollection('/corridors', corridors);
}

export async function getValues(): Promise<CorporateValue[]> {
  return fetchCollection('/values', values);
}

export async function getLeadershipQuotes(): Promise<LeaderQuote[]> {
  return leadershipQuotes;
}

export async function getNews(): Promise<NewsArticle[]> {
  return newsArticles;
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | undefined> {
  return newsArticles.find((item) => item.slug === slug);
}

export async function getVacancies(): Promise<Vacancy[]> {
  return fetchCollection('/careers', vacancies);
}

export async function getVacancy(slug: string): Promise<Vacancy | undefined> {
  const all = await getVacancies();
  return all.find((item) => item.slug === slug);
}

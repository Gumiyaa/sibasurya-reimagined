const rawBase = import.meta.env.PUBLIC_API_BASE_URL?.trim() ?? '';
const baseUrl = rawBase.replace(/\/+$/, '');

export const isApiConfigured = baseUrl.length > 0;

export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!isApiConfigured) {
    throw new ApiError('PUBLIC_API_BASE_URL belum dikonfigurasi.', 0);
  }

  const response = await fetch(`${baseUrl}${path.startsWith('/') ? path : `/${path}`}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(`Permintaan API gagal (${response.status}).`, response.status);
  }

  return (await response.json()) as T;
}

export async function fetchCollection<T>(path: string, fallback: T[]): Promise<T[]> {
  if (!isApiConfigured) return fallback;

  try {
    const data = await apiFetch<T[]>(path);
    return Array.isArray(data) ? data : fallback;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`[api] ${path} tidak tersedia, memakai data lokal.`, error);
    }
    return fallback;
  }
}

/**
 * Resolve whether a navigation link should be marked as the current page.
 * Hash-only differences (#integritas) do not create separate pages, so the
 * base path decides the active state.
 */
export function isNavigationActive(pathname: string, href: string): boolean {
  const base = href.split('#')[0]?.split('?')[0] ?? href;
  if (base === '/') {
    return pathname === '/' || pathname === '';
  }

  const normalized = base.endsWith('/') ? base : `${base}/`;
  return pathname === normalized || pathname.startsWith(normalized);
}

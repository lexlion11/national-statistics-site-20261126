// router.js — hash routing: parse the URL, pick a view, keep the address bar in step.
// One job: navigation. Each route names the view that draws it.

import { INDICATORS, indicatorById } from './data/indicators.js';
import { regionByCode } from './data/regions.js';

export const ROUTES = [
  { path: '/', id: 'overview', label: 'Overview', title: 'Overview' },
  { path: '/indicators', id: 'indicators', label: 'All indicators', title: 'All indicators' },
  { path: '/indicator/:id', id: 'indicator', label: 'Indicator', title: 'Indicator', hidden: true },
  { path: '/regions', id: 'regions', label: 'By prefecture', title: 'Prefectures' },
  { path: '/region/:code', id: 'region', label: 'Prefecture', title: 'Prefecture', hidden: true },
  { path: '/compare', id: 'compare', label: 'Compare', title: 'Compare with peers' },
  { path: '/energy', id: 'energy', label: 'Energy', title: 'Energy mix' },
  { path: '/table', id: 'table', label: 'Data table', title: 'Data table' },
  { path: '/glossary', id: 'glossary', label: 'Glossary', title: 'Glossary' },
  { path: '/sources', id: 'sources', label: 'Sources', title: 'Sources & method' },
];

const routeTable = new Map(ROUTES.map((route) => [route.path, route]));

/** Parse a hash into a route id and its parameters. */
export function parseHash(hash) {
  const raw = String(hash || '').replace(/^#/, '');
  const path = raw.startsWith('/') ? raw : `/${raw}`;
  const [pathname, queryString = ''] = path.split('?');
  const clean = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const params = new URLSearchParams(queryString);

  if (clean === '/') return { id: 'overview', params, path: '/' };
  if (clean === '/indicators') return { id: 'indicators', params, path: clean };
  if (clean === '/regions') return { id: 'regions', params, path: clean };
  if (clean === '/compare') return { id: 'compare', params, path: clean };
  if (clean === '/energy') return { id: 'energy', params, path: clean };
  if (clean === '/table') return { id: 'table', params, path: clean };
  if (clean === '/glossary') return { id: 'glossary', params, path: clean };
  if (clean === '/sources') return { id: 'sources', params, path: clean };

  const indicatorMatch = clean.match(/^\/indicator\/([A-Za-z0-9_-]+)$/);
  if (indicatorMatch) {
    const indicator = indicatorById(indicatorMatch[1]);
    if (indicator) return { id: 'indicator', params, path: clean, indicatorId: indicator.id };
    return { id: 'notfound', params, path: clean, missing: clean };
  }

  const regionMatch = clean.match(/^\/region\/(\d{2})$/);
  if (regionMatch) {
    const region = regionByCode(regionMatch[1]);
    if (region) return { id: 'region', params, path: clean, regionCode: region.code };
    return { id: 'notfound', params, path: clean, missing: clean };
  }

  return { id: 'notfound', params, path: clean, missing: clean };
}

/** Build a hash for a route and its query parameters. */
export function buildHash(path, query = {}) {
  const entries = Object.entries(query).filter(([, value]) => value !== undefined && value !== null && value !== '');
  if (!entries.length) return `#${path}`;
  const search = new URLSearchParams();
  for (const [key, value] of entries) search.set(key, String(value));
  return `#${path}?${search.toString()}`;
}

/** The label shown in the navigation for a route that is currently open. */
export function activeNavPath(route) {
  if (route.id === 'indicator') return '/indicators';
  if (route.id === 'region') return '/regions';
  return route.path;
}

/** The indicator a route refers to, if any. */
export function routeIndicator(route) {
  if (route.indicatorId) return indicatorById(route.indicatorId);
  return null;
}

/** The indicators a route may offer as suggestions. */
export function relatedIndicators(indicator, count = 4) {
  if (!indicator) return INDICATORS.slice(0, count);
  const sameDomain = INDICATORS.filter((item) => item.domain === indicator.domain && item.id !== indicator.id);
  const others = INDICATORS.filter((item) => item.domain !== indicator.domain);
  return [...sameDomain, ...others].slice(0, count);
}

/** The route table, exposed for tests and for the navigation builder. */
export function allRoutes() {
  return [...routeTable.values()];
}

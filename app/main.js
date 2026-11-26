// main.js — the entry point: build the navigation, route the hash, draw the view.
// One job: start the site and keep the page in step with the address bar.

import { ROUTES, parseHash, buildHash, activeNavPath } from './router.js';
import { setHtml, on, esc } from './dom.js';
import { renderOverview } from './views/overview.js';
import { renderIndicators } from './views/indicators.js';
import { renderIndicator } from './views/indicator.js';
import { renderRegions } from './views/regions.js';
import { renderRegion } from './views/region.js';
import { renderCompare } from './views/compare.js';
import { renderEnergy } from './views/energy.js';
import { renderTable, tableCsv } from './views/table.js';
import { renderGlossary } from './views/glossary.js';
import { renderSources } from './views/sources.js';
import { renderNotFound } from './views/notfound.js';

const app = document.getElementById('app');
const nav = document.getElementById('site-nav');
const navToggle = document.getElementById('nav-toggle');
const footerLinks = document.getElementById('footer-links');

const VIEWS = {
  overview: renderOverview,
  indicators: renderIndicators,
  indicator: renderIndicator,
  regions: renderRegions,
  region: renderRegion,
  compare: renderCompare,
  energy: renderEnergy,
  table: renderTable,
  glossary: renderGlossary,
  sources: renderSources,
  notfound: renderNotFound,
};

const TITLES = {
  overview: 'Tōkei Atlas — Japan\'s national statistics',
  indicators: 'All indicators — Tōkei Atlas',
  indicator: 'Indicator — Tōkei Atlas',
  regions: 'Prefectures — Tōkei Atlas',
  region: 'Prefecture — Tōkei Atlas',
  compare: 'Compare with peers — Tōkei Atlas',
  energy: 'Energy mix — Tōkei Atlas',
  table: 'Data table — Tōkei Atlas',
  glossary: 'Glossary — Tōkei Atlas',
  sources: 'Sources & method — Tōkei Atlas',
  notfound: 'Not found — Tōkei Atlas',
};

function buildNav() {
  const items = ROUTES.filter((route) => !route.hidden);
  nav.innerHTML = items.map((route) => `<a href="#${route.path}" data-nav="${route.path}">${esc(route.label)}</a>`).join('');
  footerLinks.innerHTML = items.map((route) => `<a href="#${route.path}">${esc(route.label)}</a>`).join('');
}

function markActive(route) {
  const current = activeNavPath(route);
  for (const link of nav.querySelectorAll('a')) {
    if (link.getAttribute('data-nav') === current) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function render() {
  const route = parseHash(window.location.hash);
  const view = VIEWS[route.id] || renderNotFound;
  const markup = route.id === 'notfound' ? renderNotFound(route) : view(route, route.params);
  setHtml(app, markup);
  document.title = TITLES[route.id] || 'Tōkei Atlas';
  markActive(route);
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  scrollToTop();
  wireControls(route);
}

/** Wire the controls of the page that was just drawn. */
function wireControls(route) {
  const search = app.querySelector('#indicator-search');
  if (search) {
    search.addEventListener('input', () => {
      const value = search.value.trim();
      window.location.hash = buildHash('/indicators', { domain: route.params.get('domain') || 'all', q: value });
    });
  }

  const regionSearch = app.querySelector('#region-search');
  if (regionSearch) {
    regionSearch.addEventListener('input', () => {
      const value = regionSearch.value.trim();
      window.location.hash = buildHash('/regions', { sort: route.params.get('sort') || 'population', dir: route.params.get('dir') || 'desc', region: route.params.get('region') || 'all', q: value });
    });
  }

  const glossarySearch = app.querySelector('#glossary-search');
  if (glossarySearch) {
    glossarySearch.addEventListener('input', () => {
      window.location.hash = buildHash('/glossary', { q: glossarySearch.value.trim() });
    });
  }

  const tableSearch = app.querySelector('#table-search');
  if (tableSearch) {
    tableSearch.addEventListener('input', () => {
      window.location.hash = buildHash('/table', { sort: route.params.get('sort') || 'year', dir: route.params.get('dir') || 'desc', domain: route.params.get('domain') || 'all', q: tableSearch.value.trim() });
    });
  }

  const yearSelect = app.querySelector('#indicator-year');
  if (yearSelect) {
    yearSelect.addEventListener('change', () => {
      window.location.hash = buildHash(`/indicator/${route.indicatorId}`, { year: yearSelect.value, scale: route.params.get('scale') || 'raw' });
    });
  }

  const scaleSelect = app.querySelector('#indicator-scale');
  if (scaleSelect) {
    scaleSelect.addEventListener('change', () => {
      window.location.hash = buildHash(`/indicator/${route.indicatorId}`, { year: route.params.get('year') || '', scale: scaleSelect.value });
    });
  }

  const copyButton = app.querySelector('#copy-table');
  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const label = copyButton.textContent;
      try {
        await navigator.clipboard.writeText(tableCsv());
        copyButton.textContent = 'Copied to the clipboard';
      } catch (error) {
        copyButton.textContent = 'Copying is blocked here — use the table directly';
      }
      window.setTimeout(() => { copyButton.textContent = label; }, 2200);
    });
  }
}

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

window.addEventListener('hashchange', render);

buildNav();
render();

// views/indicators.js — the indicator directory: every series, filtered and searchable.
// One job: let a visitor find the series they came for.

import { INDICATORS, DOMAINS, latestPoint, lastChange } from '../data/indicators.js';
import { sourceLabel } from '../data/sources.js';
import { sparkline } from '../charts.js';
import { formatShort, people, usd, percent, fixed } from '../format.js';
import { esc } from '../dom.js';

function displayValue(indicator, value) {
  switch (indicator.format) {
    case 'people': return people(value);
    case 'usd_bn': return `$${fixed(value / 1000, 2)} trn`;
    case 'usd': return usd(value);
    case 'percent': return percent(value, indicator.decimals);
    case 'years': return `${fixed(value, 1)} yrs`;
    default: return fixed(value, indicator.decimals);
  }
}

/** The card grid of every indicator, optionally filtered by domain and a search term. */
export function renderIndicators(route, params) {
  const domain = params.get('domain') || 'all';
  const query = (params.get('q') || '').trim().toLowerCase();

  const matches = INDICATORS.filter((indicator) => {
    if (domain !== 'all' && indicator.domain !== domain) return false;
    if (!query) return true;
    const haystack = `${indicator.name} ${indicator.question} ${indicator.description} ${indicator.domain}`.toLowerCase();
    return haystack.includes(query);
  });

  const tabs = ['all', ...DOMAINS].map((item) => {
    const label = item === 'all' ? 'All' : item;
    const count = item === 'all' ? INDICATORS.length : INDICATORS.filter((ind) => ind.domain === item).length;
    const active = item === domain ? ' aria-current="page"' : '';
    const href = `#/indicators?domain=${encodeURIComponent(item)}${query ? `&q=${encodeURIComponent(query)}` : ''}`;
    return `<a class="tab${item === domain ? ' active' : ''}" href="${href}"${active}>${esc(label)} <span class="tab-count">${count}</span></a>`;
  }).join('');

  const cards = matches.map((indicator) => {
    const point = latestPoint(indicator);
    const change = lastChange(indicator);
    const trend = sparkline(indicator.points, { label: `${indicator.name} trend` });
    return `<article class="ind-card">
      <p class="ind-domain">${esc(indicator.domain)}</p>
      <h3><a href="#/indicator/${indicator.id}">${esc(indicator.name)}</a></h3>
      <p class="ind-question">${esc(indicator.question)}</p>
      <p class="ind-value">${esc(displayValue(indicator, point.value))} <span class="ind-year">${point.year}</span></p>
      <div class="ind-trend">${trend}</div>
      <p class="ind-foot">
        <span class="ind-unit">${esc(indicator.unit)}</span>
        <span class="ind-src">${esc(sourceLabel(point.source || indicator.source))}</span>
      </p>
      ${change ? `<p class="ind-change">Latest change: ${esc(formatShort(indicator, change.delta))} since ${change.previous.year}</p>` : ''}
    </article>`;
  }).join('');

  const empty = matches.length === 0
    ? `<div class="empty"><p>No indicator matches “${esc(params.get('q') || '')}”.</p><p><a href="#/indicators">Clear the search and show all ${INDICATORS.length} indicators</a>.</p></div>`
    : '';

  return `
  <section class="page-head">
    <p class="eyebrow">Directory</p>
    <h1>All indicators</h1>
    <p class="lead">${INDICATORS.length} national series, each with its unit, its publisher and the year of its latest observation. Pick one to see the full series, the chart and the sources.</p>
  </section>

  <form class="filters" id="indicator-filters" role="search">
    <label class="field">
      <span class="field-label">Search</span>
      <input type="search" id="indicator-search" name="q" value="${esc(params.get('q') || '')}" placeholder="population, inflation, life expectancy…" autocomplete="off">
    </label>
    <div class="tabs" role="navigation" aria-label="Filter by domain">${tabs}</div>
  </form>

  <p class="result-count">${matches.length} of ${INDICATORS.length} indicators shown</p>
  <div class="ind-grid">${cards}</div>
  ${empty}`;
}

// views/regions.js — the prefecture directory: all 47, sortable, with a ranked chart.
// One job: compare Japan's prefectures.

import { REGIONS, REGION_GROUPS, regionTotals } from '../data/regions.js';
import { sourceLabel } from '../data/sources.js';
import { rankedBars } from '../charts.js';
import { people, fixed, percent, usd } from '../format.js';
import { esc } from '../dom.js';

const COLUMNS = [
  { id: 'name', label: 'Prefecture', type: 'text', sortable: false },
  { id: 'region', label: 'Region', type: 'text', sortable: false },
  { id: 'population', label: 'Population', type: 'number', format: (value) => people(value) },
  { id: 'gdpPerCapita', label: 'GDP per capita', type: 'number', format: (value) => usd(value) },
  { id: 'unemployment', label: 'Unemployment', type: 'number', format: (value) => percent(value, 1) },
  { id: 'agedShare', label: 'Aged 65+', type: 'number', format: (value) => percent(value, 1) },
  { id: 'area', label: 'Area (km²)', type: 'number', format: (value) => fixed(value, 0) },
];

/** The sortable prefecture table. */
export function renderRegions(route, params) {
  const sort = params.get('sort') || 'population';
  const direction = params.get('dir') === 'asc' ? 'asc' : 'desc';
  const region = params.get('region') || 'all';
  const query = (params.get('q') || '').trim().toLowerCase();

  let rows = [...REGIONS];
  if (region !== 'all') rows = rows.filter((item) => item.region === region);
  if (query) rows = rows.filter((item) => item.name.toLowerCase().includes(query));

  const column = COLUMNS.find((item) => item.id === sort) || COLUMNS[2];
  rows.sort((a, b) => {
    const av = a[column.id];
    const bv = b[column.id];
    if (typeof av === 'string') return direction === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    return direction === 'asc' ? av - bv : bv - av;
  });

  const head = COLUMNS.map((item) => {
    const active = item.id === column.id;
    const nextDir = active && direction === 'desc' ? 'asc' : 'desc';
    const href = `#/regions?sort=${item.id}&dir=${nextDir}${region !== 'all' ? `&region=${encodeURIComponent(region)}` : ''}${query ? `&q=${encodeURIComponent(query)}` : ''}`;
    if (!item.sortable) return `<th scope="col" class="${item.type === 'number' ? 'num' : ''}">${esc(item.label)}</th>`;
    return `<th scope="col" class="${item.type === 'number' ? 'num' : ''}${active ? ' sorted' : ''}"><a href="${href}">${esc(item.label)}${active ? (direction === 'desc' ? ' ↓' : ' ↑') : ''}</a></th>`;
  }).join('');

  const body = rows.map((item) => `<tr>
      <th scope="row"><a href="#/region/${item.code}">${esc(item.name)}</a></th>
      <td>${esc(item.region)}</td>
      <td class="num">${esc(people(item.population))}</td>
      <td class="num">${esc(usd(item.gdpPerCapita))}</td>
      <td class="num">${esc(percent(item.unemployment, 1))}</td>
      <td class="num">${esc(percent(item.agedShare, 1))}</td>
      <td class="num">${esc(fixed(item.area, 0))}</td>
    </tr>`).join('');

  const regionOptions = ['all', ...REGION_GROUPS].map((item) => {
    const label = item === 'all' ? 'All regions' : item;
    const count = item === 'all' ? REGIONS.length : REGIONS.filter((r) => r.region === item).length;
    const href = `#/regions?sort=${column.id}&dir=${direction}${item !== 'all' ? `&region=${encodeURIComponent(item)}` : ''}`;
    return `<a class="tab${item === region ? ' active' : ''}" href="${href}">${esc(label)} <span class="tab-count">${count}</span></a>`;
  }).join('');

  const ranked = [...REGIONS].sort((a, b) => b.gdpPerCapita - a.gdpPerCapita).slice(0, 10)
    .map((item) => ({
      label: item.name,
      value: item.gdpPerCapita,
      note: people(item.population),
      highlight: item.name === 'Tokyo',
    }));

  return `
  <section class="page-head">
    <p class="eyebrow">Geography</p>
    <h1>The 47 prefectures</h1>
    <p class="lead">Japan's 47 prefectures differ as much as European countries do: Tokyo's output per person is nearly three times that of the poorest prefecture, and the age structure swings by more than ten points.</p>
  </section>

  <form class="filters" role="search">
    <label class="field">
      <span class="field-label">Find a prefecture</span>
      <input type="search" id="region-search" name="q" value="${esc(query)}" placeholder="Osaka, Hokkaido, Kyoto…" autocomplete="off">
    </label>
    <div class="tabs" aria-label="Filter by region">${regionOptions}</div>
  </form>

  <p class="result-count">${rows.length} of ${REGIONS.length} prefectures shown · sorted by ${esc(column.label)} ${direction === 'desc' ? 'descending' : 'ascending'}</p>

  <div class="panel table-panel">
    <table class="data-table region-table">
      <caption class="visually-hidden">Prefectures, sortable</caption>
      <thead><tr>${head}</tr></thead>
      <tbody>${body}</tbody>
      <tfoot><tr>
        <th scope="row">Japan total</th>
        <td>—</td>
        <td class="num">${esc(people(regionTotals('population')))}</td>
        <td class="num">—</td>
        <td class="num">—</td>
        <td class="num">—</td>
        <td class="num">${esc(fixed(regionTotals('area'), 0))}</td>
      </tr></tfoot>
    </table>
  </div>

  <div class="panel">
    <div class="panel-head"><h2>GDP per person, highest ten</h2></div>
    ${rankedBars(ranked, { format: (value) => usd(value) })}
    <p class="panel-note">Tokyo's figure is inflated by the headquarters of Japan's largest corporations sitting inside the prefecture, and by the value of the land beneath them.</p>
    <p class="panel-src">${esc(sourceLabel('statjp'))} for population; prefectural accounts for output per person.</p>
  </div>`;
}

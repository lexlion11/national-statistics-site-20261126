// views/table.js — the whole dataset in one sortable, downloadable table.
// One job: let a visitor sort, filter and copy the numbers.

import { INDICATORS } from '../data/indicators.js';
import { sourceLabel } from '../data/sources.js';
import { sparkline } from '../charts.js';
import { formatValue, formatShort, fixed } from '../format.js';
import { esc } from '../dom.js';

/** Every observation of every series, as flat rows. */
function allRows() {
  const rows = [];
  for (const indicator of INDICATORS) {
    for (const point of indicator.points) {
      rows.push({
        indicator,
        year: point.year,
        value: point.value,
        source: point.source || indicator.source,
        note: point.note || '',
      });
    }
  }
  return rows;
}

export function renderTable(route, params) {
  const sort = params.get('sort') || 'year';
  const direction = params.get('dir') === 'asc' ? 'asc' : 'desc';
  const domain = params.get('domain') || 'all';
  const query = (params.get('q') || '').trim().toLowerCase();

  let rows = allRows();
  if (domain !== 'all') rows = rows.filter((row) => row.indicator.domain === domain);
  if (query) {
    rows = rows.filter((row) => `${row.indicator.name} ${row.note} ${row.year}`.toLowerCase().includes(query));
  }

  const keyFor = (row) => {
    if (sort === 'indicator') return row.indicator.name;
    if (sort === 'value') return row.value;
    if (sort === 'source') return row.source;
    return row.year;
  };

  rows.sort((a, b) => {
    const av = keyFor(a);
    const bv = keyFor(b);
    const result = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return direction === 'asc' ? result : -result;
  });

  const head = [
    { id: 'indicator', label: 'Indicator' },
    { id: 'year', label: 'Year' },
    { id: 'value', label: 'Value', numeric: true },
    { id: 'source', label: 'Source' },
  ].map((column) => {
    const active = column.id === sort;
    const nextDir = active && direction === 'desc' ? 'asc' : 'desc';
    const href = `#/table?sort=${column.id}&dir=${nextDir}${domain !== 'all' ? `&domain=${encodeURIComponent(domain)}` : ''}${query ? `&q=${encodeURIComponent(query)}` : ''}`;
    return `<th scope="col" class="${column.numeric ? 'num' : ''}${active ? ' sorted' : ''}"><a href="${href}">${esc(column.label)}${active ? (direction === 'desc' ? ' ↓' : ' ↑') : ''}</a></th>`;
  }).join('');

  const body = rows.slice(0, 400).map((row) => `<tr>
      <th scope="row"><a href="#/indicator/${row.indicator.id}">${esc(row.indicator.name)}</a></th>
      <td class="num">${row.year}</td>
      <td class="num">${esc(formatValue(row.indicator, row.value, { scale: 'raw' }))}</td>
      <td class="src-cell">${esc(sourceLabel(row.source))}</td>
    </tr>`).join('');

  const domainOptions = ['all', ...new Set(INDICATORS.map((item) => item.domain))].map((item) => {
    const label = item === 'all' ? 'All domains' : item;
    const href = `#/table?sort=${sort}&dir=${direction}${item !== 'all' ? `&domain=${encodeURIComponent(item)}` : ''}`;
    return `<a class="tab${item === domain ? ' active' : ''}" href="${href}">${esc(label)}</a>`;
  }).join('');

  const csvButton = `<button type="button" class="button ghost" id="copy-table">Copy these rows as CSV</button>`;

  return `
  <section class="page-head">
    <p class="eyebrow">Dataset</p>
    <h1>Every figure, one table</h1>
    <p class="lead">All ${allRows().length} observations from ${INDICATORS.length} series in a single table. Sort any column, filter by domain, and copy the result as CSV for a spreadsheet.</p>
    <p class="page-actions">${csvButton}</p>
  </section>

  <form class="filters" role="search">
    <label class="field">
      <span class="field-label">Search rows</span>
      <input type="search" id="table-search" name="q" value="${esc(query)}" placeholder="population, 2023, OECD…" autocomplete="off">
    </label>
    <div class="tabs" aria-label="Filter by domain">${domainOptions}</div>
  </form>

  <p class="result-count">${rows.length} observations shown${rows.length > 400 ? ' (first 400 listed; the CSV copy holds them all)' : ''}</p>

  <div class="panel table-panel">
    <table class="data-table" id="data-table">
      <caption class="visually-hidden">All observations</caption>
      <thead><tr>${head}</tr></thead>
      <tbody>${body}</tbody>
    </table>
  </div>

  <div class="panel">
    <div class="panel-head"><h2>Series index</h2></div>
    <ul class="series-index">
      ${INDICATORS.map((indicator) => {
        const latest = indicator.points[indicator.points.length - 1];
        return `<li>
          <a href="#/indicator/${indicator.id}">${esc(indicator.name)}</a>
          <span class="si-trend">${sparkline(indicator.points, { label: `${indicator.name} trend` })}</span>
          <span class="si-value">${esc(formatShort(indicator, latest.value))} (${latest.year})</span>
        </li>`;
      }).join('')}
    </ul>
  </div>`;
}

/** The CSV text of the rows currently on screen, for the copy button. */
export function tableCsv() {
  const rows = allRows();
  const header = 'indicator,domain,year,value,unit,source';
  const lines = rows.map((row) => [
    `"${row.indicator.name.replace(/"/g, '""')}"`,
    `"${row.indicator.domain}"`,
    row.year,
    row.value,
    `"${row.indicator.unit}"`,
    `"${sourceLabel(row.source).replace(/"/g, '""')}"`,
  ].join(','));
  return [header, ...lines].join('\n');
}

export { fixed };

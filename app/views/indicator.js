// views/indicator.js — one indicator in full: the chart, the table, the reading and the sources.
// One job: answer the question the visitor arrived with.

import { indicatorById, valueAt, latestPoint } from '../data/indicators.js';
import { sourceLabel, SOURCES } from '../data/sources.js';
import { relatedIndicators } from '../router.js';
import { lineChart } from '../charts.js';
import { formatValue, formatShort, fixed, signedPercent, people } from '../format.js';
import { esc } from '../dom.js';

function pointsTable(indicator, scale) {
  const rows = [...indicator.points].reverse().map((point) => {
    const source = point.source || indicator.source;
    return `<tr>
      <th scope="row">${point.year}</th>
      <td class="num">${esc(formatValue(indicator, point.value, { scale }))}</td>
      <td class="src-cell">${esc(sourceLabel(source))}</td>
      <td class="note-cell">${esc(point.note || '')}</td>
    </tr>`;
  }).join('');
  return `<table class="data-table">
    <caption class="visually-hidden">${esc(indicator.name)} by year</caption>
    <thead><tr><th scope="col">Year</th><th scope="col" class="num">Value</th><th scope="col">Source</th><th scope="col">Note</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function yearAt(indicator, year) {
  const value = valueAt(indicator, year);
  if (value === null) return null;
  const point = indicator.points.find((item) => item.year === year);
  return { year, value, source: point.source || indicator.source, note: point.note || '' };
}

export function renderIndicator(route, params) {
  const indicator = indicatorById(route.indicatorId);
  if (!indicator) {
    return `<section class="page-head"><h1>Indicator not found</h1><p class="lead">That series is not in this atlas. <a href="#/indicators">Browse all indicators</a>.</p></section>`;
  }

  const scale = params.get('scale') || indicator.scale || 'raw';
  const yearParam = Number(params.get('year'));
  const points = indicator.points;
  const latest = latestPoint(indicator);
  const selected = Number.isFinite(yearParam) && yearParam > 0 ? yearAt(indicator, yearParam) : null;
  const previousPoint = points[points.length - 2];
  const yoy = previousPoint && previousPoint.value !== 0
    ? ((latest.value - previousPoint.value) / Math.abs(previousPoint.value)) * 100
    : null;

  const yearOptions = points.map((point) => {
    const selectedAttr = selected && selected.year === point.year ? ' selected' : '';
    return `<option value="${point.year}"${selectedAttr}>${point.year}</option>`;
  }).reverse().join('');

  const scaleOptions = [
    ['raw', 'Exact value'],
    ['thousand', 'Thousands'],
    ['million', 'Millions'],
    ['billion', 'Billions'],
  ].map(([id, label]) => `<option value="${id}"${scale === id ? ' selected' : ''}>${label}</option>`).join('');

  const sourceIds = [...new Set(points.map((point) => point.source || indicator.source))];
  const sourceList = sourceIds.map((id) => {
    const source = SOURCES[id];
    if (!source) return '';
    return `<li><strong>${esc(source.label)}</strong> — ${esc(source.kind)}, ${source.year}. ${esc(source.note)}</li>`;
  }).join('');

  const related = relatedIndicators(indicator).map((item) => {
    const point = latestPoint(item);
    return `<li><a href="#/indicator/${item.id}">${esc(item.name)}</a><span>${esc(formatShort(item, point.value))} (${point.year})</span></li>`;
  }).join('');

  const highlight = selected || { year: latest.year, value: latest.value, source: latest.source || indicator.source, note: latest.note || '' };

  return `
  <section class="page-head">
    <p class="eyebrow"><a href="#/indicators">${esc(indicator.domain)}</a></p>
    <h1>${esc(indicator.name)}</h1>
    <p class="lead">${esc(indicator.question)}</p>
    <p class="page-actions">
      <a class="button ghost" href="#/indicators">← All indicators</a>
    </p>
  </section>

  <section class="hero-figures">
    <div class="hero-figure">
      <p class="hero-label">Latest value (${latest.year})</p>
      <p class="hero-value">${esc(formatValue(indicator, latest.value, { scale }))}</p>
      <p class="hero-unit">${esc(indicator.unit)}</p>
      <p class="hero-src">${esc(sourceLabel(latest.source || indicator.source))}</p>
    </div>
    <div class="hero-figure">
      <p class="hero-label">Change on ${previousPoint ? previousPoint.year : 'the previous year'}</p>
      <p class="hero-value small">${esc(yoy === null ? '—' : signedPercent(yoy))}</p>
      <p class="hero-unit">${previousPoint ? `from ${esc(formatValue(indicator, previousPoint.value, { scale }))} in ${previousPoint.year}` : ''}</p>
    </div>
    <div class="hero-figure">
      <p class="hero-label">Series</p>
      <p class="hero-value small">${points.length} years</p>
      <p class="hero-unit">${points[0].year}–${latest.year}</p>
    </div>
  </section>

  <div class="panel">
    <div class="panel-head">
      <h2>${esc(indicator.name)} over time</h2>
      <form class="inline-controls" id="indicator-controls">
        <label class="field">
          <span class="field-label">Year</span>
          <select name="year" id="indicator-year">${yearOptions}</select>
        </label>
        <label class="field">
          <span class="field-label">Scale</span>
          <select name="scale" id="indicator-scale">${scaleOptions}</select>
        </label>
      </form>
    </div>
    ${lineChart(points, indicator, { zero: indicator.format === 'percent', band: true, height: 320 })}
    <p class="panel-note">${esc(indicator.description)}</p>
    <p class="panel-src">${esc(sourceLabel(indicator.source))} for the series; individual years may carry a different publisher, shown in the table.</p>
  </div>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><h2>Reading for ${highlight.year}</h2></div>
      <p class="reading-value">${esc(formatValue(indicator, highlight.value, { scale }))}</p>
      <p class="reading-src">${esc(sourceLabel(highlight.source))}</p>
      <p class="reading-text">${esc(highlight.note || indicator.description)}</p>
      <p class="panel-note">${esc(indicator.description)}</p>
    </div>
    <div class="panel">
      <div class="panel-head"><h2>About this series</h2></div>
      <dl class="def-list">
        <div><dt>What it measures</dt><dd>${esc(indicator.description)}</dd></div>
        <div><dt>Unit</dt><dd>${esc(indicator.unit)}</dd></div>
        <div><dt>Coverage</dt><dd>${points[0].year}–${latest.year}, ${points.length} observations</dd></div>
        <div><dt>Default publisher</dt><dd>${esc(sourceLabel(indicator.source))}</dd></div>
      </dl>
      <h3 class="mini-head">Sources used in this series</h3>
      <ul class="src-list">${sourceList}</ul>
    </div>
  </div>

  <div class="panel">
    <div class="panel-head">
      <h2>Every value, newest first</h2>
      <span class="panel-note inline">Scale: ${esc(scale === 'raw' ? 'exact' : scale)}</span>
    </div>
    ${pointsTable(indicator, scale)}
  </div>

  <div class="panel">
    <div class="panel-head"><h2>Related indicators</h2></div>
    <ul class="related-list">${related}</ul>
  </div>`;
}

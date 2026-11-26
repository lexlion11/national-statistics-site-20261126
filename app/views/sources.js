// views/sources.js — every source, what it covers, and how the figures are prepared.
// One job: make the provenance of the data inspectable.

import { SOURCES } from '../data/sources.js';
import { INDICATORS, latestPoint } from '../data/indicators.js';
import { ENERGY_MIX, ENERGY_CONTEXT } from '../data/energy.js';
import { REGIONS } from '../data/regions.js';
import { esc } from '../dom.js';

function usageFor(sourceId) {
  const series = INDICATORS.filter((indicator) => {
    const ids = new Set(indicator.points.map((point) => point.source || indicator.source));
    return ids.has(sourceId);
  });
  const covers = [];
  if (sourceId === 'statjp') covers.push(`Population and area for all ${REGIONS.length} prefectures`);
  if (sourceId === 'iea') covers.push('Primary energy supply and the generation mix');
  if (sourceId === 'worldbank') covers.push('Population, GDP, inflation, unemployment, fertility, life expectancy and the current account');
  if (sourceId === 'oecd') covers.push('Unemployment, inflation, health spending, education spending and hospital beds');
  if (sourceId === 'undp') covers.push('Mean years of schooling');
  if (sourceId === 'imf') covers.push('Government debt and the latest GDP estimate');
  if (sourceId === 'un_desa') covers.push('The most recent population estimates and projections');
  return { series, covers };
}

export function renderSources() {
  const blocks = Object.values(SOURCES).map((source) => {
    const { series, covers } = usageFor(source.id);
    const items = series.map((indicator) => {
      const point = latestPoint(indicator);
      const source = point.source || indicator.source;
      if (source !== source.id) return '';
      return `<li><a href="#/indicator/${indicator.id}">${esc(indicator.name)}</a> <span>${esc(indicator.unit)}</span></li>`;
    }).filter(Boolean).join('');
    return `<article class="source-block">
      <h3>${esc(source.label)}</h3>
      <p class="source-meta"><span class="tag">${esc(source.kind)}</span> <span class="tag year">${source.year}</span></p>
      <p>${esc(source.note)}</p>
      ${covers.length ? `<p class="source-covers"><strong>Covers here:</strong> ${esc(covers.join('; '))}.</p>` : ''}
      ${items ? `<p class="source-series"><strong>Series from this source:</strong></p><ul class="chip-row">${items}</ul>` : ''}
    </article>`;
  }).join('');

  const method = `
    <div class="columns-3">
      <div>
        <h3>Units</h3>
        <p>Amounts are in the unit the publisher uses: current US dollars for output, per cent of GDP for public spending and debt, and the natural unit for everything else. The indicator page for each series states the unit in full.</p>
      </div>
      <div>
        <h3>Rounding</h3>
        <p>Values are stored at the precision the publisher gave and are rounded for display: one decimal place for percentages and rates, whole numbers for counts and dollars. Nothing is rounded twice.</p>
      </div>
      <div>
        <h3>Mixing sources</h3>
        <p>A series does not change publisher mid-line. Where an organisation took over a series, the year it took over carries the new publisher in the table, and the chart draws the two together without a break.</p>
      </div>
      <div>
        <h3>Revisions</h3>
        <p>Statistical offices revise their figures. This atlas is a snapshot compiled on 26 November 2026 and will not follow later revisions.</p>
      </div>
      <div>
        <h3>Estimates and projections</h3>
        <p>United Nations and IMF estimates are marked as estimates in the notes column, and the chart draws them in the same series as observations.</p>
      </div>
      <div>
        <h3>What is not here</h3>
        <p>Prefecture-level output, prices and employment come from national and prefectural offices rather than the international databases used for the national series, and are rounded more coarsely.</p>
      </div>
    </div>`;

  const latest = ENERGY_MIX[ENERGY_MIX.length - 1];

  return `
  <section class="page-head">
    <p class="eyebrow">Provenance</p>
    <h1>Sources &amp; method</h1>
    <p class="lead">Seven publishers, each with its own scope and its own year of reference. Here is exactly what came from where, and how the figures were prepared for display.</p>
  </section>

  <section class="panel">
    <div class="panel-head"><h2>At a glance</h2></div>
    <dl class="def-list">
      <div><dt>Publishers</dt><dd>${Object.keys(SOURCES).length}</dd></div>
      <div><dt>National series</dt><dd>${INDICATORS.length}</dd></div>
      <div><dt>Prefectures covered</dt><dd>${REGIONS.length}</dd></div>
      <div><dt>Reference years</dt><dd>1990–2024</dd></div>
      <div><dt>Latest energy mix</dt><dd>${latest.year}</dd></div>
      <div><dt>Compiled</dt><dd>26 November 2026</dd></div>
    </dl>
    <p class="panel-note">${esc(ENERGY_CONTEXT.title)}: the energy series on this site comes from the IEA country profile for Japan, published in ${SOURCES.iea.year}.</p>
  </section>

  <div class="source-list-block">
    ${blocks}
  </div>

  <section class="panel">
    <div class="panel-head"><h2>Method</h2></div>
    ${method}
    <p class="panel-note">Figures are reproduced here for study and reference, with the publisher named in every case. Where you need a figure for a decision that matters, go to the source: each publisher's series is linked above and in the <a href="#/glossary">glossary</a>.</p>
  </section>`;
}

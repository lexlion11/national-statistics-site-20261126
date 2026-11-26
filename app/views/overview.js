// views/overview.js — the landing page: the headline figures and what they say.
// One job: show the state of the country at a glance, with the main things found first.

import { INDICATORS, latestPoint, lastChange } from '../data/indicators.js';
import { REGIONS, regionTotals } from '../data/regions.js';
import { ENERGY_MIX, ENERGY_SOURCES } from '../data/energy.js';
import { sourceLabel } from '../data/sources.js';
import { lineChart, rankedBars, stackedArea } from '../charts.js';
import { formatShort, percent, signedPercent, usd, fixed, people } from '../format.js';
import { esc } from '../dom.js';

const HEADLINE = ['population', 'gdp', 'lifeexp', 'unemployment', 'inflation', 'fertility'];

function headlineCard(indicator) {
  const point = latestPoint(indicator);
  const change = lastChange(indicator);
  const value = indicator.format === 'people'
    ? people(point.value)
    : indicator.format === 'usd_bn'
      ? `$${fixed(point.value / 1000, 2)} trn`
      : indicator.format === 'usd'
        ? usd(point.value)
        : indicator.format === 'percent'
          ? percent(point.value, indicator.decimals)
          : indicator.format === 'years'
            ? `${fixed(point.value, 1)} yrs`
            : fixed(point.value, indicator.decimals);
  const direction = change && change.delta > 0 ? 'up' : change && change.delta < 0 ? 'down' : 'flat';
  const deltaText = change
    ? (indicator.format === 'percent'
      ? signedPercent(((change.latest.value - change.previous.value) / Math.abs(change.previous.value || 1)) * 100)
      : `${direction === 'up' ? '▲' : direction === 'down' ? '▼' : '–'} vs ${change.previous.year}`)
    : '';
  return `<article class="stat-card">
    <h3 class="stat-name"><a href="#/indicator/${indicator.id}">${esc(indicator.name)}</a></h3>
    <p class="stat-value">${esc(value)}</p>
    <p class="stat-meta"><span class="stat-delta ${direction}">${esc(deltaText)}</span> <span class="stat-year">${point.year}</span></p>
    <p class="stat-src">${esc(sourceLabel(point.source || indicator.source))}</p>
  </article>`;
}

function populationTrend() {
  const indicator = INDICATORS.find((item) => item.id === 'population');
  return `<div class="panel">
    <div class="panel-head">
      <h2>Population, 1990–2024</h2>
      <a class="panel-link" href="#/indicator/population">Open the population series →</a>
    </div>
    ${lineChart(indicator.points, indicator, { zero: false, band: true, height: 290 })}
    <p class="panel-note">Japan's population passed its peak in 2008 and has fallen every year since; the UN's 2024 revision puts mid-2024 at 123.3 million, a decline of 1.4 million in twelve months.</p>
    <p class="panel-src">${esc(sourceLabel('worldbank'))} for 1990–2023; ${esc(sourceLabel('un_desa'))} for 2024–2025.</p>
  </div>`;
}

function prefectureBars() {
  const top = [...REGIONS].sort((a, b) => b.population - a.population).slice(0, 8);
  const items = top.map((region) => ({
    label: region.name,
    value: region.population,
    note: `${(region.population / regionTotals('population') * 100).toFixed(1)}% of Japan`,
    highlight: region.name === 'Tokyo',
  }));
  return `<div class="panel">
    <div class="panel-head">
      <h2>Where the people live</h2>
      <a class="panel-link" href="#/regions">All 47 prefectures →</a>
    </div>
    ${rankedBars(items, { format: (value) => people(value) })}
    <p class="panel-note">Ten prefectures hold about half the country. Tokyo alone holds 11.2% — more than any prefecture in Hokkaido, Tohoku or the whole island of Shikoku combined.</p>
    <p class="panel-src">${esc(sourceLabel('statjp'))}, Population Census and annual estimates.</p>
  </div>`;
}

function energyMix() {
  const years = ENERGY_MIX.map((row) => row.year);
  const rows = ENERGY_SOURCES.map((source) => ({
    label: source.name,
    color: source.color,
    points: ENERGY_MIX.map((row) => ({ year: row.year, value: row[source.id] })),
  }));
  const legend = ENERGY_SOURCES.map((source) => ({ name: source.name, color: source.color }));
  const latest = ENERGY_MIX[ENERGY_MIX.length - 1];
  return `<div class="panel">
    <div class="panel-head">
      <h2>Energy mix</h2>
      <a class="panel-link" href="#/energy">Energy detail →</a>
    </div>
    ${stackedArea(rows, { years, label: 'Share of primary energy supply by source' })}
    <ul class="legend">${legend.map((item) => `<li><span class="legend-swatch" style="background:${item.color}"></span>${esc(item.name)}</li>`).join('')}</ul>
    <p class="panel-note">Fossil fuels still supply ${fixed(latest.coal + latest.oil + latest.gas, 1)}% of primary energy in ${latest.year}. Nuclear has recovered to ${fixed(latest.nuclear, 1)}% from near zero in 2014, and renewables excluding hydro have passed ${fixed(latest.renewables, 1)}%.</p>
    <p class="panel-src">${esc(sourceLabel('iea'))}.</p>
  </div>`;
}

function newsPanel() {
  const rows = [
    { label: 'Population change since 2008', value: -5.2, unit: '%', note: 'About 6.6 million fewer people than the peak' },
    { label: 'Share aged 65 or older', value: 29.1, unit: '%', note: 'Almost one in three residents' },
    { label: 'Unemployment rate', value: 2.6, unit: '%', note: 'Near a three-decade low' },
    { label: 'Public debt', value: 249.7, unit: '% of GDP', note: 'Second highest in the OECD' },
    { label: 'Life expectancy', value: 84.0, unit: 'years', note: 'Third highest in the world' },
    { label: 'Health spending', value: 11.5, unit: '% of GDP', note: 'Above most European peers' },
  ];
  const items = rows.map((row) => ({ label: row.label, value: row.value, note: `${row.value}${row.unit} — ${row.note}` }));
  return `<div class="panel">
    <div class="panel-head"><h2>Six numbers worth knowing</h2></div>
    <dl class="fact-list">
      ${rows.map((row) => `<div class="fact"><dt>${esc(row.label)}</dt><dd>${esc(row.value)}${esc(row.unit)}<small>${esc(row.note)}</small></dd></div>`).join('')}
    </dl>
    <p class="panel-note">Every figure above is repeated on the page that explains it, with the publisher and the year it refers to.</p>
  </div>`;
}

export function renderOverview() {
  const cards = HEADLINE.map((id) => INDICATORS.find((item) => item.id === id)).filter(Boolean);
  return `
  <section class="page-head">
    <p class="eyebrow">Japan · official statistics, one place</p>
    <h1>Tōkei Atlas</h1>
    <p class="lead">A single, offline reference for Japan's national statistics: ${INDICATORS.length} indicators over ${INDICATORS[0].points.length} years, ${REGIONS.length} prefectures, the energy mix and a comparison with four peer economies. Every number carries the publisher and the year it belongs to.</p>
    <p class="page-actions">
      <a class="button" href="#/indicators">Browse all indicators</a>
      <a class="button ghost" href="#/table">Open the data table</a>
    </p>
  </section>

  <section class="stat-grid" aria-label="Headline indicators">
    ${cards.map(headlineCard).join('')}
  </section>

  <div class="grid-2">
    ${populationTrend()}
    ${newsPanel()}
  </div>

  <div class="grid-2">
    ${prefectureBars()}
    ${energyMix()}
  </div>

  <section class="panel">
    <div class="panel-head"><h2>How this site is put together</h2></div>
    <div class="columns-3">
      <div><h3>Pages</h3><p>An <a href="#/">overview</a>, an <a href="#/indicators">indicator directory</a> and a page per indicator, a <a href="#/regions">prefecture directory</a> and a page per prefecture, <a href="#/compare">peer comparison</a>, the <a href="#/energy">energy mix</a>, a <a href="#/table">sortable data table</a>, a <a href="#/glossary">glossary</a> and <a href="#/sources">sources &amp; method</a>.</p></div>
      <div><h3>Figures</h3><p>Series come from the World Bank, UN DESA, the OECD, the IMF, the IEA, UNDP and the Statistics Bureau of Japan. Values are rounded for display and never blended across sources.</p></div>
      <div><h3>Method</h3><p>Each series keeps its own publisher and year, so a 2023 World Bank figure is never presented as a 2025 statistic. The <a href="#/sources">method page</a> explains each source and the rounding used.</p></div>
    </div>
  </section>`;
}

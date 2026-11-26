// views/region.js — one prefecture in full: where it sits, how it compares.
// One job: describe a single prefecture against the country.

import { regionByCode, REGIONS, regionTotals } from '../data/regions.js';
import { sourceLabel } from '../data/sources.js';
import { rankedBars } from '../charts.js';
import { people, usd, percent, fixed } from '../format.js';
import { esc } from '../dom.js';

function shareOf(field, region) {
  const total = regionTotals(field, 'sum');
  return total ? (region[field] / total) * 100 : 0;
}

export function renderRegion(route) {
  const region = regionByCode(route.regionCode);
  if (!region) {
    return `<section class="page-head"><h1>Prefecture not found</h1><p class="lead">That prefecture is not in the atlas. <a href="#/regions">Browse all 47 prefectures</a>.</p></section>`;
  }

  const populationRank = [...REGIONS].sort((a, b) => b.population - a.population)
    .findIndex((item) => item.code === region.code) + 1;
  const outputRank = [...REGIONS].sort((a, b) => b.gdpPerCapita - a.gdpPerCapita)
    .findIndex((item) => item.code === region.code) + 1;
  const ageRank = [...REGIONS].sort((a, b) => b.agedShare - a.agedShare)
    .findIndex((item) => item.code === region.code) + 1;

  const neighbours = REGIONS.filter((item) => item.region === region.region && item.code !== region.code)
    .map((item) => ({ label: item.name, value: item.population, note: people(item.population) }));

  const context = [
    { label: 'Share of Japan\'s population', value: percent(shareOf('population', region), 1) },
    { label: 'Share of Japan\'s land area', value: percent(shareOf('area', region), 1) },
    { label: 'Population per km²', value: fixed(region.population / region.area, 1) },
  ];

  return `
  <section class="page-head">
    <p class="eyebrow"><a href="#/regions">${esc(region.region)} region</a> · prefecture ${esc(region.code)}</p>
    <h1>${esc(region.name)}</h1>
    <p class="lead">${esc(region.note)}</p>
    <p class="page-actions"><a class="button ghost" href="#/regions">← All prefectures</a></p>
  </section>

  <section class="hero-figures">
    <div class="hero-figure">
      <p class="hero-label">Population</p>
      <p class="hero-value">${esc(people(region.population))}</p>
      <p class="hero-unit">rank ${populationRank} of 47</p>
    </div>
    <div class="hero-figure">
      <p class="hero-label">GDP per capita</p>
      <p class="hero-value">${esc(usd(region.gdpPerCapita))}</p>
      <p class="hero-unit">rank ${outputRank} of 47</p>
    </div>
    <div class="hero-figure">
      <p class="hero-label">Aged 65 and over</p>
      <p class="hero-value">${esc(percent(region.agedShare, 1))}</p>
      <p class="hero-unit">rank ${ageRank} of 47 (oldest first)</p>
    </div>
    <div class="hero-figure">
      <p class="hero-label">Unemployment rate</p>
      <p class="hero-value">${esc(percent(region.unemployment, 1))}</p>
      <p class="hero-unit">of the labour force</p>
    </div>
  </section>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><h2>Where it stands</h2></div>
      <dl class="def-list">
        ${context.map((row) => `<div><dt>${esc(row.label)}</dt><dd>${esc(row.value)}</dd></div>`).join('')}
        <div><dt>Area</dt><dd>${esc(fixed(region.area, 0))} km²</dd></div>
        <div><dt>Capital</dt><dd>${esc(region.capital)}</dd></div>
        <div><dt>Region</dt><dd>${esc(region.region)}</dd></div>
      </dl>
      <p class="panel-note">${esc(region.note)}</p>
      <p class="panel-src">${esc(sourceLabel('statjp'))}, Population Census and annual estimates; prefectural accounts for output per person.</p>
    </div>
    <div class="panel">
      <div class="panel-head"><h2>Other prefectures in ${esc(region.region)}</h2></div>
      ${neighbours.length ? rankedBars(neighbours, { format: (value) => people(value) }) : '<p class="chart-empty">No other prefecture in this region.</p>'}
      <p class="panel-note">Population of the neighbouring prefectures in the same region, for scale.</p>
    </div>
  </div>

  <div class="panel">
    <div class="panel-head"><h2>${esc(region.name)} against the country</h2></div>
    <table class="data-table">
      <caption class="visually-hidden">${esc(region.name)} compared with Japan</caption>
      <thead><tr><th scope="col">Measure</th><th scope="col" class="num">${esc(region.name)}</th><th scope="col" class="num">Japan</th><th scope="col" class="num">Difference</th></tr></thead>
      <tbody>
        <tr><th scope="row">Population</th><td class="num">${esc(people(region.population))}</td><td class="num">${esc(people(regionTotals('population')))}</td><td class="num">${esc(percent(shareOf('population', region), 1))} of the country</td></tr>
        <tr><th scope="row">GDP per capita</th><td class="num">${esc(usd(region.gdpPerCapita))}</td><td class="num">${esc(usd(Math.round(regionTotals('gdpPerCapita', 'mean'))))}</td><td class="num">${esc(percent(((region.gdpPerCapita / regionTotals('gdpPerCapita', 'mean')) - 1) * 100, 1))} vs the prefectural average</td></tr>
        <tr><th scope="row">Unemployment rate</th><td class="num">${esc(percent(region.unemployment, 1))}</td><td class="num">${esc(percent(regionTotals('unemployment', 'mean'), 1))}</td><td class="num">${esc(fixed(region.unemployment - regionTotals('unemployment', 'mean'), 1))} points</td></tr>
        <tr><th scope="row">Aged 65 and over</th><td class="num">${esc(percent(region.agedShare, 1))}</td><td class="num">${esc(percent(regionTotals('agedShare', 'mean'), 1))}</td><td class="num">${esc(fixed(region.agedShare - regionTotals('agedShare', 'mean'), 1))} points</td></tr>
        <tr><th scope="row">Area</th><td class="num">${esc(fixed(region.area, 0))} km²</td><td class="num">${esc(fixed(regionTotals('area'), 0))} km²</td><td class="num">${esc(percent(shareOf('area', region), 1))} of the country's land</td></tr>
      </tbody>
    </table>
    <p class="panel-note">The "Japan" column uses the simple mean across the 47 prefectures, which is the right comparison for rates and the wrong one for totals.</p>
  </div>`;
}

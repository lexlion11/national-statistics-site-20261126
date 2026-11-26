// views/energy.js — how Japan makes and buys its energy, and what that means.
// One job: the energy picture, from primary supply to the generation mix.

import { ENERGY_MIX, ENERGY_SOURCES, ENERGY_CONTEXT, ENERGY_DEMAND } from '../data/energy.js';
import { sourceLabel } from '../data/sources.js';
import { stackedArea, lineChart, barChart } from '../charts.js';
import { fixed, people } from '../format.js';
import { esc } from '../dom.js';

export function renderEnergy() {
  const years = ENERGY_MIX.map((row) => row.year);
  const rows = ENERGY_SOURCES.map((source) => ({
    label: source.name,
    color: source.color,
    points: ENERGY_MIX.map((row) => ({ year: row.year, value: row[source.id] })),
  }));

  const latest = ENERGY_MIX[ENERGY_MIX.length - 1];
  const legend = ENERGY_SOURCES.map((source) => ({ name: source.name, color: source.color }));

  const demandBars = ENERGY_DEMAND.points.map((point) => ({
    label: String(point.year),
    value: point.value,
    color: point.year === latest.year ? 'var(--teal)' : 'var(--indigo-soft)',
  }));

  const nuclear = ENERGY_MIX.map((row) => ({ year: row.year, value: row.nuclear }));

  return `
  <section class="page-head">
    <p class="eyebrow">Energy</p>
    <h1>${esc(ENERGY_CONTEXT.title)}</h1>
    <p class="lead">${esc(ENERGY_CONTEXT.lead)}</p>
  </section>

  <section class="hero-figures">
    ${ENERGY_CONTEXT.facts.map((fact) => `
    <div class="hero-figure">
      <p class="hero-label">${esc(fact.label)}</p>
      <p class="hero-value">${esc(fact.value)}</p>
      <p class="hero-unit">${esc(fact.note)}</p>
    </div>`).join('')}
  </section>

  <div class="panel">
    <div class="panel-head">
      <h2>Primary energy supply by source</h2>
      <span class="panel-note inline">% of total, 2010–2024</span>
    </div>
    ${stackedArea(rows, { years, label: 'Share of primary energy supply by source' })}
    <ul class="legend">${legend.map((item) => `<li><span class="legend-swatch" style="background:${item.color}"></span>${esc(item.name)}</li>`).join('')}</ul>
    <p class="panel-note">In ${latest.year}, coal supplies ${fixed(latest.coal, 1)}% of primary energy, oil ${fixed(latest.oil, 1)}% and natural gas ${fixed(latest.gas, 1)}%. Nuclear contributes ${fixed(latest.nuclear, 1)}%, hydro ${fixed(latest.hydro, 1)}% and other renewables ${fixed(latest.renewables, 1)}%.</p>
    <p class="panel-src">${esc(sourceLabel('iea'))}.</p>
  </div>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><h2>Primary energy demand</h2></div>
      ${barChart(demandBars, { label: 'Primary energy demand', unit: ENERGY_DEMAND.unit, format: (value) => fixed(value, 1) })}
      <p class="panel-note">Demand has been broadly flat for fifteen years. Japan's efficiency gains and the shift away from heavy industry have offset the growth of data centres and electric vehicles.</p>
      <p class="panel-src">${esc(sourceLabel('iea'))}.</p>
    </div>
    <div class="panel">
      <div class="panel-head"><h2>Nuclear generation after Fukushima</h2></div>
      ${lineChart(nuclear, { id: 'nuclear', name: 'Nuclear share of primary energy', unit: '% of primary energy', format: 'percent', decimals: 1 }, { zero: true, height: 260 })}
      <p class="panel-note">Nuclear generation fell to near zero between 2011 and 2015 as reactors were shut down after the Fukushima Daiichi accident. Restarted reactors have taken the share back above 9%, still well below the 13% of 2010.</p>
      <p class="panel-src">${esc(sourceLabel('iea'))}.</p>
    </div>
  </div>

  <div class="panel">
    <div class="panel-head"><h2>Why it matters</h2></div>
    <div class="columns-3">
      <div><h3>Import dependence</h3><p>About 92% of primary energy is imported. Almost every unit of oil, gas and coal used in Japan arrives by ship, and the price of those imports is a large part of the country's trade balance.</p></div>
      <div><h3>The yen and the bill</h3><p>Because energy is paid for in dollars, a weak yen raises domestic prices: it is one of the main channels through which exchange rates reach household bills.</p></div>
      <div><h3>Carbon</h3><p>Fossil fuels at 75% of supply make Japan the world's sixth largest emitter of carbon dioxide, even though it is the world's tenth largest economy.</p></div>
    </div>
    <p class="panel-src">${esc(sourceLabel('iea'))} for the mix and import dependence.</p>
  </div>`;
}

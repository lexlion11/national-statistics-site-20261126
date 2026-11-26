// views/compare.js — Japan beside four peer economies on the measures people compare.
// One job: put Japan in its international context, measure by measure.

import { PEERS, PEER_MEASURES, peerAverage, rankIn } from '../data/peers.js';
import { sourceLabel } from '../data/sources.js';
import { rankedBars } from '../charts.js';
import { people, usd, percent, fixed } from '../format.js';
import { esc } from '../dom.js';

function formatFor(measure, value) {
  switch (measure.format) {
    case 'people': return people(value);
    case 'usd': return usd(value);
    case 'percent': return percent(value, 1);
    case 'years': return `${fixed(value, 1)} yrs`;
    default: return fixed(value, 2);
  }
}

export function renderCompare(route, params) {
  const measureId = params.get('measure') || 'lifeExpectancy';
  const measure = PEER_MEASURES.find((item) => item.id === measureId) || PEER_MEASURES[2];

  const tabs = PEER_MEASURES.map((item) => {
    const href = `#/compare?measure=${item.id}`;
    return `<a class="tab${item.id === measure.id ? ' active' : ''}" href="${href}">${esc(item.name)}</a>`;
  }).join('');

  const rows = PEERS.map((peer) => {
    const value = peer[measure.id];
    const average = peerAverage(measure.id);
    const isJapan = peer.group === 'Reference';
    const difference = average ? ((value - average) / Math.abs(average)) * 100 : 0;
    const better = measure.better === 'high' ? difference >= 0 : measure.better === 'low' ? difference <= 0 : null;
    return `<tr class="${isJapan ? 'row-japan' : ''}">
      <th scope="row">${esc(peer.name)}${isJapan ? ' <span class="tag">Japan</span>' : ''}</th>
      <td class="num">${esc(formatFor(measure, value))}</td>
      <td class="num">${esc(formatFor(measure, average))}</td>
      <td class="num ${better === null ? '' : better ? 'good' : 'bad'}">${esc(percent(difference, 1))} vs peers</td>
      <td class="num">${esc(rankIn(measure, value) ? `${rankIn(measure, value)} of ${PEERS.length}` : '—')}</td>
    </tr>`;
  }).join('');

  const bars = [...PEERS].sort((a, b) => {
    if (measure.better === 'low') return a[measure.id] - b[measure.id];
    return b[measure.id] - a[measure.id];
  }).map((peer) => ({
    label: peer.name,
    value: peer[measure.id],
    note: peer.group === 'Reference' ? 'Japan' : 'peer economy',
    highlight: peer.group === 'Reference',
  }));

  const japan = PEERS[0];
  const facts = PEER_MEASURES.map((item) => {
    const value = japan[item.id];
    const average = peerAverage(item.id);
    const difference = average ? ((value - average) / Math.abs(average)) * 100 : 0;
    return `<li><span class="cmp-name">${esc(item.name)}</span><span class="cmp-value">${esc(formatFor(item, value))}</span><span class="cmp-delta">${esc(percent(difference, 1))} vs peer average</span></li>`;
  }).join('');

  return `
  <section class="page-head">
    <p class="eyebrow">International context</p>
    <h1>Japan beside its peers</h1>
    <p class="lead">Japan's numbers against South Korea, Germany, Italy and the United States — the four economies most often compared with it. Choose a measure to change the whole table.</p>
  </section>

  <div class="tabs" aria-label="Choose a measure">${tabs}</div>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-head">
        <h2>${esc(measure.name)}</h2>
        <span class="panel-note inline">${esc(measure.unit)}</span>
      </div>
      ${rankedBars(bars, { format: (value) => formatFor(measure, value) })}
      <p class="panel-note">Ranked ${measure.better === 'high' ? 'highest first' : measure.better === 'low' ? 'lowest first' : 'by size'}.</p>
    </div>
    <div class="panel">
      <div class="panel-head"><h2>The table</h2></div>
      <table class="data-table">
        <caption class="visually-hidden">${esc(measure.name)} for Japan and its peers</caption>
        <thead><tr><th scope="col">Country</th><th scope="col" class="num">Value</th><th scope="col" class="num">Peer average</th><th scope="col" class="num">Difference</th><th scope="col" class="num">Rank</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p class="panel-src">${esc(sourceLabel('worldbank'))} for population, output per person and demographics; ${esc(sourceLabel('oecd'))} for unemployment, inflation and health spending; ${esc(sourceLabel('undp'))} for schooling.</p>
    </div>
  </div>

  <div class="panel">
    <div class="panel-head"><h2>Japan at a glance against the peer average</h2></div>
    <ul class="cmp-list">${facts}</ul>
    <p class="panel-note">Japan leads on life expectancy and on the share of people aged 65 and over, trails on output per person among Western peers, and has the lowest unemployment rate in the group.</p>
  </div>`;
}

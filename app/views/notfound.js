// views/notfound.js — the page shown when a link points at nothing.
// One job: say what is missing and offer the way back.

import { INDICATORS } from '../data/indicators.js';
import { esc } from '../dom.js';

export function renderNotFound(route) {
  const suggestions = INDICATORS.slice(0, 6).map((indicator) => (
    `<a class="chip" href="#/indicator/${indicator.id}">${esc(indicator.name)}</a>`
  )).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">Not found</p>
    <h1>That page does not exist</h1>
    <p class="lead">Nothing is published at <code>${esc(route.missing || route.path)}</code>. The atlas has ${INDICATORS.length} indicator pages, 47 prefecture pages and six other sections.</p>
    <p class="page-actions">
      <a class="button" href="#/">Back to the overview</a>
      <a class="button ghost" href="#/indicators">All indicators</a>
    </p>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Try one of these</h2></div>
    <ul class="chip-row">${suggestions}</ul>
  </section>`;
}

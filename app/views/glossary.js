// views/glossary.js — the statistical terms behind the numbers.
// One job: define the concepts a visitor meets on the way to a figure.

import { GLOSSARY } from '../data/glossary.js';
import { indicatorById } from '../data/indicators.js';
import { esc } from '../dom.js';

export function renderGlossary(route, params) {
  const query = (params.get('q') || '').trim().toLowerCase();

  const entries = GLOSSARY.filter((item) => {
    if (!query) return true;
    return `${item.term} ${item.definition} ${item.short}`.toLowerCase().includes(query);
  });

  const letters = [...new Set(GLOSSARY.map((item) => item.term.charAt(0).toUpperCase()))].sort();
  const index = letters.map((letter) => `<a href="#/glossary?q=${encodeURIComponent(letter)}" class="gloss-letter">${esc(letter)}</a>`).join('');

  const body = entries.map((item) => {
    const links = item.related.map((id) => {
      const indicator = indicatorById(id);
      if (!indicator) return '';
      return `<a class="chip" href="#/indicator/${indicator.id}">${esc(indicator.name)}</a>`;
    }).join('');
    return `<article class="gloss-entry" id="gloss-${esc(item.term.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}">
      <h3>${esc(item.term)}</h3>
      <p class="gloss-tag">${esc(item.short)}</p>
      <p>${esc(item.definition)}</p>
      ${links ? `<p class="gloss-links">See it in the data: ${links}</p>` : ''}
    </article>`;
  }).join('');

  const empty = entries.length === 0
    ? `<div class="empty"><p>No term matches “${esc(query)}”.</p><p><a href="#/glossary">Show all ${GLOSSARY.length} terms</a></p></div>`
    : '';

  return `
  <section class="page-head">
    <p class="eyebrow">Reference</p>
    <h1>Glossary</h1>
    <p class="lead">${GLOSSARY.length} terms that come up in any national statistics office, explained in plain language — what the measure is, and what it is often mistaken for.</p>
  </section>

  <form class="filters" role="search">
    <label class="field">
      <span class="field-label">Find a term</span>
      <input type="search" id="glossary-search" name="q" value="${esc(query)}" placeholder="inflation, debt, life expectancy…" autocomplete="off">
    </label>
    <div class="tabs" aria-label="Jump to a letter">${index}</div>
  </form>

  <p class="result-count">${entries.length} of ${GLOSSARY.length} terms shown</p>
  <div class="gloss-grid">${body}</div>
  ${empty}`;
}

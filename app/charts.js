// charts.js — small hand-written SVG chart helpers.
// One job: draw the charts. No library, no canvas, no network: each helper returns an SVG string.

import { formatShort } from './format.js';

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function niceTicks(min, max, count = 5) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0];
  if (min === max) return [min];
  const span = max - min;
  const rawStep = span / Math.max(1, count - 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalised = rawStep / magnitude;
  const step = (normalised <= 1 ? 1 : normalised <= 2 ? 2 : normalised <= 2.5 ? 2.5 : normalised <= 5 ? 5 : 10) * magnitude;
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks = [];
  for (let value = start; value <= end + step / 1000; value += step) {
    ticks.push(Number(value.toFixed(10)));
  }
  return ticks;
}

/**
 * A line chart with a filled area, an optional zero line and axis labels.
 * points: [{ year, value }], indicator: the indicator whose format drives the labels.
 */
export function lineChart(points, indicator, options = {}) {
  const width = options.width || 720;
  const height = options.height || 300;
  const pad = { top: 18, right: 18, bottom: 34, left: 56 };
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const usable = points.filter((point) => Number.isFinite(point.value));
  if (usable.length < 2) return '<p class="chart-empty">Not enough observations to draw a line.</p>';

  const values = usable.map((point) => point.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (options.zero) min = Math.min(0, min);
  if (options.band) {
    const padValue = (max - min) * 0.12 || Math.abs(max) * 0.12 || 1;
    min -= padValue;
    max += padValue;
  }
  const ticks = niceTicks(min, max, 5);
  const axisMin = ticks[0];
  const axisMax = ticks[ticks.length - 1];

  const x = (index) => pad.left + (index / (usable.length - 1)) * plotWidth;
  const y = (value) => pad.top + plotHeight - ((value - axisMin) / (axisMax - axisMin || 1)) * plotHeight;

  const line = usable.map((point, index) => `${index === 0 ? 'M' : 'L'}${x(index).toFixed(1)},${y(point.value).toFixed(1)}`).join(' ');
  const area = `${line} L${x(usable.length - 1).toFixed(1)},${(pad.top + plotHeight).toFixed(1)} L${x(0).toFixed(1)},${(pad.top + plotHeight).toFixed(1)} Z`;

  const grid = ticks.map((tick) => {
    const ty = y(tick);
    return `<line class="grid" x1="${pad.left}" y1="${ty.toFixed(1)}" x2="${(width - pad.right).toFixed(1)}" y2="${ty.toFixed(1)}"/>`
      + `<text class="axis-label" x="${pad.left - 8}" y="${(ty + 4).toFixed(1)}" text-anchor="end">${esc(formatShort(indicator, tick))}</text>`;
  }).join('');

  const zeroLine = options.zero && axisMin < 0 && axisMax > 0
    ? `<line class="zero-line" x1="${pad.left}" y1="${y(0).toFixed(1)}" x2="${(width - pad.right).toFixed(1)}" y2="${y(0).toFixed(1)}"/>`
    : '';

  const labelEvery = Math.max(1, Math.ceil(usable.length / (options.maxXLabels || 8)));
  const xLabels = usable.map((point, index) => {
    if (index % labelEvery !== 0 && index !== usable.length - 1) return '';
    const anchor = index === 0 ? 'start' : index === usable.length - 1 ? 'end' : 'middle';
    return `<text class="axis-label" x="${x(index).toFixed(1)}" y="${height - 12}" text-anchor="${anchor}">${point.year}</text>`;
  }).join('');

  const dots = usable.map((point, index) => {
    const last = index === usable.length - 1;
    return `<circle class="${last ? 'dot dot-last' : 'dot'}" cx="${x(index).toFixed(1)}" cy="${y(point.value).toFixed(1)}" r="${last ? 4.5 : 2.6}"><title>${point.year}: ${esc(formatShort(indicator, point.value))}</title></circle>`;
  }).join('');

  const last = usable[usable.length - 1];
  const lastLabel = `<text class="value-label" x="${(x(usable.length - 1) - 6).toFixed(1)}" y="${(y(last.value) - 10).toFixed(1)}" text-anchor="end">${esc(formatShort(indicator, last.value))}</text>`;

  return `<svg class="chart chart-line" viewBox="0 0 ${width} ${height}" role="img" preserveAspectRatio="xMidYMid meet" aria-label="${esc(indicator.name)} by year">`
    + `<g class="grid-lines">${grid}</g>${zeroLine}`
    + `<path class="area" d="${area}"/><path class="line" d="${line}"/>${dots}${lastLabel}`
    + `<text class="axis-title" x="${pad.left}" y="${12}">${esc(indicator.unit)}</text>`
    + `${xLabels}</svg>`;
}

/**
 * A vertical bar chart, one bar per point, coloured by a category map.
 * bars: [{ label, value, category }]
 */
export function barChart(bars, options = {}) {
  const width = options.width || 720;
  const height = options.height || 300;
  const pad = { top: 20, right: 18, bottom: 44, left: 56 };
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const usable = bars.filter((bar) => Number.isFinite(bar.value));
  if (!usable.length) return '<p class="chart-empty">No data to draw.</p>';

  const max = Math.max(...usable.map((bar) => bar.value));
  const ticks = niceTicks(0, max, 5);
  const axisMax = ticks[ticks.length - 1] || max;
  const slot = plotWidth / usable.length;
  const barWidth = Math.min(46, slot * 0.62);

  const grid = ticks.map((tick) => {
    const ty = pad.top + plotHeight - (tick / axisMax) * plotHeight;
    return `<line class="grid" x1="${pad.left}" y1="${ty.toFixed(1)}" x2="${(width - pad.right).toFixed(1)}" y2="${ty.toFixed(1)}"/>`
      + `<text class="axis-label" x="${pad.left - 8}" y="${(ty + 4).toFixed(1)}" text-anchor="end">${esc(options.format ? options.format(tick) : tick)}</text>`;
  }).join('');

  const shapes = usable.map((bar, index) => {
    const barHeight = (Math.max(0, bar.value) / axisMax) * plotHeight;
    const bx = pad.left + index * slot + (slot - barWidth) / 2;
    const by = pad.top + plotHeight - barHeight;
    const fill = bar.color || 'var(--indigo)';
    return `<rect class="bar" x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${Math.max(0, barHeight).toFixed(1)}" fill="${fill}" rx="2"><title>${esc(bar.label)}: ${esc(options.format ? options.format(bar.value) : bar.value)}</title></rect>`
      + `<text class="axis-label" x="${(bx + barWidth / 2).toFixed(1)}" y="${(by - 5).toFixed(1)}" text-anchor="middle">${esc(options.format ? options.format(bar.value) : bar.value)}</text>`;
  }).join('');

  const labels = usable.map((bar, index) => {
    const bx = pad.left + index * slot + slot / 2;
    return `<text class="axis-label" x="${bx.toFixed(1)}" y="${height - 26}" text-anchor="middle">${esc(bar.label)}</text>`;
  }).join('');

  return `<svg class="chart chart-bar" viewBox="0 0 ${width} ${height}" role="img" preserveAspectRatio="xMidYMid meet" aria-label="${esc(options.label || 'Bar chart')}">`
    + `<g class="grid-lines">${grid}</g>${shapes}${labels}`
    + `<text class="axis-title" x="${pad.left}" y="12">${esc(options.unit || '')}</text></svg>`;
}

/**
 * A stacked area chart: how the shares of several categories change over time.
 * rows: [{ label, points: [{ year, value }] }], each with a colour.
 */
export function stackedArea(rows, options = {}) {
  const width = options.width || 720;
  const height = options.height || 320;
  const pad = { top: 18, right: 18, bottom: 34, left: 46 };
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const years = options.years || [];
  if (!rows.length || years.length < 2) return '<p class="chart-empty">Not enough observations to draw an area chart.</p>';

  const stacks = years.map((year) => {
    const slices = rows.map((row) => {
      const point = row.points.find((item) => item.year === year);
      return { row, value: point ? point.value : 0 };
    });
    const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
    let offset = 0;
    return slices.map((slice) => {
      const fraction = slice.value / total;
      const band = { slice, from: offset, to: offset + fraction };
      offset += fraction;
      return band;
    });
  });

  const x = (index) => pad.left + (index / (years.length - 1)) * plotWidth;
  const bandHeight = (band) => (band.to - band.from) * plotHeight;

  const areas = rows.map((row, rowIndex) => {
    const upper = [];
    const lower = [];
    years.forEach((year, index) => {
      const band = stacks[index].find((item) => item.slice.row === row);
      const top = pad.top + plotHeight - band.to * plotHeight;
      const bottom = pad.top + plotHeight - band.from * plotHeight;
      upper.push(`${index === 0 ? 'M' : 'L'}${x(index).toFixed(1)},${top.toFixed(1)}`);
      lower.unshift(`L${x(index).toFixed(1)},${bottom.toFixed(1)}`);
    });
    const path = `${upper.join(' ')} ${lower.join(' ')} Z`;
    return `<path class="band" d="${path}" fill="${row.color}" fill-opacity="0.85"><title>${esc(row.label)}</title></path>`;
  }).join('');

  const xLabels = years.map((year, index) => {
    if (index % Math.ceil(years.length / 8) !== 0 && index !== years.length - 1) return '';
    const anchor = index === 0 ? 'start' : index === years.length - 1 ? 'end' : 'middle';
    return `<text class="axis-label" x="${x(index).toFixed(1)}" y="${height - 12}" text-anchor="${anchor}">${year}</text>`;
  }).join('');

  const grid = [0, 25, 50, 75, 100].map((value) => {
    const ty = pad.top + plotHeight - (value / 100) * plotHeight;
    return `<line class="grid" x1="${pad.left}" y1="${ty.toFixed(1)}" x2="${(width - pad.right).toFixed(1)}" y2="${ty.toFixed(1)}"/>`
      + `<text class="axis-label" x="${pad.left - 8}" y="${(ty + 4).toFixed(1)}" text-anchor="end">${value}%</text>`;
  }).join('');

  return `<svg class="chart chart-area" viewBox="0 0 ${width} ${height}" role="img" preserveAspectRatio="xMidYMid meet" aria-label="${esc(options.label || 'Composition over time')}">`
    + `<g class="grid-lines">${grid}</g>${areas}${xLabels}</svg>`;
}

/**
 * A horizontal ranked bar list: the shape of a comparison across regions or peers.
 * items: [{ label, value, note, highlight }]
 */
export function rankedBars(items, options = {}) {
  if (!items.length) return '<p class="chart-empty">No data to draw.</p>';
  const max = Math.max(...items.map((item) => Math.abs(item.value)));
  const rows = items.map((item) => {
    const fraction = max ? (Math.abs(item.value) / max) * 100 : 0;
    const highlight = item.highlight ? ' highlight' : '';
    return `<li class="rank-row${highlight}">`
      + `<span class="rank-label" title="${esc(item.label)}">${esc(item.label)}</span>`
      + `<span class="rank-track"><span class="rank-fill" style="width:${fraction.toFixed(2)}%"></span></span>`
      + `<span class="rank-value">${esc(options.format ? options.format(item.value) : item.value)}</span>`
      + (item.note ? `<span class="rank-note">${esc(item.note)}</span>` : '')
      + `</li>`;
  }).join('');
  return `<ul class="rank-list">${rows}</ul>`;
}

/** A small inline sparkline for a table cell. */
export function sparkline(points, options = {}) {
  const usable = points.filter((point) => Number.isFinite(point.value));
  if (usable.length < 2) return '';
  const width = options.width || 96;
  const height = options.height || 26;
  const values = usable.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const x = (index) => (index / (usable.length - 1)) * (width - 4) + 2;
  const y = (value) => height - 3 - ((value - min) / span) * (height - 6);
  const path = usable.map((point, index) => `${index === 0 ? 'M' : 'L'}${x(index).toFixed(1)},${y(point.value).toFixed(1)}`).join(' ');
  const last = usable[usable.length - 1];
  const colour = options.color || 'var(--indigo)';
  return `<svg class="sparkline" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.label || 'trend')}">`
    + `<path d="${path}" fill="none" stroke="${colour}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`
    + `<circle cx="${x(usable.length - 1).toFixed(1)}" cy="${y(last.value).toFixed(1)}" r="2" fill="${colour}"/></svg>`;
}

/** A legend for a set of colours. */
export function legend(items) {
  return `<ul class="legend">${items.map((item) => (
    `<li><span class="legend-swatch" style="background:${item.color}"></span>${esc(item.name)}</li>`
  )).join('')}</ul>`;
}


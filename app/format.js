// format.js — number, unit and date formatting for every figure on the site.
// One job: turn raw values into the strings the reader sees.

const NBSP = ' ';

function group(intPart) {
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** Format a value with a fixed number of decimals and grouped thousands. */
export function fixed(value, decimals = 0) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  const negative = value < 0;
  const text = Math.abs(value).toFixed(decimals);
  const [int, frac] = text.split('.');
  const body = frac ? `${group(int)}.${frac}` : group(int);
  return negative ? `−${body}` : body;
}

/** Format a percentage-point value with a trailing % sign. */
export function percent(value, decimals = 1) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  return `${fixed(value, decimals)}%`;
}

/** Format a currency amount in US dollars. */
export function usd(value, decimals = 0) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  const negative = value < 0;
  const text = Math.abs(value).toFixed(decimals);
  const [int, frac] = text.split('.');
  const body = frac ? `${group(int)}.${frac}` : group(int);
  return `${negative ? '−' : ''}$${body}`;
}

/** Format a large currency amount in trillions of US dollars. */
export function usdTrillion(value, decimals = 2) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  return `$${fixed(value, decimals)}${NBSP}trn`;
}

/** Format a population count with a millions suffix. */
export function people(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  if (Math.abs(value) >= 1e9) return `${fixed(value / 1e9, 2)}${NBSP}billion`;
  if (Math.abs(value) >= 1e6) return `${fixed(value / 1e6, 2)}${NBSP}million`;
  if (Math.abs(value) >= 1e3) return `${fixed(value / 1e3, 1)}${NBSP}thousand`;
  return fixed(value, 0);
}

/** Format years, e.g. 84.1 → "84.1 years". */
export function years(value, decimals = 1) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  return `${fixed(value, decimals)} years`;
}

/** Format a ratio such as births per woman. */
export function ratio(value, decimals = 2) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  return fixed(value, decimals);
}

/** Format a signed change, e.g. +1.5% or −0.4%. */
export function signedPercent(value, decimals = 1) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  const sign = value > 0 ? '+' : value < 0 ? '−' : '';
  return `${sign}${fixed(Math.abs(value), decimals)}%`;
}

/** Format a signed plain-number change. */
export function signed(value, decimals = 1) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  const sign = value > 0 ? '+' : value < 0 ? '−' : '';
  return `${sign}${fixed(Math.abs(value), decimals)}`;
}

/** The scale words used by the unit toggle on indicator pages. */
export const SCALES = [
  { id: 'raw', label: 'Exact' },
  { id: 'thousand', label: 'Thousands' },
  { id: 'million', label: 'Millions' },
  { id: 'billion', label: 'Billions' },
];

/** Divide a value by the factor of a scale id. */
export function scaleFactor(scale) {
  if (scale === 'thousand') return 1e3;
  if (scale === 'million') return 1e6;
  if (scale === 'billion') return 1e9;
  return 1;
}

/** The suffix that belongs to a scale id. */
export function scaleSuffix(scale) {
  if (scale === 'thousand') return ' thousand';
  if (scale === 'million') return ' million';
  if (scale === 'billion') return ' billion';
  return '';
}

/** Format a value using an indicator's own unit rules and the chosen scale. */
export function formatValue(indicator, value, options = {}) {
  const scale = options.scale || 'raw';
  const factor = scaleFactor(scale);
  const scaled = value === null || value === undefined ? null : value / factor;
  const decimals = options.decimals !== undefined ? options.decimals : indicator.decimals;
  switch (indicator.format) {
    case 'percent':
      return `${fixed(scaled, decimals)}%`;
    case 'usd':
      return `${fixed(scaled, decimals)}${NBSP}USD`;
    case 'usd_trillion':
      return `$${fixed(scaled, decimals)}${NBSP}trn`;
    case 'jpy_trillion':
      return `¥${fixed(scaled, decimals)}${NBSP}trn`;
    case 'people':
      return `${fixed(scaled, 0)}${scaleSuffix(scale)}`;
    case 'years':
      return `${fixed(scaled, decimals)} years`;
    default:
      return `${fixed(scaled, decimals)}${scaleSuffix(scale)}`;
  }
}

/** A short label for a value, used on charts and axes. */
export function formatShort(indicator, value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  if (indicator.format === 'percent') return `${fixed(value, 1)}%`;
  if (indicator.format === 'usd_trillion') return `$${fixed(value, 2)}T`;
  if (indicator.format === 'jpy_trillion') return `¥${fixed(value, 1)}T`;
  if (indicator.format === 'usd') return `$${fixed(value, 0)}`;
  if (indicator.format === 'people') return `${fixed(value / 1e6, 1)}M`;
  if (indicator.format === 'years') return fixed(value, 1);
  return fixed(value, indicator.decimals);
}

/** Format a date as "26 November 2026". */
export function longDate(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// dom.js — tiny DOM helpers shared by every view.
// One job: build and update markup without a framework.

/** Escape a value for safe insertion into HTML text or a quoted attribute. */
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Replace the contents of `node` with an HTML string. */
export function setHtml(node, markup) {
  node.innerHTML = markup;
  return node;
}

/** Create an element with attributes and children in one call. */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'html') node.innerHTML = value;
    else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else node.setAttribute(key, value === true ? '' : String(value));
  }
  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    if (child === null || child === undefined || child === false) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

/** Delegate an event from a root node to matching descendants. */
export function on(root, selector, type, handler) {
  root.addEventListener(type, (event) => {
    const target = event.target instanceof Element ? event.target.closest(selector) : null;
    if (target && root.contains(target)) handler(event, target);
  });
}

/** Read a query string parameter from a URLSearchParams-like object. */
export function param(params, name, fallback = '') {
  const value = params.get(name);
  return value === null ? fallback : value;
}

/** Read a numeric query string parameter, clamped to a range. */
export function numberParam(params, name, fallback, min, max) {
  const raw = Number(params.get(name));
  if (!Number.isFinite(raw)) return fallback;
  return Math.min(max, Math.max(min, raw));
}

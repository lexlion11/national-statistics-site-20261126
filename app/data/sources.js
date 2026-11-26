// data/sources.js — the source registry every figure on the site points at.
// One job: say who published a number and which year of their publication it came from.

export const SOURCES = {
  worldbank: {
    id: 'worldbank',
    label: 'World Bank, World Development Indicators',
    year: 2023,
    kind: 'International database',
    note: 'Annual series as published in the World Development Indicators database; the latest year with a full set of observations for Japan is 2023.',
  },
  un_desa: {
    id: 'un_desa',
    label: 'UN DESA, World Population Prospects 2024 revision',
    year: 2024,
    kind: 'United Nations estimates',
    note: 'Mid-year population estimates and projections from the 2024 revision of the UN population projections.',
  },
  oecd: {
    id: 'oecd',
    label: 'OECD',
    year: 2024,
    kind: 'International database',
    note: 'Figures from the OECD data portal, published for Japan in 2024 where the series is updated annually.',
  },
  imf: {
    id: 'imf',
    label: 'IMF, World Economic Outlook',
    year: 2024,
    kind: 'International database',
    note: 'October 2024 vintage of the World Economic Outlook database, used for the latest year of the debt and output series.',
  },
  iea: {
    id: 'iea',
    label: 'IEA, Japan energy profile',
    year: 2024,
    kind: 'Energy agency statistics',
    note: 'Primary energy supply and the electricity generation mix as published in the IEA country profile for Japan.',
  },
  statjp: {
    id: 'statjp',
    label: 'Statistics Bureau of Japan',
    year: 2020,
    kind: 'National statistical office',
    note: 'Population Census of Japan and the annual Population Estimates; the census is the authority for the prefectural table.',
  },
  undp: {
    id: 'undp',
    label: 'UNDP, Human Development Report 2023/24',
    year: 2024,
    kind: 'United Nations report',
    note: 'Human development statistics (education and health) as published in the 2023/24 Human Development Report.',
  },
};

/** Look up a source by id, falling back to a plain-text label. */
export function sourceLabel(id) {
  const source = SOURCES[id];
  if (!source) return id || 'Source not recorded';
  return `${source.label}, ${source.year}`;
}

/** The short publisher name, without the year. */
export function sourceName(id) {
  const source = SOURCES[id];
  return source ? source.label : id || 'Source not recorded';
}

/** A source badge: publisher plus the year the figure belongs to. */
export function sourceBadge(id, year) {
  const source = SOURCES[id];
  if (!source) return `<span class="src">${id || 'unknown source'}</span>`;
  return `<span class="src"><span class="src-pub">${source.label}</span> <span class="src-year">${year ?? source.year}</span></span>`;
}

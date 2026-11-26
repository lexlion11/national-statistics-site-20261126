// data/peers.js — Japan beside four comparator economies, on the measures visitors compare most.
// One job: the international comparison table and its summary statistics.

export const PEERS = [
  {
    code: 'JPN', name: 'Japan', group: 'Reference',
    population: 124516650, gdpPerCapita: 33834, lifeExpectancy: 84.0,
    unemployment: 2.6, inflation: 3.5, fertility: 1.20, agedShare: 29.1,
    schooling: 12.0, healthSpend: 11.5,
  },
  {
    code: 'KOR', name: 'South Korea', group: 'Peer',
    population: 51735256, gdpPerCapita: 32255, lifeExpectancy: 84.3,
    unemployment: 2.7, inflation: 2.2, fertility: 0.80, agedShare: 19.0,
    schooling: 12.2, healthSpend: 8.4,
  },
  {
    code: 'DEU', name: 'Germany', group: 'Peer',
    population: 83294633, gdpPerCapita: 48718, lifeExpectancy: 81.1,
    unemployment: 3.1, inflation: 5.9, fertility: 1.35, agedShare: 22.3,
    schooling: 12.8, healthSpend: 12.7,
  },
  {
    code: 'ITA', name: 'Italy', group: 'Peer',
    population: 58940425, gdpPerCapita: 34876, lifeExpectancy: 83.1,
    unemployment: 7.6, inflation: 5.2, fertility: 1.20, agedShare: 24.4,
    schooling: 10.7, healthSpend: 9.2,
  },
  {
    code: 'USA', name: 'United States', group: 'Peer',
    population: 339996564, gdpPerCapita: 76330, lifeExpectancy: 79.4,
    unemployment: 3.6, inflation: 4.1, fertility: 1.62, agedShare: 18.0,
    schooling: 13.9, healthSpend: 16.5,
  },
];

/** The measures the comparison table can show, with their units and direction. */
export const PEER_MEASURES = [
  { id: 'population', name: 'Population', unit: 'people', format: 'people', better: 'none' },
  { id: 'gdpPerCapita', name: 'GDP per capita', unit: 'current US$', format: 'usd', better: 'high' },
  { id: 'lifeExpectancy', name: 'Life expectancy', unit: 'years', format: 'years', better: 'high' },
  { id: 'unemployment', name: 'Unemployment rate', unit: '% of labour force', format: 'percent', better: 'low' },
  { id: 'inflation', name: 'Inflation', unit: '% on the year', format: 'percent', better: 'low' },
  { id: 'fertility', name: 'Fertility rate', unit: 'births per woman', format: 'ratio', better: 'none' },
  { id: 'agedShare', name: 'Aged 65 and over', unit: '% of population', format: 'percent', better: 'none' },
  { id: 'schooling', name: 'Mean years of schooling', unit: 'years', format: 'ratio', better: 'high' },
  { id: 'healthSpend', name: 'Health spending', unit: '% of GDP', format: 'percent', better: 'none' },
];

/** Japan's own row, for the "compare with peers" view. */
export const JAPAN = PEERS[0];

/** The average of the four peers on one measure (Japan excluded). */
export function peerAverage(measureId) {
  const peers = PEERS.filter((peer) => peer.group === 'Peer');
  const total = peers.reduce((sum, peer) => sum + peer[measureId], 0);
  return total / peers.length;
}

/** Rank a value among the five rows, best first, following the measure's direction. */
export function rankIn(measure, value) {
  const rows = PEERS.map((peer) => peer[measure.id]).sort((a, b) => {
    if (measure.better === 'low') return a - b;
    if (measure.better === 'high') return b - a;
    return b - a;
  });
  const index = rows.findIndex((item) => item === value);
  return index === -1 ? null : index + 1;
}

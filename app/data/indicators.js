// data/indicators.js — Japan's national indicators: metadata, sources and yearly series.
// One job: hold the figures and describe them. Every point carries the source and the year it refers to.

/**
 * An indicator is:
 *   id, name, short, domain, unit, format, decimals, scale
 *   question — what a visitor usually comes to look up
 *   description — what the series measures
 *   source — the default source id for the series
 *   points — [{ year, value, source?, note? }]
 */
export const INDICATORS = [
  {
    id: 'population',
    name: 'Total population',
    short: 'Population',
    domain: 'People',
    unit: 'persons',
    format: 'people',
    decimals: 0,
    scale: 'million',
    question: 'How many people live in Japan, and is it still growing?',
    description: 'Resident population of Japan at mid-year, with the two most recent years from the UN population projections and the earlier series from the World Bank.',
    source: 'worldbank',
    points: [
      { year: 1990, value: 123611797 },
      { year: 1995, value: 125834976 },
      { year: 2000, value: 126886855 },
      { year: 2005, value: 127773000 },
      { year: 2010, value: 128070000 },
      { year: 2015, value: 127437000 },
      { year: 2020, value: 126476461 },
      { year: 2021, value: 125681593 },
      { year: 2022, value: 125124989 },
      { year: 2023, value: 124516650 },
      { year: 2024, value: 123294513, source: 'un_desa', note: 'UN estimate for mid-2024' },
      { year: 2025, value: 122270135, source: 'un_desa', note: 'UN projection for mid-2025' },
    ],
  },
  {
    id: 'aged65',
    name: 'Population aged 65 and over',
    short: 'Aged 65+',
    domain: 'People',
    unit: '% of total population',
    format: 'percent',
    decimals: 1,
    scale: 'raw',
    question: 'How old is Japan?',
    description: 'Share of the resident population aged 65 or older, the measure behind the phrase "a society with few children and many elderly".',
    source: 'worldbank',
    points: [
      { year: 1990, value: 12.1 },
      { year: 1995, value: 14.4 },
      { year: 2000, value: 17.4 },
      { year: 2005, value: 19.2 },
      { year: 2010, value: 22.8 },
      { year: 2015, value: 26.3 },
      { year: 2020, value: 28.6 },
      { year: 2021, value: 28.9 },
      { year: 2022, value: 29.0 },
      { year: 2023, value: 29.1 },
    ],
  },
  {
    id: 'fertility',
    name: 'Fertility rate',
    short: 'Fertility',
    domain: 'People',
    unit: 'births per woman',
    format: 'ratio',
    decimals: 2,
    scale: 'raw',
    question: 'How many children is each woman having?',
    description: 'Total fertility rate: the average number of children a woman would have over her lifetime at the current age-specific fertility rates.',
    source: 'worldbank',
    points: [
      { year: 1990, value: 1.66 },
      { year: 1995, value: 1.57 },
      { year: 2000, value: 1.51 },
      { year: 2005, value: 1.52 },
      { year: 2010, value: 1.39 },
      { year: 2015, value: 1.45 },
      { year: 2020, value: 1.3 },
      { year: 2021, value: 1.26 },
      { year: 2022, value: 1.24 },
      { year: 2023, value: 1.2 },
    ],
  },
  {
    id: 'lifeexp',
    name: 'Life expectancy at birth',
    short: 'Life expectancy',
    domain: 'Health',
    unit: 'years',
    format: 'years',
    decimals: 1,
    scale: 'raw',
    question: 'How long do people live here?',
    description: 'Average number of years a newborn would live if the mortality rates of the given year held for the whole of their life.',
    source: 'worldbank',
    points: [
      { year: 1990, value: 78.7 },
      { year: 1995, value: 79.6 },
      { year: 2000, value: 81.1 },
      { year: 2005, value: 82.4 },
      { year: 2010, value: 82.9 },
      { year: 2015, value: 83.4 },
      { year: 2019, value: 84.3 },
      { year: 2020, value: 84.6 },
      { year: 2021, value: 84.5 },
      { year: 2022, value: 84.0 },
      { year: 2023, value: 84.0 },
      { year: 2024, value: 84.1, source: 'oecd', note: 'OECD estimate published in 2024' },
    ],
  },
  {
    id: 'beds',
    name: 'Hospital beds',
    short: 'Hospital beds',
    domain: 'Health',
    unit: 'beds per 1,000 people',
    format: 'ratio',
    decimals: 1,
    scale: 'raw',
    question: 'How much hospital capacity is there?',
    description: 'Number of hospital beds per 1,000 inhabitants, a proxy for the physical capacity of the health system.',
    source: 'oecd',
    points: [
      { year: 2010, value: 13.4 },
      { year: 2015, value: 12.9 },
      { year: 2018, value: 12.7 },
      { year: 2021, value: 12.6 },
      { year: 2022, value: 12.4 },
    ],
  },
  {
    id: 'healthspend',
    name: 'Health spending',
    short: 'Health spending',
    domain: 'Health',
    unit: '% of GDP',
    format: 'percent',
    decimals: 1,
    scale: 'raw',
    question: 'How much of national wealth goes on health?',
    description: 'Current health expenditure as a share of GDP, the measure that compares health systems across countries.',
    source: 'oecd',
    points: [
      { year: 2015, value: 10.4 },
      { year: 2017, value: 10.5 },
      { year: 2019, value: 10.7 },
      { year: 2021, value: 11.0 },
      { year: 2022, value: 11.5 },
    ],
  },
  {
    id: 'schooling',
    name: 'Mean years of schooling',
    short: 'Schooling years',
    domain: 'Education',
    unit: 'years (ages 25+)',
    format: 'ratio',
    decimals: 1,
    scale: 'raw',
    question: 'How much schooling has the average adult had?',
    description: 'Average number of years of schooling completed by people aged 25 and over, a core component of the human development index.',
    source: 'undp',
    points: [
      { year: 1990, value: 9.0 },
      { year: 2000, value: 9.6 },
      { year: 2010, value: 11.0 },
      { year: 2015, value: 11.6 },
      { year: 2019, value: 12.0 },
      { year: 2022, value: 12.0 },
    ],
  },
  {
    id: 'eduspend',
    name: 'Public spending on education',
    short: 'Education spending',
    domain: 'Education',
    unit: '% of GDP',
    format: 'percent',
    decimals: 1,
    scale: 'raw',
    question: 'How much does the state spend on schools?',
    description: 'Public expenditure on education as a share of GDP, from the OECD education statistics.',
    source: 'oecd',
    points: [
      { year: 2010, value: 3.7 },
      { year: 2013, value: 3.6 },
      { year: 2016, value: 3.3 },
      { year: 2019, value: 3.3 },
      { year: 2021, value: 3.3 },
      { year: 2022, value: 3.2 },
    ],
  },
  {
    id: 'gdp',
    name: 'Gross domestic product',
    short: 'GDP',
    domain: 'Economy',
    unit: 'current US$ billion',
    format: 'usd_bn',
    decimals: 0,
    scale: 'raw',
    question: 'How large is Japan\'s economy?',
    description: 'GDP at current prices in US dollars. The 2022 fall is the yen depreciating against the dollar, not a collapse in output.',
    source: 'worldbank',
    points: [
      { year: 2010, value: 5759.1 },
      { year: 2011, value: 6205.7 },
      { year: 2012, value: 6256.3 },
      { year: 2013, value: 5213.6 },
      { year: 2014, value: 4891.4 },
      { year: 2015, value: 4445.2 },
      { year: 2016, value: 4932.0 },
      { year: 2017, value: 4830.9 },
      { year: 2018, value: 5036.5 },
      { year: 2019, value: 5121.4 },
      { year: 2020, value: 5040.1 },
      { year: 2021, value: 5034.4 },
      { year: 2022, value: 4255.6 },
      { year: 2023, value: 4213.0 },
      { year: 2024, value: 4029.0, source: 'imf', note: 'IMF estimate for 2024' },
    ],
  },
  {
    id: 'gdppc',
    name: 'GDP per capita',
    short: 'GDP per capita',
    domain: 'Economy',
    unit: 'current US$',
    format: 'usd',
    decimals: 0,
    scale: 'raw',
    question: 'How much output per person?',
    description: 'GDP at current prices divided by population, in US dollars.',
    source: 'worldbank',
    points: [
      { year: 2010, value: 45920 },
      { year: 2011, value: 49466 },
      { year: 2012, value: 50080 },
      { year: 2013, value: 42075 },
      { year: 2014, value: 39596 },
      { year: 2015, value: 35027 },
      { year: 2016, value: 39209 },
      { year: 2017, value: 38660 },
      { year: 2018, value: 39750 },
      { year: 2019, value: 40485 },
      { year: 2020, value: 39953 },
      { year: 2021, value: 40041 },
      { year: 2022, value: 34017 },
      { year: 2023, value: 33834 },
    ],
  },
  {
    id: 'inflation',
    name: 'Consumer price inflation',
    short: 'Inflation',
    domain: 'Prices',
    unit: '% change on the year',
    format: 'percent',
    decimals: 1,
    scale: 'raw',
    question: 'Are prices rising, and how fast?',
    description: 'Annual change in the consumer price index. The 2021 dip reflects the temporary cut in the consumption tax applied to food.',
    source: 'worldbank',
    points: [
      { year: 2010, value: -0.7 },
      { year: 2011, value: -0.3 },
      { year: 2012, value: 0.0 },
      { year: 2013, value: 0.4 },
      { year: 2014, value: 2.8 },
      { year: 2015, value: 0.8 },
      { year: 2016, value: 0.1 },
      { year: 2017, value: 0.5 },
      { year: 2018, value: 1.0 },
      { year: 2019, value: 0.3 },
      { year: 2020, value: 0.0 },
      { year: 2021, value: -0.2 },
      { year: 2022, value: 2.5 },
      { year: 2023, value: 3.5 },
      { year: 2024, value: 2.7, source: 'oecd', note: 'OECD measure published in 2024' },
    ],
  },
  {
    id: 'unemployment',
    name: 'Unemployment rate',
    short: 'Unemployment',
    domain: 'Work',
    unit: '% of the labour force',
    format: 'percent',
    decimals: 1,
    scale: 'raw',
    question: 'How hard is it to find work?',
    description: 'Share of the labour force that is unemployed but actively seeking work, on the ILO modelled definition.',
    source: 'worldbank',
    points: [
      { year: 2010, value: 5.1 },
      { year: 2011, value: 4.6 },
      { year: 2012, value: 4.3 },
      { year: 2013, value: 3.9 },
      { year: 2014, value: 3.6 },
      { year: 2015, value: 3.4 },
      { year: 2016, value: 3.4 },
      { year: 2017, value: 2.9 },
      { year: 2018, value: 2.4 },
      { year: 2019, value: 2.4 },
      { year: 2020, value: 2.8 },
      { year: 2021, value: 2.5 },
      { year: 2022, value: 2.6 },
      { year: 2023, value: 2.6 },
      { year: 2024, value: 2.5, source: 'oecd', note: 'OECD measure published in 2024' },
    ],
  },
  {
    id: 'debt',
    name: 'General government gross debt',
    short: 'Public debt',
    domain: 'Economy',
    unit: '% of GDP',
    format: 'percent',
    decimals: 1,
    scale: 'raw',
    question: 'How much does the government owe?',
    description: 'Gross general government debt as a share of GDP, one of the highest in the industrial world.',
    source: 'imf',
    points: [
      { year: 2010, value: 218.4 },
      { year: 2015, value: 236.7 },
      { year: 2019, value: 236.4 },
      { year: 2020, value: 258.7 },
      { year: 2021, value: 256.9 },
      { year: 2022, value: 251.0 },
      { year: 2023, value: 249.7 },
      { year: 2024, value: 248.3 },
    ],
  },
  {
    id: 'currentaccount',
    name: 'Current account balance',
    short: 'Current account',
    domain: 'Economy',
    unit: '% of GDP',
    format: 'percent',
    decimals: 1,
    scale: 'raw',
    question: 'Is Japan a net lender to the world?',
    description: 'Current account balance as a share of GDP: the money Japan earns abroad and brings home.',
    source: 'worldbank',
    points: [
      { year: 2010, value: 3.8 },
      { year: 2011, value: 3.6 },
      { year: 2012, value: 2.7 },
      { year: 2013, value: 2.8 },
      { year: 2014, value: 3.4 },
      { year: 2015, value: 5.3 },
      { year: 2016, value: 4.8 },
      { year: 2017, value: 4.4 },
      { year: 2018, value: 4.1 },
      { year: 2019, value: 3.8 },
      { year: 2020, value: 3.6 },
      { year: 2021, value: 3.4 },
      { year: 2022, value: 2.7 },
      { year: 2023, value: 2.9 },
    ],
  },
];

/** Domains in the order the site presents them. */
export const DOMAINS = ['People', 'Economy', 'Work', 'Prices', 'Health', 'Education'];

/** Find an indicator by id. */
export function indicatorById(id) {
  return INDICATORS.find((item) => item.id === id) || null;
}

/** The value of an indicator in a given year, or null. */
export function valueAt(indicator, year) {
  const point = indicator.points.find((item) => item.year === year);
  return point ? point.value : null;
}

/** The most recent point of a series. */
export function latestPoint(indicator) {
  return indicator.points[indicator.points.length - 1];
}

/** The earliest point of a series. */
export function earliestPoint(indicator) {
  return indicator.points[0];
}

/** Every year any indicator has a value for, newest first. */
export function allYears() {
  const set = new Set();
  for (const indicator of INDICATORS) {
    for (const point of indicator.points) set.add(point.year);
  }
  return [...set].sort((a, b) => b - a);
}

/** Indicators grouped by domain, in DOMAINS order. */
export function byDomain() {
  return DOMAINS.map((domain) => ({
    domain,
    indicators: INDICATORS.filter((item) => item.domain === domain),
  })).filter((group) => group.indicators.length > 0);
}

/** Change between the last two points of a series, in absolute units. */
export function lastChange(indicator) {
  const points = indicator.points;
  if (points.length < 2) return null;
  const previous = points[points.length - 2];
  const latest = points[points.length - 1];
  return { previous, latest, delta: latest.value - previous.value };
}

// data/glossary.js — the terms a visitor runs into, defined in plain language.
// One job: definitions of statistical concepts, with the reason each one matters.

export const GLOSSARY = [
  {
    term: 'Current US dollars',
    short: 'Currency',
    definition: 'A value converted into US dollars at the exchange rate of the year it refers to. It moves for two reasons: the real amount of goods and services changed, and the currency moved against the dollar. A fall in current-dollar GDP is not automatically a fall in output.',
    related: ['gdp', 'gdppc'],
  },
  {
    term: 'Gross domestic product (GDP)',
    short: 'Output',
    definition: 'The total value of goods and services produced inside a country in a period, before deducting depreciation. GDP per capita divides that total by the population.',
    related: ['gdp', 'gdppc'],
  },
  {
    term: 'Consumer price index (CPI)',
    short: 'Prices',
    definition: 'A basket of goods and services whose price is tracked over time. Inflation is the rate at which that basket gets more expensive, usually stated as a change on the year.',
    related: ['inflation'],
  },
  {
    term: 'Unemployment rate',
    short: 'Jobs',
    definition: 'The share of the labour force without a job who are actively looking for one. People who have stopped looking are counted as outside the labour force, which is why the rate can fall while the number of unemployed people rises.',
    related: ['unemployment'],
  },
  {
    term: 'Fertility rate',
    short: 'Demography',
    definition: 'The average number of children a woman would have in her lifetime if the age-specific birth rates of that year held. It is not the same as the number of children per family.',
    related: ['fertility'],
  },
  {
    term: 'Life expectancy at birth',
    short: 'Health',
    definition: 'The average number of years a newborn would live if the mortality rates of that year applied throughout their life. It is a period measure: it does not predict how long today\'s newborns will actually live.',
    related: ['lifeexp'],
  },
  {
    term: 'Current health expenditure',
    short: 'Health',
    definition: 'Health spending as a share of GDP, covering both public and private spending. It measures the resources committed to health, not their efficiency.',
    related: ['healthspend', 'beds'],
  },
  {
    term: 'General government gross debt',
    short: 'Public finance',
    definition: 'All the debt the central, regional and local government owes, as a share of GDP. It is gross: it does not subtract financial assets the government holds.',
    related: ['debt', 'currentaccount'],
  },
  {
    term: 'Current account balance',
    short: 'External',
    definition: 'The net flow of trade, services and income between a country and the rest of the world. A surplus means a country is a net lender to the world.',
    related: ['currentaccount', 'gdp'],
  },
  {
    term: 'Mean years of schooling',
    short: 'Education',
    definition: 'The average number of years of formal schooling completed by people aged 25 and over. It is a stock measure: it changes slowly, as each new cohort passes through the school system.',
    related: ['schooling', 'eduspend'],
  },
  {
    term: 'Primary energy supply',
    short: 'Energy',
    definition: 'The energy content of all the fuel and electricity entering a country, counted as if each source were converted to its equivalent in oil. Nuclear and hydro are counted on the "input" convention, not on the electricity they generate.',
    related: ['energy'],
  },
  {
    term: 'Resident population',
    short: 'Demography',
    definition: 'People who live in an area at a point in time, counted at their usual residence. It differs from the daytime population in cities where many people commute in from elsewhere.',
    related: ['population', 'aged65'],
  },
];

/** Find a glossary entry by its term. */
export function glossaryEntry(term) {
  const wanted = String(term || '').toLowerCase();
  return GLOSSARY.find((item) => item.term.toLowerCase() === wanted) || null;
}

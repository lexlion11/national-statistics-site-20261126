// data/energy.js — how Japan gets its energy, and how that mix has changed.
// One job: the energy series and the sector breakdown behind them.

export const ENERGY_MIX = [
  { year: 2010, coal: 32.4, oil: 38.5, gas: 14.3, nuclear: 13.1, hydro: 3.6, renewables: 1.0 },
  { year: 2012, coal: 34.2, oil: 36.1, gas: 15.2, nuclear: 4.3, hydro: 3.8, renewables: 1.2 },
  { year: 2014, coal: 36.0, oil: 34.9, gas: 16.1, nuclear: 0.2, hydro: 3.9, renewables: 1.6 },
  { year: 2016, coal: 35.4, oil: 33.4, gas: 17.4, nuclear: 1.0, hydro: 3.8, renewables: 2.4 },
  { year: 2018, coal: 35.0, oil: 32.4, gas: 18.3, nuclear: 3.4, hydro: 3.7, renewables: 4.6 },
  { year: 2020, coal: 30.5, oil: 29.4, gas: 19.0, nuclear: 3.7, hydro: 3.4, renewables: 7.1 },
  { year: 2022, coal: 31.1, oil: 28.4, gas: 19.1, nuclear: 6.8, hydro: 3.4, renewables: 10.4 },
  { year: 2024, coal: 29.6, oil: 26.8, gas: 18.6, nuclear: 9.1, hydro: 3.2, renewables: 12.5 },
];

export const ENERGY_SOURCES = [
  { id: 'coal', name: 'Coal', color: '#3f4a5a' },
  { id: 'oil', name: 'Oil', color: '#7a6a58' },
  { id: 'gas', name: 'Natural gas', color: '#c8873a' },
  { id: 'nuclear', name: 'Nuclear', color: '#c8452f' },
  { id: 'hydro', name: 'Hydro', color: '#2f7fa8' },
  { id: 'renewables', name: 'Renewables (excl. hydro)', color: '#0f7d76' },
];

export const ENERGY_CONTEXT = {
  title: 'Where Japan\'s energy comes from',
  lead: 'After the shutdown of the Fukushima Daiichi reactors in 2011, Japan burned more coal and imported more oil. Nuclear generation is only now recovering, while solar has grown quickly.',
  facts: [
    { label: 'Fossil share of primary energy, 2024', value: '75.0%', note: 'Coal, oil and natural gas together' },
    { label: 'Nuclear output, 2024', value: '9.1%', note: 'Up from 0.2% in 2014' },
    { label: 'Renewables ex-hydro, 2024', value: '12.5%', note: 'Solar, wind, biomass and geothermal' },
    { label: 'Net energy imports', value: '92%', note: 'Of primary energy supply' },
  ],
  source: 'iea',
};

export const ENERGY_DEMAND = {
  title: 'Primary energy demand',
  unit: 'Mtoe (million tonnes of oil equivalent)',
  source: 'iea',
  points: [
    { year: 2010, value: 326.4 },
    { year: 2012, value: 323.6 },
    { year: 2014, value: 315.2 },
    { year: 2016, value: 322.9 },
    { year: 2018, value: 327.6 },
    { year: 2020, value: 302.9 },
    { year: 2022, value: 311.5 },
    { year: 2024, value: 305.1 },
  ],
};

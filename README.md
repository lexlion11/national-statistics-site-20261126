# best-national-statistics-site-20261126-0539 — Tōkei Atlas

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/lexlion11/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/lexlion11/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Tōkei Atlas is an offline, dependency-free explorer for Japan's national statistics: fourteen indicator series over three decades, all 47 prefectures, the primary energy mix, an international comparison and a sortable table of every figure — each number carrying the publisher that published it and the year it belongs to.

The site is plain static files under `app/`. There is no build step, no framework, no chart library and no network request: it opens from `app/index.html` in desktop Chrome and on a phone, offline.

## Run it

```sh
node serve.ts          # serves app/ on http://localhost:8080 (--port 8090 for another port)
```

Open `http://localhost:8080` in a browser. Every page is reachable from the navigation; the site uses hash routes, so a page can be linked to directly (`#/indicator/population`, `#/region/27`, `#/compare?measure=lifeExpectancy`).

## The pages

| Page | Route | What it holds |
|---|---|---|
| Overview | `#/` | Six headline figures, the population trend, a "six numbers worth knowing" panel, the largest prefectures and the energy mix |
| All indicators | `#/indicators` | The 14 series, filterable by domain and searchable, each with a sparkline of its trend |
| Indicator | `#/indicator/:id` | One series in full: the chart, a year and scale control, the reading for the selected year, the full value table and the sources used |
| Prefectures | `#/regions` | All 47, sortable by any column, filterable by region, with the highest GDP per person |
| Prefecture | `#/region/:code` | One prefecture against the country, its region neighbours and its ranks |
| Compare | `#/compare` | Japan beside South Korea, Germany, Italy and the United States, measure by measure |
| Energy | `#/energy` | The primary energy supply mix, energy demand and the nuclear restart story |
| Data table | `#/table` | Every observation of every series in one sortable table, copyable as CSV |
| Glossary | `#/glossary` | Twelve statistical terms explained in plain language, each linked to the series that uses it |
| Sources & method | `#/sources` | Every publisher, what it covers here, and how the figures were prepared |

## The data

Seven publishers, each with its own scope and its own reference year:

- **World Bank, World Development Indicators (2023)** — population, GDP, GDP per capita, inflation, unemployment, fertility, life expectancy, current account
- **UN DESA, World Population Prospects 2024 revision** — the latest population estimates and projections
- **OECD (2024)** — unemployment, inflation, health spending, education spending, hospital beds
- **IMF, World Economic Outlook (2024)** — general government debt and the latest GDP estimate
- **IEA, Japan energy profile (2024)** — primary energy supply, the generation mix and import dependence
- **UNDP, Human Development Report 2023/24** — mean years of schooling
- **Statistics Bureau of Japan (2020)** — prefectural population, area and the regional accounts

Figures are stored at the publisher's own precision and rounded for display only. Where one publisher took over a series from another, the year it took over carries the new publisher in the table.

## How the source is split

Every file has one job:

```
app/
  index.html            the shell: header, navigation, footer
  main.js               the entry point: routing and control wiring
  router.js             hash routes, parameter parsing, link building
  dom.js                small DOM helpers
  format.js             number, unit and scale formatting
  charts.js             hand-written SVG chart helpers (line, bar, stacked area, ranked bars, sparkline)
  data/
    indicators.js       the 14 national series and their metadata
    regions.js          the 47 prefectures
    energy.js           the energy mix and energy demand
    peers.js            Japan and four comparator economies
    glossary.js         the statistical terms
    sources.js          the publisher registry
  views/                one module per page: overview, indicators, indicator, regions,
                        region, compare, energy, table, glossary, sources, notfound
  styles/
    base.css            design tokens, reset, header, footer
    views.css           the components each page is built from
```

No file under `app/` is fetched over the network: the charts are SVG built in the browser, the fonts are the ones already on the machine, and there is no `fetch`, no XHR and no WebSocket anywhere in the site.

## The hand-in

`main.ts` copies `app/` and `screenshots/` into the output directory and writes `dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`, exactly as the kit's own program does. It runs twice and both runs write the same bytes.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`vendor/makefun-frontend.ts` is the kit's copy, unchanged.

## Licence

MIT — see [LICENSE](LICENSE).

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>

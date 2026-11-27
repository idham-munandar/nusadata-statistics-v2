# NusaStat — Indonesia in Numbers

[![Competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/idham-munandar/nusadata-statistics-v2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/idham-munandar/nusadata-statistics-v2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An entry for make.fun's [best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539) bounty.

**NusaStat** is a national statistics portal for Indonesia: 284 million people, a US$1.40 trillion
economy and 38 provinces, presented as a data-journalism dashboard. Headline indicators (population,
GDP, inflation, poverty, unemployment, HDI, Gini) open the front page, followed by hand-rolled SVG
charts — GDP growth 2015–2024, census population 1971–2020, inflation, poverty and HDI trends, a GDP
sector donut and a 2020 age pyramid — a choropleth tile map with one tile per province, and a
searchable, sortable explorer covering all 38 provinces. Every figure carries its source and year
(BPS — Badan Pusat Statistik, the World Bank, BPJS Kesehatan).

## Layout

- `main.ts` — the hand-in program: verifies the entry against the gate's caps, copies `app/` and
  `screenshots/` to the output directory and writes the dossier with the vendored library.
- `app/` — the site itself: static files, no build step, no network requests. `index.html` is the
  shell; `main.js` the hash router; `views.js` the five page renderers; `charts.js` the SVG chart
  builders; `map.js` the province tile map; `data/indicators.js` and `data/provinces.js` the figures.
- `screenshots/` — real renders of the site: overview, provinces explorer, economy, and a phone view.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.

## Run it locally

```
node serve.ts            # serves app/ at http://localhost:8090
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # build the hand-in
```

Licensed under the MIT License (see `LICENSE`).

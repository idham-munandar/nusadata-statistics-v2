// Page renderers for NusaStat. Each view returns the HTML for one hash route; main.js swaps it
// into the shell and wires the controls. Every chart arrives as inline SVG from charts.js and
// every map from map.js, so a page is complete the moment it renders — no loading states.

import {
  headlineIndicators, gdpGrowthSeries, censusSeries, inflationSeries, povertySeries,
  hdiSeries, gdpSectors, ageGroups, wellbeingFacts, tradeFacts,
} from './data/indicators.js';
import { provinces, provinceSourceNote, provincesByPopulation } from './data/provinces.js';
import { lineChart, barChart, donutChart, donutLegend, pyramidChart, horizontalBars } from './charts.js';
import { tileMap } from './map.js';

function kpiCards() {
  return headlineIndicators.map((k) => `
    <article class="kpi">
      <p class="kpi-label">${k.label}</p>
      <p class="kpi-value">${k.value}<span class="kpi-unit"> ${k.unit}</span></p>
      <p class="kpi-change ${k.direction === 'down' ? 'good-down' : ''}">${k.change}</p>
      <p class="kpi-source">${k.source}</p>
    </article>`).join('');
}

function chartCard(series, chart, extraClass = '') {
  return `
    <article class="card chart-card ${extraClass}">
      <h3>${series.title}</h3>
      ${chart}
      <p class="chart-note">${series.note || ''}</p>
      <p class="source-line">Source: ${series.source}</p>
    </article>`;
}

function factGrid(facts) {
  return facts.map((f) => `
    <article class="fact">
      <p class="fact-value">${f.value}</p>
      <p class="fact-label">${f.label}</p>
      <p class="fact-source">${f.source}</p>
    </article>`).join('');
}

export function homeView() {
  const top10 = provincesByPopulation().slice(0, 10)
    .map((p) => ({ label: p.name, value: p.pop, display: `${(p.pop / 1000).toFixed(1)}m` }));
  return `
  <section class="hero">
    <p class="hero-kicker">NusaStat · Indonesia's national statistics portal</p>
    <h1>284 million people.<br/>One economy, <em>measured.</em></h1>
    <p class="hero-lede">The essential numbers of the world's fourth most populous country — population,
    growth, prices, jobs and wellbeing — drawn from the official releases of BPS, Indonesia's
    national statistics office, each figure labelled with its source and year.</p>
    <div class="hero-actions">
      <a class="button" href="#/provinces">Explore the 38 provinces</a>
      <a class="button ghost" href="#/economy">The economy in charts</a>
    </div>
  </section>
  <section class="kpi-grid" aria-label="Headline indicators">${kpiCards()}</section>
  <section class="two-col">
    ${chartCard(gdpGrowthSeries, lineChart(gdpGrowthSeries))}
    ${chartCard(censusSeries, barChart(censusSeries, { color: '#b3202c' }))}
  </section>
  <section class="card map-card">
    <div class="card-head">
      <h3>Where Indonesians live — population by province, 2024</h3>
      <p>One tile per province, sized by position in the archipelago and shaded by population.
      Java's three big provinces alone hold 129.7 million people — 46% of the country on 7% of its land.</p>
    </div>
    ${tileMap('population')}
    <p class="source-line">Source: ${provinceSourceNote}</p>
  </section>
  <section class="two-col">
    <article class="card chart-card">
      <h3>The ten most populous provinces</h3>
      ${horizontalBars(top10)}
      <p class="source-line">Source: BPS mid-2024 provincial projections.</p>
    </article>
    <article class="card story-card">
      <h3>Three stories the numbers tell</h3>
      <ol class="stories">
        <li><strong>Poverty at a record low.</strong> 8.47% in March 2025 — the first reading under
        8.5% since BPS began the series, after a pandemic detour that peaked at 10.19% in 2020.</li>
        <li><strong>A five-per-cent economy.</strong> Growth has held between 5.0% and 5.3% for three
        straight years, powered by manufacturing, trade and a mining downstreaming boom.</li>
        <li><strong>A young, urbanising nation.</strong> Median age is about 30; 59% of Indonesians
        now live in urban areas, and Jakarta's HDI (84.2) rivals high-income countries.</li>
      </ol>
      <p class="source-line">All figures: BPS releases, 2024–2025. See the Economy and Wellbeing pages for the full series.</p>
    </article>
  </section>`;
}

export function economyView() {
  return `
  <section class="page-head">
    <p class="hero-kicker">Economy</p>
    <h2>An economy of US$1.40 trillion, growing at five per cent</h2>
    <p class="page-lede">Indonesia is Southeast Asia's largest economy and a G20 member. Growth is
    consumption-led — household spending is about 54% of GDP — with commodity exports and a growing
    manufacturing base. Every chart below is drawn from BPS national accounts and price statistics.</p>
  </section>
  <section class="two-col">
    ${chartCard(gdpGrowthSeries, lineChart(gdpGrowthSeries))}
    ${chartCard(inflationSeries, barChart(inflationSeries))}
  </section>
  <section class="two-col">
    <article class="card chart-card">
      <h3>${gdpSectors.title}</h3>
      <div class="donut-wrap">
        ${donutChart(gdpSectors)}
        <ul class="donut-legend">${donutLegend(gdpSectors)}</ul>
      </div>
      <p class="source-line">Source: ${gdpSectors.source}</p>
    </article>
    <article class="card">
      <h3>Trade &amp; work — the facts that matter</h3>
      <div class="fact-list">${factGrid(tradeFacts)}</div>
    </article>
  </section>
  <section class="card prose">
    <h3>Reading the economy like a statistician</h3>
    <p><strong>Growth.</strong> Real GDP grew 5.03% in 2024, the third consecutive year in a narrow
    5.0–5.3% band. The only contraction in the modern series is 2020 (−2.07%), the pandemic year.</p>
    <p><strong>Prices.</strong> Inflation ended 2024 at 1.57% year-on-year, inside Bank Indonesia's
    1.5–3.5% target band and the lowest December reading since 2000 — a sharp contrast with the
    5.51% spike of 2022, when subsidised fuel prices were adjusted.</p>
    <p><strong>Work.</strong> The labour force reached 153.05 million in February 2025 with open
    unemployment at 4.76% — but 59.4% of workers are in informal jobs, the structural challenge
    behind the headline rate. <span class="source-inline">Sources: BPS National Accounts, CPI and Sakernas releases, 2024–2025.</span></p>
  </section>`;
}

export function peopleView() {
  return `
  <section class="page-head">
    <p class="hero-kicker">People</p>
    <h2>284 million people, half of them under thirty</h2>
    <p class="page-lede">Indonesia is the world's fourth most populous country, spread across more
    than 17,000 islands and 1,300 ethnic groups. Bahasa Indonesia unites them; the census counts them.</p>
  </section>
  <section class="two-col">
    ${chartCard(censusSeries, barChart(censusSeries, { color: '#b3202c' }))}
    <article class="card chart-card">
      <h3>${ageGroups.title}</h3>
      ${pyramidChart(ageGroups)}
      <p class="chart-note">${ageGroups.note}</p>
      <p class="source-line">Source: ${ageGroups.source} · values in ${ageGroups.unit}</p>
    </article>
  </section>
  <section class="card prose">
    <h3>What the census shows</h3>
    <p><strong>Still growing, more slowly.</strong> Population growth eased to about 0.8% a year in
    the early 2020s, from 1.5% in the 1990s, as fertility settled near replacement level at roughly
    2.1 children per woman. <span class="source-inline">BPS census and intercensal estimates.</span></p>
    <p><strong>Java is the centre of gravity.</strong> 55.9% of Indonesians — about 152 million
    people — live on Java, an island with 7% of the land area. West Java alone (49.9 million) would
    rank among the world's 30 most populous countries.</p>
    <p><strong>Urban majority.</strong> About 59% of the population lives in urban areas (BPS, 2024),
    up from 50% at the 2010 census — Jakarta's metropolitan area alone holds some 31 million people.</p>
  </section>`;
}

export function provincesView() {
  return `
  <section class="page-head">
    <p class="hero-kicker">Provinces</p>
    <h2>38 provinces, one republic</h2>
    <p class="page-lede">Search, sort and compare every province by population and human development.
    The east–west gap is the country's defining statistic: Jakarta's HDI of 84.2 stands against
    53.4 in Highland Papua.</p>
  </section>
  <section class="card map-card">
    <div class="controls" role="group" aria-label="Map shading">
      <span class="controls-label">Shade tiles by:</span>
      <button type="button" class="chip is-active" data-metric="population">Population</button>
      <button type="button" class="chip" data-metric="hdi">Human Development Index</button>
    </div>
    <div id="province-map">${tileMap('population')}</div>
    <p class="source-line">Source: ${provinceSourceNote}</p>
  </section>
  <section class="card">
    <div class="controls wrap">
      <label class="search-box">Search provinces
        <input type="search" id="province-search" placeholder="Try “Java”, “Papua” or “Makassar”…" autocomplete="off"/>
      </label>
      <label>Region
        <select id="province-region">
          <option value="">All regions</option>
          <option>Sumatra</option><option>Java</option><option>Kalimantan</option>
          <option>Sulawesi</option><option>Bali &amp; Nusa Tenggara</option><option>Maluku &amp; Papua</option>
        </select>
      </label>
      <label>Sort by
        <select id="province-sort">
          <option value="pop-desc">Population, largest first</option>
          <option value="pop-asc">Population, smallest first</option>
          <option value="hdi-desc">HDI, highest first</option>
          <option value="hdi-asc">HDI, lowest first</option>
          <option value="name">Name, A–Z</option>
        </select>
      </label>
    </div>
    <p class="result-count" id="province-count"></p>
    <div class="table-scroll">
      <table class="province-table">
        <thead><tr><th>#</th><th>Province</th><th>Capital</th><th>Region</th><th class="num">Population 2024</th><th class="num">Share</th><th class="num">HDI 2024</th></tr></thead>
        <tbody id="province-rows"></tbody>
      </table>
    </div>
    <p class="source-line">Source: ${provinceSourceNote}</p>
  </section>`;
}

export function renderProvinceRows() {
  const query = (document.getElementById('province-search')?.value || '').trim().toLowerCase();
  const region = document.getElementById('province-region')?.value || '';
  const sort = document.getElementById('province-sort')?.value || 'pop-desc';
  const total = provinces.reduce((s, p) => s + p.pop, 0);
  let rows = provinces.filter((p) =>
    (!region || p.region === region) &&
    (!query || p.name.toLowerCase().includes(query) || p.capital.toLowerCase().includes(query) || p.region.toLowerCase().includes(query)));
  const sorters = {
    'pop-desc': (a, b) => b.pop - a.pop, 'pop-asc': (a, b) => a.pop - b.pop,
    'hdi-desc': (a, b) => b.hdi - a.hdi, 'hdi-asc': (a, b) => a.hdi - b.hdi,
    'name': (a, b) => a.name.localeCompare(b.name),
  };
  rows = rows.sort(sorters[sort]);
  const tbody = document.getElementById('province-rows');
  if (tbody) {
    tbody.innerHTML = rows.map((p, i) => `
      <tr>
        <td>${i + 1}</td><td><strong>${p.name}</strong></td><td>${p.capital}</td><td>${p.region}</td>
        <td class="num">${(p.pop / 1000).toFixed(2)}m</td>
        <td class="num">${((p.pop / total) * 100).toFixed(1)}%</td>
        <td class="num"><span class="hdi-pill">${p.hdi.toFixed(1)}</span></td>
      </tr>`).join('') || '<tr><td colspan="7">No province matches that search — try a shorter word.</td></tr>';
  }
  const count = document.getElementById('province-count');
  if (count) count.textContent = `Showing ${rows.length} of ${provinces.length} provinces`;
}

export function wireProvincesPage() {
  renderProvinceRows();
  ['province-search', 'province-region', 'province-sort'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', renderProvinceRows);
    if (el) el.addEventListener('change', renderProvinceRows);
  });
  document.querySelectorAll('[data-metric]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-metric]').forEach((b) => b.classList.remove('is-active'));
      button.classList.add('is-active');
      const map = document.getElementById('province-map');
      if (map) map.innerHTML = tileMap(button.dataset.metric);
    });
  });
}

export function wellbeingView() {
  return `
  <section class="page-head">
    <p class="hero-kicker">Health &amp; education</p>
    <h2>Longer lives, more schooling, less poverty</h2>
    <p class="page-lede">Development is what the averages hide. These are the indicators Indonesians
    feel directly — how long they live, how long they study, and whether children grow up stunted.</p>
  </section>
  <section class="two-col">
    ${chartCard(hdiSeries, lineChart(hdiSeries, { color: '#2e7d5b' }))}
    ${chartCard(povertySeries, lineChart(povertySeries, { color: '#14707e' }))}
  </section>
  <section class="card">
    <h3>Wellbeing in eight numbers</h3>
    <div class="fact-grid">${factGrid(wellbeingFacts)}</div>
  </section>
  <section class="card prose">
    <h3>The honest gaps</h3>
    <p><strong>Stunting.</strong> 19.8% of children under five were stunted in 2024 — better than
    21.5% in 2023 and 30.8% in 2018, but still one child in five, with the highest rates in East
    Nusa Tenggara and Papua. <span class="source-inline">SSGI 2024; Riskesdas 2018.</span></p>
    <p><strong>Schooling quantity vs quality.</strong> A child starting school today can expect
    13.2 years of education, yet adults average only 8.85 years completed, and Indonesian 15-year-olds
    scored 359 in PISA 2022 mathematics against an OECD average of 472 — the gap the current
    curriculum reforms aim at. <span class="source-inline">BPS 2024; OECD PISA 2022.</span></p>
    <p><strong>Coverage nearly universal.</strong> The JKN national health insurance scheme covered
    98.7% of the population by 2024, the largest single-payer system in the world.
    <span class="source-inline">BPJS Kesehatan, 2024.</span></p>
  </section>`;
}

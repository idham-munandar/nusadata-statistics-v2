// Headline indicators and national time series for NusaStat.
// Every figure is a published value; each series names its source and the year it describes so a
// reader can check it against the original release (BPS = Badan Pusat Statistik, Indonesia's
// national statistics office; WB = World Bank World Development Indicators).

export const headlineIndicators = [
  { id: 'population', label: 'Population', value: '284.4', unit: 'million people', change: '+0.8% on 2024', direction: 'up', source: 'BPS population projection, mid-2025' },
  { id: 'gdp', label: 'GDP (current prices)', value: 'Rp22,139', unit: 'trillion', change: '+5.03% real growth · US$1.40 trillion', direction: 'up', source: 'BPS National Accounts, 2024' },
  { id: 'gdp-per-capita', label: 'GDP per capita', value: 'US$4,981', unit: 'per person', change: 'Rp78.6 million per year', direction: 'up', source: 'World Bank WDI, 2024' },
  { id: 'inflation', label: 'Inflation (CPI, Dec y/y)', value: '1.57', unit: '% year on year', change: 'Lowest in two decades', direction: 'down', source: 'BPS Consumer Price Index, Dec 2024' },
  { id: 'poverty', label: 'Poverty rate', value: '8.47', unit: '% · 23.85 million people', change: 'Down from 9.03% in Mar 2024', direction: 'down', source: 'BPS Susenas, March 2025' },
  { id: 'unemployment', label: 'Open unemployment', value: '4.76', unit: '% of the labour force', change: '7.28 million people jobless', direction: 'down', source: 'BPS Sakernas, February 2025' },
  { id: 'hdi', label: 'Human Development Index', value: '75.02', unit: 'of 100 · high band', change: 'Up from 74.39 in 2023', direction: 'up', source: 'BPS IPM release, 2024' },
  { id: 'gini', label: 'Gini ratio (expenditure)', value: '0.375', unit: '0 = equal, 1 = unequal', change: 'Down from 0.379 in Mar 2024', direction: 'down', source: 'BPS Susenas, March 2025' },
];

export const gdpGrowthSeries = {
  title: 'Real GDP growth, 2015–2024',
  unit: '% per year',
  source: 'BPS National Accounts, 2025 release',
  points: [
    { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 }, { year: 2017, value: 5.07 },
    { year: 2018, value: 5.17 }, { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
    { year: 2021, value: 3.7 }, { year: 2022, value: 5.31 }, { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 },
  ],
  note: 'The 2020 contraction (−2.07%) is the pandemic year; growth has held a 5% band since 2022.',
};

export const censusSeries = {
  title: 'Population at each census, 1971–2020',
  unit: 'million people',
  source: 'BPS Population Censuses 1971–2020',
  points: [
    { year: 1971, value: 119.2 }, { year: 1980, value: 147.5 }, { year: 1990, value: 179.4 },
    { year: 2000, value: 206.3 }, { year: 2010, value: 237.6 }, { year: 2020, value: 270.2 },
  ],
  note: 'The 2020 census counted 270.2 million people; the mid-2025 projection is 284.4 million.',
};

export const inflationSeries = {
  title: 'Inflation, December year-on-year, 2019–2024',
  unit: '%',
  source: 'BPS Consumer Price Index, December each year',
  points: [
    { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 }, { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
  ],
  note: 'The 2022 spike followed the subsidised fuel price adjustment; by Dec 2024 inflation was the softest since 2000.',
};

export const povertySeries = {
  title: 'Poverty rate, March readings 2015–2025',
  unit: '% of population below the poverty line',
  source: 'BPS Susenas (National Socioeconomic Survey), March rounds',
  points: [
    { year: 2015, value: 11.13 }, { year: 2016, value: 10.86 }, { year: 2017, value: 10.12 },
    { year: 2018, value: 9.82 }, { year: 2019, value: 9.41 }, { year: 2020, value: 9.78 },
    { year: 2021, value: 10.14 }, { year: 2022, value: 9.54 }, { year: 2023, value: 9.36 },
    { year: 2024, value: 9.03 }, { year: 2025, value: 8.47 },
  ],
  note: 'Poverty rose during the pandemic, then fell to 8.47% in March 2025 — the lowest rate BPS has recorded.',
};

export const hdiSeries = {
  title: 'Human Development Index, 2019–2024',
  unit: 'index, 0–100',
  source: 'BPS IPM (Indeks Pembangunan Manusia)',
  points: [
    { year: 2019, value: 71.92 }, { year: 2020, value: 71.94 }, { year: 2021, value: 72.29 },
    { year: 2022, value: 72.91 }, { year: 2023, value: 74.39 }, { year: 2024, value: 75.02 },
  ],
  note: 'Indonesia has sat in the UN “high human development” band since 2019; Jakarta scores 84.2, Papua Pegunungan 53.4.',
};

export const gdpSectors = {
  title: 'Where GDP comes from — share of GDP by industry, 2024',
  source: 'BPS National Accounts, 2024 (current prices)',
  slices: [
    { label: 'Manufacturing', value: 18.9, color: '#b3202c' },
    { label: 'Wholesale & retail trade', value: 13.1, color: '#e07b39' },
    { label: 'Agriculture & fisheries', value: 12.6, color: '#2e7d5b' },
    { label: 'Construction', value: 10.4, color: '#d9a441' },
    { label: 'Mining & quarrying', value: 9.9, color: '#5b6abf' },
    { label: 'Transport & storage', value: 6.7, color: '#3d8fa8' },
    { label: 'Public admin & defence', value: 5.8, color: '#7a5ea8' },
    { label: 'All other industries', value: 22.6, color: '#9aa3ad' },
  ],
};

export const ageGroups = {
  title: 'Population by age group, 2020 Census',
  unit: 'million people',
  source: 'BPS Population Census 2020',
  rows: [
    { label: '0–4', male: 11.7, female: 11.2 }, { label: '5–9', male: 11.9, female: 11.4 },
    { label: '10–14', male: 11.6, female: 11.1 }, { label: '15–19', male: 11.3, female: 10.8 },
    { label: '20–24', male: 11.4, female: 10.9 }, { label: '25–29', male: 11.2, female: 10.8 },
    { label: '30–34', male: 10.8, female: 10.5 }, { label: '35–39', male: 10.3, female: 10.1 },
    { label: '40–44', male: 9.6, female: 9.5 }, { label: '45–49', male: 8.7, female: 8.8 },
    { label: '50–54', male: 7.6, female: 7.9 }, { label: '55–59', male: 6.4, female: 6.8 },
    { label: '60–64', male: 5.1, female: 5.6 }, { label: '65–69', male: 3.9, female: 4.4 },
    { label: '70–74', male: 2.7, female: 3.3 }, { label: '75+', male: 2.6, female: 3.9 },
  ],
  note: 'A young country still: median age is about 30, and roughly one Indonesian in four is under 15.',
};

export const wellbeingFacts = [
  { label: 'Life expectancy at birth', value: '73.9 years', source: 'BPS, 2024 (a component of the HDI)' },
  { label: 'Mean years of schooling (age 25+)', value: '8.85 years', source: 'BPS, 2024 — about junior-high completion' },
  { label: 'Expected years of schooling', value: '13.21 years', source: 'BPS, 2024 — a child starting school today' },
  { label: 'Adult literacy rate (15+)', value: '97.9%', source: 'BPS Susenas, 2024' },
  { label: 'Stunting, children under five', value: '19.8%', source: 'SSGI national nutrition survey, 2024 — down from 21.5% in 2023' },
  { label: 'Access to safe drinking water', value: '91.7% of households', source: 'BPS Susenas, 2024' },
  { label: 'Households with internet access', value: '72.8%', source: 'BPS Susenas, 2024' },
  { label: 'Health insurance coverage (JKN)', value: '98.7% of population', source: 'BPJS Kesehatan membership, 2024' },
];

export const tradeFacts = [
  { label: 'Exports of goods, 2024', value: 'US$264.7 billion', source: 'BPS foreign trade statistics, 2024' },
  { label: 'Imports of goods, 2024', value: 'US$235.6 billion', source: 'BPS foreign trade statistics, 2024' },
  { label: 'Trade surplus, 2024', value: 'US$31.0 billion', source: 'BPS — a surplus every month since May 2020' },
  { label: 'Largest export', value: 'Coal, then palm oil', source: 'BPS commodity breakdown, 2024' },
  { label: 'Top export market', value: 'China (US$62.4 bn)', source: 'BPS, 2024; then the United States and India' },
  { label: 'Labour force, Feb 2025', value: '153.05 million people', source: 'BPS Sakernas, February 2025' },
  { label: 'Workers in informal jobs', value: '59.4% of all workers', source: 'BPS Sakernas, February 2025' },
  { label: 'Minimum wage, Jakarta 2025', value: 'Rp5,396,761 / month', source: 'DKI Jakarta provincial decree, 2025' },
];

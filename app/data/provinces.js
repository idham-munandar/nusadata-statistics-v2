// The 38 provinces of Indonesia. Population is the BPS mid-2024 projection (thousands of people);
// HDI is the BPS IPM score for 2024. gx/gy place each province on the schematic tile map in map.js:
// one square per province, laid out roughly where the province sits in the archipelago.

export const provinces = [
  { name: 'Aceh', capital: 'Banda Aceh', region: 'Sumatra', pop: 5555, hdi: 74.0, gx: 0, gy: 1 },
  { name: 'North Sumatra', capital: 'Medan', region: 'Sumatra', pop: 15595, hdi: 75.4, gx: 1, gy: 2 },
  { name: 'West Sumatra', capital: 'Padang', region: 'Sumatra', pop: 5836, hdi: 76.4, gx: 1, gy: 3 },
  { name: 'Riau', capital: 'Pekanbaru', region: 'Sumatra', pop: 6728, hdi: 75.9, gx: 2, gy: 2 },
  { name: 'Riau Islands', capital: 'Tanjung Pinang', region: 'Sumatra', pop: 2183, hdi: 79.9, gx: 3, gy: 1 },
  { name: 'Jambi', capital: 'Jambi', region: 'Sumatra', pop: 3725, hdi: 74.5, gx: 2, gy: 3 },
  { name: 'South Sumatra', capital: 'Palembang', region: 'Sumatra', pop: 8837, hdi: 74.2, gx: 2, gy: 4 },
  { name: 'Bengkulu', capital: 'Bengkulu', region: 'Sumatra', pop: 2112, hdi: 74.3, gx: 1, gy: 4 },
  { name: 'Bangka Belitung', capital: 'Pangkal Pinang', region: 'Sumatra', pop: 1531, hdi: 74.7, gx: 3, gy: 3 },
  { name: 'Lampung', capital: 'Bandar Lampung', region: 'Sumatra', pop: 9314, hdi: 73.1, gx: 2, gy: 5 },
  { name: 'Banten', capital: 'Serang', region: 'Java', pop: 12432, hdi: 76.9, gx: 3, gy: 5 },
  { name: 'Jakarta', capital: 'Jakarta', region: 'Java', pop: 10563, hdi: 84.2, gx: 4, gy: 5 },
  { name: 'West Java', capital: 'Bandung', region: 'Java', pop: 49935, hdi: 74.9, gx: 5, gy: 5 },
  { name: 'Central Java', capital: 'Semarang', region: 'Java', pop: 37892, hdi: 74.4, gx: 6, gy: 5 },
  { name: 'Yogyakarta', capital: 'Yogyakarta', region: 'Java', pop: 3759, hdi: 81.1, gx: 6, gy: 6 },
  { name: 'East Java', capital: 'Surabaya', region: 'Java', pop: 41815, hdi: 75.4, gx: 7, gy: 5 },
  { name: 'Bali', capital: 'Denpasar', region: 'Bali & Nusa Tenggara', pop: 4433, hdi: 78.3, gx: 8, gy: 5 },
  { name: 'West Nusa Tenggara', capital: 'Mataram', region: 'Bali & Nusa Tenggara', pop: 5646, hdi: 72.4, gx: 9, gy: 5 },
  { name: 'East Nusa Tenggara', capital: 'Kupang', region: 'Bali & Nusa Tenggara', pop: 5656, hdi: 66.0, gx: 10, gy: 6 },
  { name: 'West Kalimantan', capital: 'Pontianak', region: 'Kalimantan', pop: 5695, hdi: 71.2, gx: 5, gy: 1 },
  { name: 'Central Kalimantan', capital: 'Palangka Raya', region: 'Kalimantan', pop: 2810, hdi: 74.6, gx: 6, gy: 2 },
  { name: 'South Kalimantan', capital: 'Banjarmasin', region: 'Kalimantan', pop: 4273, hdi: 74.2, gx: 6, gy: 3 },
  { name: 'East Kalimantan', capital: 'Samarinda', region: 'Kalimantan', pop: 3965, hdi: 78.8, gx: 7, gy: 1 },
  { name: 'North Kalimantan', capital: 'Tanjung Selor', region: 'Kalimantan', pop: 739, hdi: 73.4, gx: 7, gy: 0 },
  { name: 'North Sulawesi', capital: 'Manado', region: 'Sulawesi', pop: 2701, hdi: 75.0, gx: 9, gy: 1 },
  { name: 'Gorontalo', capital: 'Gorontalo', region: 'Sulawesi', pop: 1227, hdi: 71.9, gx: 8, gy: 1 },
  { name: 'Central Sulawesi', capital: 'Palu', region: 'Sulawesi', pop: 3121, hdi: 72.2, gx: 8, gy: 2 },
  { name: 'West Sulawesi', capital: 'Mamuju', region: 'Sulawesi', pop: 1503, hdi: 69.8, gx: 8, gy: 3 },
  { name: 'South Sulawesi', capital: 'Makassar', region: 'Sulawesi', pop: 9463, hdi: 74.6, gx: 8, gy: 4 },
  { name: 'Southeast Sulawesi', capital: 'Kendari', region: 'Sulawesi', pop: 2794, hdi: 73.6, gx: 9, gy: 4 },
  { name: 'North Maluku', capital: 'Sofifi', region: 'Maluku & Papua', pop: 1373, hdi: 71.0, gx: 10, gy: 1 },
  { name: 'Maluku', capital: 'Ambon', region: 'Maluku & Papua', pop: 1945, hdi: 72.8, gx: 11, gy: 2 },
  { name: 'Southwest Papua', capital: 'Sorong', region: 'Maluku & Papua', pop: 627, hdi: 66.1, gx: 12, gy: 1 },
  { name: 'West Papua', capital: 'Manokwari', region: 'Maluku & Papua', pop: 578, hdi: 67.7, gx: 12, gy: 2 },
  { name: 'Central Papua', capital: 'Nabire', region: 'Maluku & Papua', pop: 1343, hdi: 58.2, gx: 13, gy: 2 },
  { name: 'Papua', capital: 'Jayapura', region: 'Maluku & Papua', pop: 1060, hdi: 68.5, gx: 14, gy: 1 },
  { name: 'Highland Papua', capital: 'Wamena', region: 'Maluku & Papua', pop: 1449, hdi: 53.4, gx: 13, gy: 3 },
  { name: 'South Papua', capital: 'Merauke', region: 'Maluku & Papua', pop: 542, hdi: 64.9, gx: 14, gy: 3 },
];

export const provinceSourceNote = 'Population: BPS mid-2024 provincial projections (thousands). HDI: BPS IPM 2024. ' +
  'The four newest provinces (Southwest, Central, Highland and South Papua) were formed in 2022, taking Indonesia to 38 provinces.';

export function totalPopulationThousands() {
  return provinces.reduce((sum, p) => sum + p.pop, 0);
}

export function provincesByPopulation() {
  return [...provinces].sort((a, b) => b.pop - a.pop);
}

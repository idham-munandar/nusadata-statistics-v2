// A schematic tile map of Indonesia: one square per province, placed roughly where the province
// sits in the archipelago and shaded as a choropleth. It reads instantly in a screenshot, where a
// true geographic outline would shrink to noise, and every tile is labelled with its province.

import { provinces } from './data/provinces.js';

const shortNames = {
  'Aceh': 'Aceh', 'North Sumatra': 'N. Sumatra', 'West Sumatra': 'W. Sumatra', 'Riau': 'Riau',
  'Riau Islands': 'Riau Isl.', 'Jambi': 'Jambi', 'South Sumatra': 'S. Sumatra', 'Bengkulu': 'Bengkulu',
  'Bangka Belitung': 'Babel', 'Lampung': 'Lampung', 'Banten': 'Banten', 'Jakarta': 'Jakarta',
  'West Java': 'W. Java', 'Central Java': 'C. Java', 'Yogyakarta': 'Yogya', 'East Java': 'E. Java',
  'Bali': 'Bali', 'West Nusa Tenggara': 'W. Nusa T.', 'East Nusa Tenggara': 'E. Nusa T.',
  'West Kalimantan': 'W. Kalim.', 'Central Kalimantan': 'C. Kalim.', 'South Kalimantan': 'S. Kalim.',
  'East Kalimantan': 'E. Kalim.', 'North Kalimantan': 'N. Kalim.', 'North Sulawesi': 'N. Sulawesi',
  'Gorontalo': 'Gorontalo', 'Central Sulawesi': 'C. Sulawesi', 'West Sulawesi': 'W. Sulawesi',
  'South Sulawesi': 'S. Sulawesi', 'Southeast Sulawesi': 'SE Sulawesi', 'North Maluku': 'N. Maluku',
  'Maluku': 'Maluku', 'Southwest Papua': 'SW Papua', 'West Papua': 'W. Papua',
  'Central Papua': 'C. Papua', 'Papua': 'Papua', 'Highland Papua': 'High. Papua', 'South Papua': 'S. Papua',
};

function hdiColor(hdi) {
  if (hdi >= 80) return '#0d5c46';
  if (hdi >= 76) return '#2e7d5b';
  if (hdi >= 74) return '#63a67f';
  if (hdi >= 72) return '#9cc5a5';
  if (hdi >= 70) return '#d9a441';
  if (hdi >= 66) return '#e07b39';
  return '#b3202c';
}

function populationShade(pop) {
  if (pop >= 20000) return '#7d1620';
  if (pop >= 10000) return '#b3202c';
  if (pop >= 5000) return '#d2543f';
  if (pop >= 2500) return '#e07b39';
  if (pop >= 1000) return '#e8b04b';
  return '#f0d48a';
}

export function tileMap(metric) {
  const tile = 55;
  const gap = 5;
  const cols = 15;
  const rows = 7;
  const width = cols * (tile + gap) + gap;
  const height = rows * (tile + gap) + gap + 26;
  let out = `<svg viewBox="0 0 ${width} ${height}" class="chart tilemap" role="img" aria-label="Tile map of Indonesia's 38 provinces">`;
  provinces.forEach((p) => {
    const x = gap + p.gx * (tile + gap);
    const y = gap + p.gy * (tile + gap);
    const fill = metric === 'hdi' ? hdiColor(p.hdi) : populationShade(p.pop);
    const metricText = metric === 'hdi' ? p.hdi.toFixed(1) : `${(p.pop / 1000).toFixed(1)}m`;
    out += `<g><title>${p.name} — population ${(p.pop / 1000).toFixed(2)}m, HDI ${p.hdi.toFixed(1)}</title>`;
    out += `<rect x="${x}" y="${y}" width="${tile}" height="${tile}" rx="7" fill="${fill}"/>`;
    out += `<text x="${x + tile / 2}" y="${y + 21}" text-anchor="middle" font-size="9" font-weight="700" fill="#ffffff">${shortNames[p.name]}</text>`;
    out += `<text x="${x + tile / 2}" y="${y + 38}" text-anchor="middle" font-size="11.5" font-weight="800" fill="#ffffff">${metricText}</text></g>`;
  });
  const legendY = height - 18;
  if (metric === 'hdi') {
    out += `<text x="${gap}" y="${legendY}" font-size="11.5" fill="#5a6572">HDI 2024:</text>`;
    const stops = [['#0d5c46', '80+'], ['#63a67f', '74–76'], ['#d9a441', '70–72'], ['#b3202c', 'below 66']];
    stops.forEach(([color, label], i) => {
      const x = gap + 74 + i * 118;
      out += `<rect x="${x}" y="${legendY - 11}" width="14" height="14" rx="3" fill="${color}"/><text x="${x + 19}" y="${legendY}" font-size="11.5" fill="#5a6572">${label}</text>`;
    });
  } else {
    out += `<text x="${gap}" y="${legendY}" font-size="11.5" fill="#5a6572">People per province:</text>`;
    const stops = [['#7d1620', '20m+'], ['#d2543f', '5–10m'], ['#e8b04b', '1–2.5m'], ['#f0d48a', 'under 1m']];
    stops.forEach(([color, label], i) => {
      const x = gap + 128 + i * 118;
      out += `<rect x="${x}" y="${legendY - 11}" width="14" height="14" rx="3" fill="${color}"/><text x="${x + 19}" y="${legendY}" font-size="11.5" fill="#5a6572">${label}</text>`;
    });
  }
  out += '</svg>';
  return out;
}

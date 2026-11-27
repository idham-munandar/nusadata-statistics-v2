// Hand-rolled SVG charts for NusaStat. No library: each builder takes plain data and returns an
// SVG string with labelled axes, gridlines and value labels, so a chart reads fully at a glance
// even in a small screenshot.

const INK = '#1d2733';
const FAINT = '#8a94a0';
const GRID = '#e3ddd2';
const ACCENT = '#b3202c';
const TEAL = '#14707e';

function escapeText(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function chartFrame(width, height, padding) {
  return { w: width, h: height, left: padding, right: width - 14, top: 12, bottom: height - 30 };
}

function yGridlines(frame, min, max, steps, format) {
  let out = '';
  for (let i = 0; i <= steps; i++) {
    const value = min + ((max - min) * i) / steps;
    const y = frame.bottom - ((value - min) / (max - min)) * (frame.bottom - frame.top);
    out += `<line x1="${frame.left}" y1="${y}" x2="${frame.right}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`;
    out += `<text x="${frame.left - 7}" y="${y + 4}" text-anchor="end" font-size="11" fill="${FAINT}">${escapeText(format(value))}</text>`;
  }
  return out;
}

export function lineChart(series, options = {}) {
  const width = options.width || 640;
  const height = options.height || 300;
  const color = options.color || ACCENT;
  const frame = chartFrame(width, height, 46);
  const values = series.points.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (options.zeroBaseline) min = Math.min(0, min);
  const pad = (max - min) * 0.15 || 1;
  min -= pad; max += pad;
  const x = (i) => frame.left + (i / (series.points.length - 1)) * (frame.right - frame.left);
  const y = (v) => frame.bottom - ((v - min) / (max - min)) * (frame.bottom - frame.top);
  let out = `<svg viewBox="0 0 ${width} ${height}" class="chart" role="img" aria-label="${escapeText(series.title)}">`;
  out += yGridlines(frame, min, max, 4, (v) => v.toFixed(1));
  if (min < 0 && max > 0) {
    out += `<line x1="${frame.left}" y1="${y(0)}" x2="${frame.right}" y2="${y(0)}" stroke="${INK}" stroke-width="1.2"/>`;
  }
  const path = series.points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  out += `<path d="${path}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  series.points.forEach((p, i) => {
    out += `<circle cx="${x(i)}" cy="${y(p.value)}" r="4" fill="#fff" stroke="${color}" stroke-width="2.4"/>`;
    const labelY = p.value < 0 ? y(p.value) + 18 : y(p.value) - 10;
    out += `<text x="${x(i)}" y="${labelY}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${INK}">${p.value}</text>`;
    out += `<text x="${x(i)}" y="${frame.bottom + 20}" text-anchor="middle" font-size="11" fill="${FAINT}">${p.year}</text>`;
  });
  out += '</svg>';
  return out;
}

export function barChart(series, options = {}) {
  const width = options.width || 640;
  const height = options.height || 300;
  const color = options.color || TEAL;
  const frame = chartFrame(width, height, 46);
  const values = series.points.map((p) => p.value);
  const max = Math.max(...values) * 1.12;
  const min = 0;
  const slot = (frame.right - frame.left) / series.points.length;
  const barW = Math.min(56, slot * 0.62);
  let out = `<svg viewBox="0 0 ${width} ${height}" class="chart" role="img" aria-label="${escapeText(series.title)}">`;
  out += yGridlines(frame, min, max, 4, (v) => Math.round(v));
  series.points.forEach((p, i) => {
    const cx = frame.left + slot * i + slot / 2;
    const bh = ((p.value - min) / (max - min)) * (frame.bottom - frame.top);
    out += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${(frame.bottom - bh).toFixed(1)}" width="${barW}" height="${bh.toFixed(1)}" rx="3" fill="${p.value < 0 ? ACCENT : color}"/>`;
    out += `<text x="${cx}" y="${frame.bottom - bh - 7}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${INK}">${p.value}</text>`;
    out += `<text x="${cx}" y="${frame.bottom + 20}" text-anchor="middle" font-size="11" fill="${FAINT}">${p.year}</text>`;
  });
  out += '</svg>';
  return out;
}

export function donutChart(donut, options = {}) {
  const size = options.size || 300;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2 - 6;
  const rInner = rOuter * 0.62;
  const total = donut.slices.reduce((s, x) => s + x.value, 0);
  let angle = -Math.PI / 2;
  let out = `<svg viewBox="0 0 ${size} ${size}" class="chart donut" role="img" aria-label="${escapeText(donut.title)}">`;
  donut.slices.forEach((slice) => {
    const sweep = (slice.value / total) * Math.PI * 2;
    const a0 = angle;
    const a1 = angle + sweep;
    angle = a1;
    const large = sweep > Math.PI ? 1 : 0;
    const x0 = cx + rOuter * Math.cos(a0), y0 = cy + rOuter * Math.sin(a0);
    const x1 = cx + rOuter * Math.cos(a1), y1 = cy + rOuter * Math.sin(a1);
    const x2 = cx + rInner * Math.cos(a1), y2 = cy + rInner * Math.sin(a1);
    const x3 = cx + rInner * Math.cos(a0), y3 = cy + rInner * Math.sin(a0);
    out += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${rOuter},${rOuter} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} A${rInner},${rInner} 0 ${large} 0 ${x3.toFixed(1)},${y3.toFixed(1)} Z" fill="${slice.color}" stroke="#faf7f1" stroke-width="2"/>`;
  });
  out += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="21" font-weight="800" fill="${INK}">GDP 2024</text>`;
  out += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11.5" fill="${FAINT}">share by industry, %</text>`;
  out += '</svg>';
  return out;
}

export function donutLegend(donut) {
  return donut.slices
    .map((s) => `<li><span class="swatch" style="background:${s.color}"></span>${escapeText(s.label)} <strong>${s.value}%</strong></li>`)
    .join('');
}

export function pyramidChart(pyramid, options = {}) {
  const width = options.width || 640;
  const rowH = 21;
  const height = pyramid.rows.length * rowH + 34;
  const centre = width / 2;
  const bandHalf = 24;
  const maxHalf = width / 2 - bandHalf - 46;
  const maxVal = Math.max(...pyramid.rows.flatMap((r) => [r.male, r.female]));
  let out = `<svg viewBox="0 0 ${width} ${height}" class="chart" role="img" aria-label="${escapeText(pyramid.title)}">`;
  out += `<text x="${centre - bandHalf - 6}" y="14" text-anchor="end" font-size="11.5" font-weight="700" fill="${TEAL}">Male</text>`;
  out += `<text x="${centre + bandHalf + 6}" y="14" font-size="11.5" font-weight="700" fill="${ACCENT}">Female</text>`;
  out += `<text x="${centre}" y="14" text-anchor="middle" font-size="11.5" font-weight="700" fill="${FAINT}">Age</text>`;
  pyramid.rows.forEach((row, i) => {
    const y = 24 + i * rowH;
    const mw = (row.male / maxVal) * maxHalf;
    const fw = (row.female / maxVal) * maxHalf;
    out += `<rect x="${(centre - bandHalf - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="${rowH - 5}" rx="2" fill="${TEAL}"/>`;
    out += `<rect x="${centre + bandHalf}" y="${y}" width="${fw.toFixed(1)}" height="${rowH - 5}" rx="2" fill="${ACCENT}"/>`;
    out += `<text x="${centre - bandHalf - mw - 6}" y="${y + rowH - 9}" text-anchor="end" font-size="10.5" fill="${FAINT}">${row.male}</text>`;
    out += `<text x="${centre + bandHalf + fw + 6}" y="${y + rowH - 9}" font-size="10.5" fill="${FAINT}">${row.female}</text>`;
    out += `<text x="${centre}" y="${y + rowH - 9}" text-anchor="middle" font-size="10.5" font-weight="600" fill="${INK}">${escapeText(row.label)}</text>`;
  });
  out += '</svg>';
  return out;
}

export function horizontalBars(rows, options = {}) {
  const width = options.width || 640;
  const rowH = options.rowH || 30;
  const height = rows.length * rowH + 8;
  const labelW = 150;
  const valueW = 86;
  const max = Math.max(...rows.map((r) => r.value));
  let out = `<svg viewBox="0 0 ${width} ${height}" class="chart" role="img">`;
  rows.forEach((row, i) => {
    const y = i * rowH + 4;
    const bw = ((width - labelW - valueW) * row.value) / max;
    out += `<text x="${labelW - 10}" y="${y + rowH / 2 + 1}" text-anchor="end" font-size="12.5" fill="${INK}">${escapeText(row.label)}</text>`;
    out += `<rect x="${labelW}" y="${y + 3}" width="${bw.toFixed(1)}" height="${rowH - 9}" rx="3" fill="${options.color || ACCENT}"/>`;
    out += `<text x="${labelW + bw + 8}" y="${y + rowH / 2 + 1}" font-size="12.5" font-weight="700" fill="${INK}">${escapeText(row.display)}</text>`;
  });
  out += '</svg>';
  return out;
}

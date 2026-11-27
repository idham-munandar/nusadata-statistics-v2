// A tiny static server for previewing the site locally: node serve.ts [--port 8090]
// Serves app/ at the root, exactly as the grader's static hosting would.

import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const portArg = process.argv.indexOf('--port');
const port = portArg >= 0 ? Number(process.argv[portArg + 1]) : 8090;

const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
};

createServer((req, res) => {
  const path = (req.url || '/').split('?')[0].split('#')[0];
  const rel = path === '/' ? 'index.html' : path.replace(/^\/+/, '');
  const file = join(here, 'app', rel);
  if (!existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(port, () => console.log(`NusaStat preview at http://localhost:${port}`));

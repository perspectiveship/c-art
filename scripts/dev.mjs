#!/usr/bin/env node
/* =====================================================
   Local preview: builds the site, serves _site/ on
   http://localhost:4173 and rebuilds whenever content,
   photos, pages or the panel config change.

   The panel is at http://localhost:4173/head-of-art/ — in Chrome
   or Edge choose "Work with Local Repository" and pick this
   folder. Saving there rewrites content/…, which triggers a
   rebuild here; refresh the site to see the change.

   Usage: node scripts/dev.mjs [port]
   ===================================================== */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, '_site');
const PORT = Number(process.argv[2]) || 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.yml': 'text/yaml; charset=utf-8', '.yaml': 'text/yaml; charset=utf-8',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8',
};

/* ---------- build, one at a time ---------- */
let building = false;
let again = false;
function build() {
  if (building) { again = true; return; }
  building = true;
  const child = spawn(process.execPath, [path.join(ROOT, 'scripts/build.mjs')], { cwd: ROOT, stdio: 'inherit' });
  child.on('exit', code => {
    building = false;
    if (code !== 0) console.log('  (the last good build is still being served)');
    if (again) { again = false; build(); }
  });
}

/* ---------- watch sources ---------- */
let timer = null;
const later = () => { clearTimeout(timer); timer = setTimeout(build, 300); };
for (const target of ['content', 'images', 'head-of-art']) {
  const dir = path.join(ROOT, target);
  if (fs.existsSync(dir)) fs.watch(dir, { recursive: true }, (_, name) => { if (name && !name.startsWith('sm') && !name.endsWith('.DS_Store')) later(); });
}
fs.watch(ROOT, (_, name) => { if (name && /\.(html|css)$|^site\.js$/.test(name)) later(); });

/* ---------- serve _site ---------- */
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let file = path.join(SITE, decodeURIComponent(url.pathname));
  if (!file.startsWith(SITE)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!url.pathname.endsWith('/')) { res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end(); return; }
    file = path.join(file, 'index.html');
  }
  fs.readFile(file, (error, body) => {
    if (error) { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(body);
  });
}).listen(PORT, () => {
  console.log(`Site:  http://localhost:${PORT}/`);
  console.log(`Panel: http://localhost:${PORT}/head-of-art/  (Chrome or Edge → "Work with Local Repository")`);
});

build();

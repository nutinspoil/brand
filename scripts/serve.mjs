import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT) || 4173;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

async function resolveFile(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
  let target = join(root, clean);
  if (!target.startsWith(root)) return { status: 403 };
  try {
    const info = await stat(target);
    if (info.isDirectory()) target = join(target, 'index.html');
    await stat(target);
    return { status: 200, target };
  } catch {
    return { status: 404 };
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://localhost:${port}`);
  let pathname = url.pathname;

  if (pathname !== '/' && !extname(pathname) && !pathname.endsWith('/')) {
    response.writeHead(301, { Location: `${pathname}/${url.search}` });
    response.end();
    return;
  }

  const result = await resolveFile(pathname === '/' ? '/index.html' : pathname);
  if (result.status !== 200) {
    const notFound = join(root, '404.html');
    try {
      const page = await readFile(notFound);
      response.writeHead(404, { 'Content-Type': types['.html'] });
      response.end(page);
    } catch {
      response.writeHead(404, { 'Content-Type': types['.txt'] });
      response.end('Not found');
    }
    return;
  }

  try {
    const data = await readFile(result.target);
    response.writeHead(200, {
      'Content-Type': types[extname(result.target).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    response.end(data);
  } catch {
    response.writeHead(500, { 'Content-Type': types['.txt'] });
    response.end('Server error');
  }
});

server.listen(port, () => {
  console.log(`Serving ${root}`);
  console.log(`http://localhost:${port}/`);
});

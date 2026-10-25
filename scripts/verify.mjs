#!/usr/bin/env node
// Verifica o site estático da DK Eco Soluções:
//  1) valida o HTML (html-validate) e
//  2) confere a integridade dos links locais (linkinator) servindo assets/ localmente.
//
// Pula URLs absolutas (http/https, mailto, tel) para manter o gate estável e offline-friendly.
// Links externos (wa.me, redes sociais, Google Fonts) são verificados manualmente — ver docs/quality.md.

import { spawn } from "node:child_process";
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../assets/", import.meta.url));
const PORT = Number(process.env.VERIFY_PORT) || 61319;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || "/").split("?")[0]);
  if (p === "/") p = "/index.html";
  const fp = join(ROOT, p);
  readFile(fp)
    .then((data) => {
      res.writeHead(200, { "Content-Type": MIME[extname(fp)] || "application/octet-stream" });
      res.end(data);
    })
    .catch(() => {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
    });
});

function run(cmd, args, label) {
  return new Promise((resolve) => {
    console.log(`\n▶ ${label}`);
    const p = spawn(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
    p.on("error", (err) => {
      console.error(`erro ao executar ${cmd}: ${err.message}`);
      resolve(false);
    });
    p.on("exit", (code) => {
      const ok = code === 0;
      console.log(ok ? `✓ ${label} OK` : `✗ ${label} FALHOU (exit ${code})`);
      resolve(ok);
    });
  });
}

server.on("error", (err) => {
  console.error(`não foi possível iniciar o servidor na porta ${PORT}: ${err.message}`);
  process.exit(1);
});

server.listen(PORT, async () => {
  console.log(`Servindo assets/ em http://localhost:${PORT}`);
  const results = [];

  results.push(await run("html-validate", ["assets/index.html"], "html-validate (HTML)"));
  results.push(
    await run(
      "linkinator",
      [
        `http://localhost:${PORT}`,
        "--recurse",
        "--skip", "^https?://(?!localhost)",
        "--skip", "^mailto:",
        "--skip", "^tel:",
      ],
      "linkinator (links locais)"
    )
  );

  server.close();
  const ok = results.every(Boolean);
  console.log(`\n${ok ? "✅ npm run verify: PASS" : "❌ npm run verify: FALHA"}`);
  process.exit(ok ? 0 : 1);
});

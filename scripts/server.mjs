import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { weatherHandler } from "../server/weather.mjs";

const root = resolve("dist");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};
async function handler(request, response) {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname === "/api/weather") return weatherHandler(request, response);
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405);
    response.end();
    return;
  }
  try {
    let path = resolve(root, "." + decodeURIComponent(url.pathname));
    if (!path.startsWith(root + sep) && path !== root) {
      response.writeHead(403);
      response.end();
      return;
    }
    if (url.pathname === "/") path = resolve(root, "index.html");
    const info = await stat(path);
    if (!info.isFile()) throw new Error("Not a file");
    const content = await readFile(path);
    response.writeHead(200, {
      "Content-Type": types[extname(path)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
    });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}
const port = Number(process.env.PORT || 4173);
const hosts = (process.env.INVITATION_HOSTS || "127.0.0.1").split(",");
for (const host of hosts)
  createServer(handler).listen(port, host, () =>
    console.log(`Invitation available at http://${host}:${port}`),
  );

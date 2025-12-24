#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * One-command E2E verification:
 * - Frees ports 3100/9333 if occupied
 * - Starts Next dev server on 127.0.0.1:3100
 * - Runs Playwright with PLAYWRIGHT_WEB_SERVER=0 and BASE_URL
 * - Stops the dev server on exit
 */
const { spawn, execSync } = require("node:child_process");
const { setTimeout: wait } = require("node:timers/promises");
const fs = require("node:fs");

const PORTS = [3100, 9333];
const HOST = "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORTS[0]}`;
const PLAYWRIGHT_CMD = ["npx", "playwright", "test"];

function killPort(port) {
  try {
    const pids = execSync(`lsof -ti tcp:${port}`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    if (pids) {
      pids
        .split("\n")
        .filter(Boolean)
        .forEach((pid) => {
          try {
            process.kill(Number(pid), "SIGTERM");
          } catch {
            /* ignore */
          }
        });
    }
  } catch {
    // lsof may not find anything; ignore
  }
}

function readEnvLocal() {
  const envPath = ".env.local";
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf8");
  return content.split("\n").reduce((acc, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return acc;
    const [key, ...rest] = trimmed.split("=");
    if (!key) return acc;
    acc[key] = rest.join("=").replace(/^"|"$/g, "");
    return acc;
  }, {});
}

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) return true;
    } catch {
      // keep polling
    }
    await wait(500);
  }
  throw new Error(`Server not ready at ${url} after ${timeoutMs}ms`);
}

async function main() {
  PORTS.forEach(killPort);

  const envLocal = readEnvLocal();
  const env = {
    ...process.env,
    PORT: String(PORTS[0]),
    PLAYWRIGHT_WEB_SERVER: "0",
    BASE_URL: BASE_URL,
    DATABASE_URL: process.env.DATABASE_URL || envLocal.DATABASE_URL || "",
  };

  const server = spawn("npm", ["run", "dev", "--", "--hostname", HOST, "--port", String(PORTS[0])], {
    env,
    stdio: "inherit",
  });

  let serverRunning = true;
  const cleanup = () => {
    if (serverRunning) {
      try {
        server.kill("SIGTERM");
      } catch {
        /* ignore */
      }
      serverRunning = false;
    }
  };
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
  process.on("exit", cleanup);

  try {
    await waitForServer(`${BASE_URL}/api/today-games?date=2024-06-15`);
    const play = spawn(PLAYWRIGHT_CMD[0], PLAYWRIGHT_CMD.slice(1), {
      env,
      stdio: "inherit",
    });
    await new Promise((resolve, reject) => {
      play.on("exit", (code, signal) => {
        if (code === 0 || code === null) {
          resolve();
        } else {
          reject(new Error(`Playwright exited ${code ?? "null"}${signal ? ` (signal ${signal})` : ""}`));
        }
      });
    });
  } finally {
    cleanup();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3100";

test.describe("Today Games", () => {
  test("shows today games list with Yankees vs Red Sox", async ({ page }) => {
    // Preflight: ensure API returns games so failures point to data, not selectors.
    const apiResponse = await page.request.get(
      `${BASE_URL}/api/today-games?date=2024-06-15`,
    );
    const apiJson = await apiResponse.json();
    const apiGames = apiJson.games ?? [];

    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const loc = msg.location();
        const withLoc = loc.url
          ? `${msg.text()} @ ${loc.url}:${loc.lineNumber ?? 0}:${loc.columnNumber ?? 0}`
          : msg.text();
        consoleErrors.push(withLoc);
      }
    });
    page.on("pageerror", (err) => pageErrors.push(err.message));

    await page.goto(`${BASE_URL}/today`, { waitUntil: "networkidle" });

    await expect(page.getByTestId("today-games")).toBeVisible();
    const list = page.getByTestId("today-games-list");
    if (apiGames.length === 0) {
      await expect(page.getByTestId("today-empty-state")).toBeVisible();
      expect(consoleErrors, "Console errors should be empty").toEqual([]);
      expect(pageErrors, "Page errors should be empty").toEqual([]);
      return;
    }

    await expect(list).toBeVisible();

    const cards = list.getByTestId("today-game-card");
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);

    const yankeesCard = cards.filter({ hasText: "New York Yankees" }).first();
    await expect(yankeesCard).toBeVisible();
    await expect(yankeesCard).toContainText("Boston Red Sox");
    await expect(yankeesCard).toContainText("Yankee Stadium");
    await expect(yankeesCard).toContainText(/HotBat/i);

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
    expect(pageErrors, "Page errors should be empty").toEqual([]);
  });

  test("shows empty state off-season and loads last available slate", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const loc = msg.location();
        const withLoc = loc.url
          ? `${msg.text()} @ ${loc.url}:${loc.lineNumber ?? 0}:${loc.columnNumber ?? 0}`
          : msg.text();
        consoleErrors.push(withLoc);
      }
    });

    const latestRes = await page.request.get(`${BASE_URL}/api/slates/latest`);
    const latestJson = await latestRes.json();
    const latestDate = latestJson.latestDate as string | null;

    await page.goto(`${BASE_URL}/today?date=1999-01-01`, { waitUntil: "networkidle" });

    await expect(page.getByTestId("today-games")).toBeVisible();
    await expect(page.getByTestId("today-empty-state")).toBeVisible();
    const loadLatest = page.getByTestId("load-latest-slate");
    await expect(loadLatest).toBeVisible();

    await loadLatest.click();
    if (latestDate) {
      await expect(page.getByTestId("today-games-list")).toBeVisible();
    } else {
      await expect(page.getByText(/No historical slates available/i)).toBeVisible();
    }

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
  });
});

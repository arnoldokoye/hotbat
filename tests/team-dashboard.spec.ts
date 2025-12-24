import { expect, test } from "@playwright/test";
import { isDbConfigured } from "./helpers/db";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3100";

test.describe("Team HR Dashboard", () => {
  test("renders Yankees dashboard with metrics and games", async ({ page }) => {
    if (!isDbConfigured()) {
      test.skip(true, "DATABASE_URL not set or placeholder; skipping team dashboard DB-backed test.");
    }
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

    const fixtureRes = await page.request.get(`${BASE_URL}/api/_test-fixtures/default-ids`);
    if (!fixtureRes.ok()) {
      test.skip(true, "Fixture endpoint unavailable; skipping team dashboard test.");
    }
    const contentType = fixtureRes.headers()["content-type"] ?? "";
    if (!contentType.includes("application/json")) {
      test.skip(true, `Fixture not JSON (${contentType}); skipping team dashboard test.`);
    }
    const fixture = await fixtureRes.json();
    const teamId = fixture.teamId as number | null;
    if (!teamId) {
      test.skip(true, "No teams found in DB; skipping team dashboard test.");
    }

    await page.goto(`${BASE_URL}/team?teamId=${teamId}`, { waitUntil: "networkidle" });

    await expect(page.getByTestId("team-dashboard")).toBeVisible();
    await expect(page.getByRole("heading").first()).toBeVisible();

    const metricsSection = page.getByTestId("team-key-metrics");
    await expect(metricsSection).toBeVisible();
    const metricCards = metricsSection.getByTestId("team-key-metric");
    await expect(metricCards.first()).toBeVisible();
    expect(await metricCards.count()).toBeGreaterThan(0);

    const gamesTable = page.getByTestId("team-games-table");
    await expect(gamesTable).toBeVisible();
    const gameRows = gamesTable.locator("tbody tr");
    expect(await gameRows.count()).toBeGreaterThan(0);

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
  });
});

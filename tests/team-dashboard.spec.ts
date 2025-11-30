import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

test.describe("Team HR Dashboard", () => {
  test("renders Yankees dashboard with metrics and games", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto(`${BASE_URL}/team`, { waitUntil: "networkidle" });

    await expect(page.getByTestId("team-dashboard")).toBeVisible();
    await expect(page.getByRole("heading", { name: /New York Yankees/i })).toBeVisible();

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

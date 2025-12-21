import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3100";

test.describe("Player HR Dashboard filters", () => {
  test("season and split selectors update URL without errors", async ({ page }) => {
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

    await page.goto(`${BASE_URL}/player?playerId=1&season=2024&split=overall`, {
      waitUntil: "networkidle",
    });

    const heading = page.getByRole("heading", { level: 1 }).first();
    await expect(heading).toBeVisible();

    const seasonSelect = page.getByTestId("player-season-selector");
    const splitSelect = page.getByTestId("player-split-selector");

    await expect(seasonSelect).toBeVisible();
    await expect(splitSelect).toBeVisible();

    await seasonSelect.selectOption("2024");
    await expect(page).toHaveURL(/season=2024/);

    await splitSelect.selectOption("home");
    await expect(page).toHaveURL(/split=home/);
    await expect(heading).toBeVisible();

    await splitSelect.selectOption("month:2024-06");
    await expect(page).toHaveURL(/split=month%3A2024-06/);
    await expect(heading).toBeVisible();

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
    expect(pageErrors, "Page errors should be empty").toEqual([]);
  });
});

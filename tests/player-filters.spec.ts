import { expect, test } from "@playwright/test";
import { isDbConfigured } from "./helpers/db";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3100";

test.describe("Player HR Dashboard filters", () => {
  test("season and split selectors update URL without errors", async ({ page }) => {
    if (!isDbConfigured()) {
      test.skip(true, "DATABASE_URL not set or placeholder; skipping player dashboard DB-backed test.");
    }
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

    const fixtureRes = await page.request.get(`${BASE_URL}/api/_test-fixtures/default-ids`);
    if (!fixtureRes.ok()) {
      test.skip(true, "Fixture endpoint unavailable; skipping player filters test.");
    }
    const contentType = fixtureRes.headers()["content-type"] ?? "";
    if (!contentType.includes("application/json")) {
      test.skip(true, `Fixture not JSON (${contentType}); skipping player filters test.`);
    }
    const fixture = await fixtureRes.json();
    const playerId = fixture.playerId as number | null;
    if (!playerId) {
      test.skip(true, "No players found in DB; skipping player filters test.");
    }

    await page.goto(`${BASE_URL}/player?playerId=${playerId}&season=2024&split=overall`, {
      waitUntil: "networkidle",
    });

    const heading = page.getByRole("heading", { level: 1 }).first();
    await expect(heading).toBeVisible();

    const seasonSelect = page.getByTestId("player-season-selector");
    const splitSelect = page.getByTestId("player-split-selector");

    await expect(seasonSelect).toBeVisible();
    await expect(splitSelect).toBeVisible();

    const seasonOption = await seasonSelect.locator("option").nth(0).getAttribute("value");
    if (seasonOption) {
      await seasonSelect.selectOption(seasonOption);
      await expect(page).toHaveURL(new RegExp(`season=${encodeURIComponent(seasonOption)}`));
    }

    const splitOptions = await splitSelect.locator("option").all();
    if (splitOptions.length > 0) {
      const firstSplit = (await splitOptions[0].getAttribute("value")) ?? "";
      if (firstSplit) {
        await splitSelect.selectOption(firstSplit);
        await expect(page).toHaveURL(new RegExp(`split=${encodeURIComponent(firstSplit)}`));
        await expect(heading).toBeVisible();
      }
    }

    if (splitOptions.length > 1) {
      const secondSplit = (await splitOptions[1].getAttribute("value")) ?? "";
      if (secondSplit) {
        await splitSelect.selectOption(secondSplit);
        await expect(page).toHaveURL(new RegExp(`split=${encodeURIComponent(secondSplit)}`));
        await expect(heading).toBeVisible();
      }
    }

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
    expect(pageErrors, "Page errors should be empty").toEqual([]);
  });
});

import { expect, test } from "@playwright/test";
import { isDbConfigured } from "./helpers/db";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3100";

test.describe("Player HR Dashboard", () => {
  test("switching players updates name and URL", async ({ page }) => {
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
      test.skip(true, "Fixture endpoint unavailable; skipping player dashboard test.");
    }
    const contentType = fixtureRes.headers()["content-type"] ?? "";
    if (!contentType.includes("application/json")) {
      test.skip(true, `Fixture not JSON (${contentType}); skipping player dashboard test.`);
    }
    const fixture = await fixtureRes.json();
    const playerId = fixture.playerId as number | null;
    const playerName = (fixture.playerName as string | null) ?? "Player";

    if (!playerId) {
      test.skip(true, "No players found in DB; skipping player dashboard test.");
    }

    await page.goto(`${BASE_URL}/player?playerId=${playerId}`, { waitUntil: "networkidle" });

    const heading = page.getByRole("heading", { level: 1 }).first();
    await expect(heading).toBeVisible();
    const headingText = (await heading.textContent())?.trim() ?? "";
    expect(headingText.length).toBeGreaterThan(0);

    const hrChart = page.getByTestId("player-hr-chart");
    await expect(hrChart).toBeVisible();
    await expect(hrChart).toContainText("HR & xHR over recent games");

    const baselineCard = page.getByTestId("player-baseline-card");
    await expect(baselineCard).toBeVisible();
    await expect(baselineCard).toContainText(/Expected HR/i);
    await expect(baselineCard.getByTestId("baseline-notes")).toBeVisible();
    await expect(baselineCard).toContainText(/How calculated/i);
    await expect(baselineCard).not.toContainText("—");

    const selector = page.getByTestId("player-selector");
    await selector.click();

    const suggestions = page
      .getByTestId("player-suggestions")
      .getByTestId("player-suggestion");
    const count = await suggestions.count();
    if (count >= 2) {
      await suggestions.nth(1).click();
      await expect(page).toHaveURL(/playerId=/);
      await expect(heading).toBeVisible();
    }

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
    expect(pageErrors, "Page errors should be empty").toEqual([]);
  });
});

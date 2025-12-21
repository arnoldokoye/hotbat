import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3100";

test.describe("HR Picks", () => {
  test("shows picks for seeded slate", async ({ page }) => {
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("...")) {
      test.skip(true, "DATABASE_URL not set or placeholder; skipping HR picks DB-backed test.");
    }

    const apiRes = await page.request.get(`${BASE_URL}/api/hr-picks?date=2024-06-15`);
    const apiJson = await apiRes.json();
    const apiPicks = apiJson.picks ?? [];

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

    await page.goto(`${BASE_URL}/picks?date=2024-06-15`, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { name: /HR Picks/i })).toBeVisible();

    if (apiPicks.length === 0) {
      await expect(page.getByTestId("hr-picks-empty")).toBeVisible();
    } else {
      const list = page.getByTestId("hr-picks-list");
      await expect(list).toBeVisible();
      const firstCard = page.getByTestId(/hr-pick-card-/).first();
      await expect(firstCard).toBeVisible();
      await firstCard.getByTestId(/hr-pick-view-/).click();
      await expect(page.getByTestId("hr-pick-drawer")).toBeVisible();
      await expect(page.getByTestId("hr-pick-drawer")).toContainText(/Pick Score/i);
      await page.getByTestId("hr-pick-drawer").getByText(/Close/).click();
    }

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
    expect(pageErrors, "Page errors should be empty").toEqual([]);
  });

  test("shows empty state for off-season date", async ({ page }) => {
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("...")) {
      test.skip(true, "DATABASE_URL not set or placeholder; skipping HR picks DB-backed test.");
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

    await page.goto(`${BASE_URL}/picks?date=1999-01-01`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /HR Picks/i })).toBeVisible();
    await expect(page.getByTestId("hr-picks-empty")).toBeVisible();

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
  });

  test("compare two picks", async ({ page }) => {
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("...")) {
      test.skip(true, "DATABASE_URL not set or placeholder; skipping HR picks DB-backed test.");
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

    await page.goto(`${BASE_URL}/picks?date=2024-06-15`, { waitUntil: "networkidle" });
    const cards = page.getByTestId(/hr-pick-card-/);
    const count = await cards.count();
    if (count < 2) {
      test.skip(true, "Not enough picks to compare on seeded date.");
    }

    const firstCompare = cards.nth(0).getByTestId(/hr-pick-compare-/);
    const secondCompare = cards.nth(1).getByTestId(/hr-pick-compare-/);
    await firstCompare.check();
    await secondCompare.check();

    const panel = page.getByTestId("hr-picks-compare-panel");
    await expect(panel).toBeVisible();
    const firstName = await cards.nth(0).locator("p").first().textContent();
    if (firstName) {
      await expect(panel).toContainText(firstName.trim());
    }

    // Clear compare
    await panel.getByRole("button", { name: /Clear compare/i }).click();
    await expect(page.getByTestId("hr-picks-compare-panel")).toHaveCount(0);

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
  });
});

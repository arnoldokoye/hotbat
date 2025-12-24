import { expect, test, type APIRequestContext } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3100";

async function getLatestBaselineDate(request: APIRequestContext) {
  try {
    const res = await request.get(`${BASE_URL}/data/player_game_baseline.csv`);
    if (!res.ok()) return null;
    const text = await res.text();
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return null;
    const header = lines[0].split(",");
    const dateIdx = header.indexOf("game_date");
    if (dateIdx === -1) return null;
    let latest = "";
    for (const line of lines.slice(1)) {
      const cols = line.split(",");
      const d = (cols[dateIdx] ?? "").trim();
      if (d && d > latest) latest = d;
    }
    return latest || null;
  } catch {
    return null;
  }
}

test.describe("HR Picks", () => {
  test("shows picks for available slate", async ({ page }) => {
    const baselineDate = await getLatestBaselineDate(page.request);
    if (!baselineDate) {
      test.skip(true, "No baseline CSV found at /data/player_game_baseline.csv; skipping.");
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

    await page.goto(`${BASE_URL}/picks?date=${baselineDate}`, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { name: /HR Picks/i })).toBeVisible();

    const list = page.getByTestId("hr-picks-list");
    await expect(list).toBeVisible();
    const firstCard = page.getByTestId(/hr-pick-card-/).first();
    await expect(firstCard).toBeVisible();
    await firstCard.getByTestId(/hr-pick-view-/).click();
    await expect(page.getByTestId("hr-pick-drawer")).toBeVisible();
    await expect(page.getByTestId("hr-pick-drawer")).toContainText(/Pick Score/i);
    await page.getByTestId("hr-pick-drawer").getByText(/Close/).click();

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
    expect(pageErrors, "Page errors should be empty").toEqual([]);
  });

  test("invalid date snaps to latest CSV date", async ({ page }) => {
    const baselineDate = await getLatestBaselineDate(page.request);
    if (!baselineDate) {
      test.skip(true, "No baseline CSV found at /data/player_game_baseline.csv; skipping.");
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
    await expect(page.getByTestId("hr-picks-date")).toHaveValue(baselineDate);
    await expect(page.getByTestId("hr-picks-list")).toBeVisible();

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
  });

  test("compare two picks", async ({ page }) => {
    const baselineDate = await getLatestBaselineDate(page.request);
    if (!baselineDate) {
      test.skip(true, "No baseline CSV found at /data/player_game_baseline.csv; skipping.");
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

    await page.goto(`${BASE_URL}/picks?date=${baselineDate}`, { waitUntil: "networkidle" });
    const cards = page.getByTestId(/hr-pick-card-/);
    const count = await cards.count();
    if (count < 2) {
      test.skip(true, "Not enough picks to compare on selected date.");
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

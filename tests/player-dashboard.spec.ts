import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3100";

test.describe("Player HR Dashboard", () => {
  test("switching players updates name and URL", async ({ page }) => {
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

    await page.goto(`${BASE_URL}/player?playerId=1`, { waitUntil: "networkidle" });

    const heading = page.getByRole("heading", { level: 1 }).first();
    await expect(heading).toContainText(/Aaron Judge/i);

    const hrChart = page.getByTestId("player-hr-chart");
    await expect(hrChart).toBeVisible();
    await expect(hrChart).toContainText("HR & xHR over recent games");

    const selector = page.getByTestId("player-selector");

    await selector.selectOption({ label: "Juan Soto (NYY)" });
    await expect(heading).toContainText(/Juan Soto/i);
    await expect(page).toHaveURL(/playerId=2/);

    await selector.selectOption({ label: "Rafael Devers (BOS)" });
    await expect(heading).toContainText(/Rafael Devers/i);
    await expect(page).toHaveURL(/playerId=3/);

    expect(consoleErrors, "Console errors should be empty").toEqual([]);
    expect(pageErrors, "Page errors should be empty").toEqual([]);
  });
});

import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

test.describe("Today Games", () => {
  test("shows today games list with Yankees vs Red Sox", async ({ page }) => {
    await page.goto(`${BASE_URL}/today`, { waitUntil: "networkidle" });

    await expect(page.getByTestId("today-games")).toBeVisible();
    const list = page.getByTestId("today-games-list");
    await expect(list).toBeVisible();

    const cards = list.getByTestId("today-game-card");
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);

    const yankeesCard = cards.filter({ hasText: "New York Yankees" }).first();
    await expect(yankeesCard).toBeVisible();
    await expect(yankeesCard).toContainText("Boston Red Sox");
    await expect(yankeesCard).toContainText("Yankee Stadium");
    await expect(yankeesCard).toContainText(/HotBat/i);
  });
});

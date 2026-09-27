import { expect, test } from "@playwright/test";
import { startWithLightTheme } from "./helpers";

test.beforeEach(async ({ page }) => {
  await startWithLightTheme(page);
});

test("homepage and main pages open from the header", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "شركة الجامعة",
  );

  const nav = page.getByRole("navigation", { name: "Main" });

  await nav.getByRole("button", { name: "الوظائف" }).click();
  await expect(page).toHaveURL(/\/jobs$/);
  await expect(
    page.getByRole("heading", { name: "الوظائف المتاحة" }),
  ).toBeVisible();

  await nav.getByRole("button", { name: "خدماتنا" }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { name: "خدماتنا" })).toBeVisible();

  await nav.getByRole("button", { name: "عن الشركة" }).click();
  await expect(page).toHaveURL(/\/about$/);

  await nav.getByRole("button", { name: "اتصل بنا" }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

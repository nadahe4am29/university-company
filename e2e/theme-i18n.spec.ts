import { expect, test } from "@playwright/test";
import { startWithLightTheme } from "./helpers";

test("keeps light mode after a reload", async ({ page }) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("e2e-theme-seeded")) {
      localStorage.setItem("theme", "dark");
      sessionStorage.setItem("e2e-theme-seeded", "1");
    }
  });

  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);

  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await expect(
    page.getByRole("button", { name: "Switch to dark mode" }),
  ).toBeVisible();
});

test("switches language and document direction", async ({ page }) => {
  await startWithLightTheme(page);
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");

  await page.getByRole("button", { name: "Switch to English" }).click();

  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  const nav = page.getByRole("navigation", { name: "Main" });
  await nav.getByRole("button", { name: "Jobs" }).click();
  await expect(page).toHaveURL(/\/jobs$/);
  await expect(
    page.getByRole("heading", { name: "Available Jobs" }),
  ).toBeVisible();
});

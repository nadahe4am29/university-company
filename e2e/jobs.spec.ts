import { expect, test } from "@playwright/test";
import {
  MOCK_QUALIFIED_JOB,
  failJobsApi,
  mockJobsApi,
  startWithLightTheme,
} from "./helpers";

test.beforeEach(async ({ page }) => {
  await startWithLightTheme(page);
});

test("shows mocked jobs from the API", async ({ page }) => {
  await mockJobsApi(page);
  await page.goto("/jobs");

  await expect(page.getByTestId(`job-card-${MOCK_QUALIFIED_JOB._id}`)).toBeVisible();
  await expect(page.getByText(MOCK_QUALIFIED_JOB.title)).toBeVisible();
  await expect(page.getByText("سائق اختبار")).toBeVisible();
});

test("falls back to dummy jobs when the API fails", async ({ page }) => {
  await failJobsApi(page);
  await page.goto("/jobs");

  await expect(page.getByTestId("job-card-job-hr-manager")).toBeVisible();
  await expect(page.getByText("مدير موارد بشرية")).toBeVisible();
});

test("filters jobs by search text", async ({ page }) => {
  await mockJobsApi(page);
  await page.goto("/jobs");

  await page.getByTestId("jobs-search").fill("اختبار آلي");

  await expect(page.getByText(MOCK_QUALIFIED_JOB.title)).toBeVisible();
  await expect(page.getByText("سائق اختبار")).toHaveCount(0);
});

test("opens job details and the apply page", async ({ page }) => {
  await mockJobsApi(page);
  await page.goto("/jobs");

  await page.getByTestId(`job-learn-more-${MOCK_QUALIFIED_JOB._id}`).click();
  await expect(page).toHaveURL(new RegExp(`/jobs/${MOCK_QUALIFIED_JOB._id}$`));
  await expect(
    page.getByRole("heading", { name: MOCK_QUALIFIED_JOB.title }),
  ).toBeVisible();

  await page.getByRole("button", { name: "تقدم الآن" }).click();
  await expect(page).toHaveURL(new RegExp(`/apply/${MOCK_QUALIFIED_JOB._id}$`));
  await expect(page.getByRole("heading", { name: "تسجيل باحث عن عمل" })).toBeVisible();
});

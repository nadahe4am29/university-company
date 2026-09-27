import { type Page } from "@playwright/test";

export const MOCK_QUALIFIED_JOB = {
  _id: "job-qa-1",
  title: "مهندس اختبار آلي",
  location: "الرياض، السعودية",
  sector: "تقنية",
  salary: "10,000 ريال",
  education: "بكالوريوس",
  experience: "+3 سنوات خبرة",
  description: "وظيفة اختبار للتشغيل الآلي",
};

export const MOCK_UNQUALIFIED_JOB = {
  _id: "job-qa-2",
  title: "سائق اختبار",
  location: "جدة، السعودية",
  sector: "خدمات منزلية",
  salary: "4,000 ريال",
  education: "رخصة قيادة",
  experience: "+2 سنوات خبرة",
  description: "وظيفة سائق للاختبار",
};

export async function startWithLightTheme(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("theme", "light");
  });
}

export async function mockJobsApi(
  page: Page,
  jobs: { qualified?: unknown[]; unqualified?: unknown[] } = {},
) {
  await page.route("**/api/jobs/qualified", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(jobs.qualified ?? [MOCK_QUALIFIED_JOB]),
    });
  });

  await page.route("**/api/jobs/unqualified", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(jobs.unqualified ?? [MOCK_UNQUALIFIED_JOB]),
    });
  });
}

export async function failJobsApi(page: Page) {
  await page.route("**/api/jobs/qualified", (route) => route.abort());
  await page.route("**/api/jobs/unqualified", (route) => route.abort());
}

export async function mockPostJobApi(page: Page) {
  await page.route(/\/api\/jobs\/?$/, async (route) => {
    if (route.request().method() !== "POST") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: "[]",
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
}

import { expect, test } from "@playwright/test";
import {
  MOCK_QUALIFIED_JOB,
  mockJobsApi,
  mockPostJobApi,
  startWithLightTheme,
} from "./helpers";

test.beforeEach(async ({ page }) => {
  await startWithLightTheme(page);
});

test("FAQ search filters questions", async ({ page }) => {
  await page.goto("/faq");

  await expect(
    page.getByRole("button", { name: /هل توجد رسوم/ }),
  ).toBeVisible();

  await page.getByTestId("faq-search").fill("الدول المتاحة");

  await expect(
    page.getByRole("button", { name: /ما هي الدول المتاحة للتوظيف/ }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /هل توجد رسوم/ })).toHaveCount(
    0,
  );
});

test("contact form shows a success alert", async ({ page }) => {
  await page.goto("/contact");

  await page.getByPlaceholder("اسمك الكامل").fill("أحمد محمد");
  await page.getByPlaceholder("email@example.com").fill("ahmed@example.com");
  await page.getByPlaceholder("اكتب رسالتك هنا...").fill("أريد الاستفسار عن وظيفة.");

  const dialogPromise = page.waitForEvent("dialog");
  await page.getByRole("button", { name: "إرسال الرسالة" }).click();

  const dialog = await dialogPromise;
  expect(dialog.message()).toContain("تم إرسال رسالتك بنجاح");
  await dialog.accept();
});

test("apply form moves to the next step after required fields", async ({
  page,
}) => {
  await mockJobsApi(page);
  await page.goto("/jobs");
  await page.getByTestId(`job-apply-${MOCK_QUALIFIED_JOB._id}`).click();

  await expect(page).toHaveURL(new RegExp(`/apply/${MOCK_QUALIFIED_JOB._id}$`));
  await expect(page.getByTestId("apply-next")).toBeDisabled();

  await page.locator('input[name="fullName"]').fill("أحمد محمد");
  await page.locator('input[name="birthdate"]').fill("1995-01-15");
  await page.locator('select[name="maritalStatus"]').selectOption("أعزب");
  await page.locator('select[name="placeOfResidence"]').selectOption("القاهرة");
  await page.locator('input[name="currentJob"]').fill("مهندس برمجيات");
  await page.locator('select[name="drivingLicense"]').selectOption("yes");
  await page.locator('select[name="hasPassport"]').selectOption("yes");
  await page.locator('input[name="phone"]').fill("01012345678");

  await expect(page.getByTestId("apply-next")).toBeEnabled();
  await page.getByTestId("apply-next").click();

  await expect(page.getByText("المؤهل الدراسي").first()).toBeVisible();
});

test("post-job form submits through the mocked API", async ({ page }) => {
  await mockPostJobApi(page);
  await page.goto("/post-job");

  const form = page.getByTestId("post-job-form");

  await form.locator("select").first().selectOption("qualified");
  await form.getByPlaceholder("أدخل المسمى الوظيفي").fill("مهندس مدني");
  await form
    .getByPlaceholder("أدخل وصفاً تفصيلياً للوظيفة")
    .fill("مطلوب مهندس مدني للعمل في السعودية.");
  await form.getByPlaceholder("أدخل موقع الوظيفة").fill("الرياض");

  page.once("dialog", (dialog) => {
    expect(dialog.message()).toContain("تم تقديم الوظيفة للموافقة");
    void dialog.accept();
  });

  await form.getByRole("button", { name: "إنشاء وظيفة" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "شركة الجامعة",
  );
});

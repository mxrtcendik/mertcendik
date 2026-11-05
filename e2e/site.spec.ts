import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import fs from "fs";
import path from "path";

const postSlugs = fs
  .readdirSync(path.join(process.cwd(), "content", "blog"))
  .filter((name) => name.endsWith(".mdx"))
  .map((name) => name.replace(/\.mdx$/, ""));

const projectPages = fs
  .readdirSync(path.join(process.cwd(), "content", "projects"))
  .map((name) => `/projects/${name.replace(/\.mdx$/, "")}`);

const pages = [
  "/",
  "/blog",
  ...postSlugs.map((slug) => `/blog/${slug}`),
  ...projectPages,
];

// Collects console errors and uncaught exceptions while a test runs.
function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(String(error)));
  return errors;
}

test.describe("every page", () => {
  for (const url of pages) {
    test(`${url} loads cleanly and passes axe`, async ({ page }) => {
      const errors = watchErrors(page);
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();

      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
      expect(errors).toEqual([]);
    });

    test(`${url} fits a phone screen @phone`, async ({ page }) => {
      await page.goto(url);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test("old post URLs redirect to the new ones", async ({ request }) => {
  const response = await request.get("/blog/the-press", { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toContain(
    "/blog/making-a-button-feel-pressed"
  );
});

test("security headers are sent", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["content-security-policy"]).toContain(
    "frame-ancestors 'none'"
  );
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
});

test.describe("search", () => {
  test("ranks title matches first", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+k");
    await page.getByRole("combobox").fill("dark");
    await expect(page.getByRole("option").first()).toContainText(
      "Switch to dark theme"
    );
  });

  test("opens a post at the top of the page", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.keyboard.press("Control+k");
    await page.getByRole("combobox").fill("clip");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/blog\/revealing-with-clip-path$/);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("keeps what's typed while the dialog is still loading", async ({
    page,
  }) => {
    // Delay every script requested after the page loads, which includes
    // the search dialog.
    let loaded = false;
    await page.route(/\.js(\?|$)/, async (route) => {
      if (loaded) await new Promise((resolve) => setTimeout(resolve, 1500));
      await route.continue();
    });
    await page.goto("/", { waitUntil: "load" });
    loaded = true;

    await page.keyboard.press("Control+k");
    await page.keyboard.type("dark", { delay: 30 });
    await expect(page.getByRole("combobox")).toHaveValue("dark");
  });

  test("returns focus to the search button when closed", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page.getByRole("combobox")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Search" })).toBeFocused();
  });
});

test("opening a post from a scrolled list lands at the top", async ({
  page,
}) => {
  await page.goto("/blog");
  const link = page.locator("main a[href='/blog/should-this-animate']");
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(page).toHaveURL(/should-this-animate$/);
  await expect
    .poll(() => page.evaluate(() => window.scrollY), { timeout: 3000 })
    .toBe(0);
});

test("demo status text sits under its button", async ({ page }) => {
  await page.goto("/blog/a-button-you-have-to-hold");
  const stage = page.locator(".demo-stage").first();
  const button = await stage.getByRole("button").boundingBox();
  const status = await stage.getByText("A click does nothing.").boundingBox();
  expect(button && status).toBeTruthy();
  expect(status!.y).toBeGreaterThan(button!.y + button!.height - 1);
});

test("a reload doesn't count a view twice", async ({ page, request }) => {
  const slug = "should-this-animate";
  const read = async () =>
    (
      (await (await request.get(`/api/views/${slug}`)).json()) as {
        count: number;
      }
    ).count;

  const before = await read();
  await page.goto(`/blog/${slug}`);
  await expect(page.locator("article").getByText(/views?$/)).toBeVisible();
  await page.reload();
  await expect(page.locator("article").getByText(/views?$/)).toBeVisible();
  expect(await read()).toBe(before + 1);
});

test("the views API only accepts real posts", async ({ request }) => {
  const response = await request.post("/api/views/not-a-real-post");
  expect(response.status()).toBe(404);
});

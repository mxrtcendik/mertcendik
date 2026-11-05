import { defineConfig, devices } from "@playwright/test";

// Browser tests for the site. They start the dev server if it isn't running,
// or reuse it if it is. Run with: npm run test:e2e
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      // The accessibility checks again in dark mode, since colors differ.
      name: "desktop-dark",
      use: { ...devices["Desktop Chrome"], colorScheme: "dark" },
      grep: /passes axe/,
    },
    {
      name: "phone",
      use: { ...devices["Pixel 7"] },
      // Phone runs only the layout checks; behavior is covered on desktop.
      grep: /@phone/,
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});

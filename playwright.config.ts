import { defineConfig, devices } from '@playwright/test';
import { config } from './config/env.config';
config();

console.log('BASE_URL:', process.env.BASE_URL);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: process.env.BASE_URL,
    httpCredentials: {
    username: process.env.HTTP_CREDENTIALS_USERNAME!,
    password: process.env.HTTP_CREDENTIALS_PASSWORD!,
  },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
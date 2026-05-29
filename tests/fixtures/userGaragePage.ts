import { test as base, expect, Page } from '@playwright/test';

type QAutoFixtures = {
  userGaragePage: Page;
};

export const test = base.extend<QAutoFixtures>({
  userGaragePage: async ({ page }, use) => {
    await page.goto('/panel/garage');

    await expect(page).toHaveURL(/panel\/garage/);

    await use(page);
  },
});

export { expect };
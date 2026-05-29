import { test as base } from '@playwright/test';
import { GaragePage } from '../../pages/GaragePage';
import { authFile } from './auth';

type QAutoFixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<QAutoFixtures>({
  userGaragePage: async ({ browser, baseURL }, use) => {
    const context = await browser.newContext({
      baseURL,
      storageState: authFile,
      httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME!,
        password: process.env.HTTP_CREDENTIALS_PASSWORD!,
      },
    });
    const page = await context.newPage();
    const userGaragePage = new GaragePage(page);

    await userGaragePage.open('/panel/garage');
    await userGaragePage.expectGarageTitleVisible();

    await use(userGaragePage);

    await context.close();
  },
});

export { expect } from '@playwright/test';

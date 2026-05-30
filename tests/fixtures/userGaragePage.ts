import { test as base } from '@playwright/test';
import { GaragePage } from '../../pages/GaragePage';

type QAutoFixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<QAutoFixtures>({
  userGaragePage: async ({ page }, use) => {
    const userGaragePage = new GaragePage(page);

    await userGaragePage.open('/panel/garage');
    await userGaragePage.expectGarageTitleVisible();

    await use(userGaragePage);
  },
});

export { expect } from '@playwright/test';

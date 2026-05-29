import { test as setup } from '@playwright/test';
import { GaragePage } from '../pages/GaragePage';
import { LoginPage } from '../pages/LoginPage';
import { userData2 } from '../test-data/userData';
import { authFile } from './fixtures/auth';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const garagePage = new GaragePage(page);

  await page.goto('/');
  await loginPage.login(userData2.email, userData2.password);
  await garagePage.expectGarageTitleVisible();

  await page.context().storageState({ path: authFile });
});

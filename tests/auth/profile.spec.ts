import { expect, test } from '@playwright/test';
import { ProfilePage } from '../../pages/ProfilePage';
import { mockedProfile } from '../../test-data/networkAndApiData';

test('user profile shows data from mocked profile API response', async ({ page }) => {
  await page.route('**/api/users/profile', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: mockedProfile,
      }),
    });
  });

  const profilePage = new ProfilePage(page);

  await profilePage.open('/panel/profile');
  await profilePage.expectProfileTitleVisible();

  await expect(profilePage.profileName).toHaveText(`${mockedProfile.name} ${mockedProfile.lastName}`);
});
import { expect, test } from '../fixtures/userGaragePage';

test('user can open garage as authenticated user', async ({ userGaragePage }) => {
  await userGaragePage.expectGarageTitleVisible();

  await expect(userGaragePage.garageTitle).toHaveText('Garage');
});

import { expect, test } from './fixtures/userGaragePage';

test('user can open garage as authenticated user', async ({ userGaragePage }) => {
  await expect(userGaragePage.getByRole('heading', { name: 'Garage' })).toBeVisible();
});
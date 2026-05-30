import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly profileTitle: Locator;
  readonly profileName: Locator;

  constructor(page: Page) {
    super(page);
    this.profileTitle = page.getByRole('heading', { name: 'Profile' });
    this.profileName = page.locator('.profile_name');
  }

  async expectProfileTitleVisible() {
    await expect(this.profileTitle).toBeVisible();
  }
}
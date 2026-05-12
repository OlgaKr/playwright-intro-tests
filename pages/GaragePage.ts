import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class GaragePage extends BasePage {
  readonly garageTitle: Locator;
  readonly myProfileButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.garageTitle = page.getByRole('heading', { name: 'Garage' });
    this.myProfileButton = page.getByText('My profile');
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async logout() {
    await this.myProfileButton.click();
    await this.logoutButton.click();
  }
}
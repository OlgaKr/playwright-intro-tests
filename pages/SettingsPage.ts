import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SettingsPage extends BasePage {
  readonly settingsLink: Locator;
  readonly removeMyAccountButton: Locator;
  readonly confirmRemoveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.settingsLink = page.getByRole('link', { name: /Settings/ });
    this.removeMyAccountButton = page.getByRole('button', {
      name: 'Remove my account',
    });
    this.confirmRemoveButton = page.getByRole('button', { name: 'Remove' });
  }

  async deleteAccount() {
    await this.settingsLink.click();
    await this.removeMyAccountButton.click();
    await this.confirmRemoveButton.click();
  }
}
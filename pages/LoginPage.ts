import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly signInButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.emailInput = page.locator('#signinEmail');
    this.passwordInput = page.locator('#signinPassword');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login(email: string, password: string) {
    await this.signInButton.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  readonly signUpButton: Locator;
  readonly registrationTitle: Locator;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);

    this.signUpButton = page.locator('button.hero-descriptor_btn');
    this.registrationTitle = page.getByRole('heading', { name: 'Registration' });
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('button:has-text("Register")');
  }

  async open() {
  await super.open('/');
  }

  async openRegistrationForm() {
    await this.signUpButton.click();
  }

  async focusAndBlurField(field: Locator) {
    await field.focus();
    await field.blur();
  }

  async fillFieldAndBlur(field: Locator, value: string) {
    await field.fill(value);
    await field.blur();
  }

  async fillDifferentPasswords(password: string, repeatPassword: string) {
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
    await this.repeatPasswordInput.blur();
  }

  getErrorMessage(text: string) {
    return this.page.getByText(text);
  }

  async registerUser(
    name: string,
    lastName: string,
    email: string,
    password: string
    ) {
      await this.nameInput.fill(name);
      await this.lastNameInput.fill(lastName);
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.repeatPasswordInput.fill(password);
      }
}
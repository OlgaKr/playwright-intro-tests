import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { GaragePage } from '../../pages/GaragePage';
import { LoginPage } from '../../pages/LoginPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { userData } from '../../test-data/userData';

test.describe('Registration form', () => {
  test.beforeEach(async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();
    await registrationPage.openRegistrationForm();
  });

  test('Registration modal is visible', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.expectRegistrationTitleVisible();
  });

  test('should show error when name is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.focusAndBlurField(registrationPage.nameInput);

    await registrationPage.expectErrorMessageVisible('Name required');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('should show error for invalid name', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillFieldAndBlur(registrationPage.nameInput, '1');

    await registrationPage.expectErrorMessageVisible('Name is invalid');
    await registrationPage.expectErrorMessageVisible('Name has to be from 2 to 20 characters long');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('should show error when last name is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.focusAndBlurField(registrationPage.lastNameInput);

    await registrationPage.expectErrorMessageVisible('Last name required');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('should show error for invalid last name', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillFieldAndBlur(registrationPage.lastNameInput, '1');

    await registrationPage.expectErrorMessageVisible('Last name is invalid');
    await registrationPage.expectErrorMessageVisible('Last name has to be from 2 to 20 characters long');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('should show error when email is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.focusAndBlurField(registrationPage.emailInput);

    await registrationPage.expectErrorMessageVisible('Email required');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('should show error for invalid email', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillFieldAndBlur(registrationPage.emailInput, '1');

    await registrationPage.expectErrorMessageVisible('Email is incorrect');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('should show error when password is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.focusAndBlurField(registrationPage.passwordInput);

    await registrationPage.expectErrorMessageVisible('Password required');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('should show error for invalid password', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillFieldAndBlur(registrationPage.passwordInput, '1');

    await registrationPage
      .expectErrorMessageVisible('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('should show error when Re-enter password is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.focusAndBlurField(registrationPage.repeatPasswordInput);

    await registrationPage.expectErrorMessageVisible('Re-enter password required');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('should show error when passwords do not match', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillDifferentPasswords('Password123', 'Password321');

    await registrationPage.expectErrorMessageVisible('Passwords do not match');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('should register user with valid data', async ({ page }) => {
    const email = `aqa-olga-${Date.now()}@test.com`;

    const registrationPage = new RegistrationPage(page);
    const garagePage = new GaragePage(page);
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);

    await registrationPage.registerUser(userData.name, userData.lastName, email, userData.password);

    await registrationPage.expectRegisterButtonEnabled();

    await registrationPage.clickRegisterButton();

    await garagePage.expectGarageTitleVisible();

    await garagePage.logout();

    await loginPage.login(email, userData.password);

    await garagePage.expectGarageTitleVisible();

    await settingsPage.deleteAccount();

    await loginPage.expectSignInButtonVisible();
  });
});

import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { GaragePage } from '../pages/GaragePage';
import { LoginPage } from '../pages/LoginPage';
import { SettingsPage } from '../pages/SettingsPage';

test.describe('Registration form', () => { 

  test.beforeEach(async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.open();
  await registrationPage.openRegistrationForm();
});
 
  test('Registration modal is visible', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await expect(registrationPage.registrationTitle).toBeVisible();
});

  test('should show error when name is empty', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.focusAndBlurField(registrationPage.nameInput);

  await expect(registrationPage.getErrorMessage('Name required')).toBeVisible();
  await expect(registrationPage.registerButton).toBeDisabled();
});

  test('should show error for invalid name', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.fillFieldAndBlur(registrationPage.nameInput,'1');

  await expect(registrationPage.getErrorMessage('Name is invalid')).toBeVisible();
  await expect(registrationPage.getErrorMessage('Name has to be from 2 to 20 characters long')).toBeVisible();
  await expect(registrationPage.registerButton).toBeDisabled();
});

  test('should show error when last name is empty', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.focusAndBlurField(registrationPage.lastNameInput);

  await expect(registrationPage.getErrorMessage('Last name required')).toBeVisible();
  await expect(registrationPage.registerButton).toBeDisabled();
});

  test('should show error for invalid last name', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.fillFieldAndBlur(registrationPage.lastNameInput,'1');

  await expect(registrationPage.getErrorMessage('Last name is invalid')).toBeVisible();
  await expect(registrationPage.getErrorMessage('Last name has to be from 2 to 20 characters long')).toBeVisible();
  await expect(registrationPage.registerButton).toBeDisabled();
});

  test('should show error when email is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.focusAndBlurField(registrationPage.emailInput);

    await expect(registrationPage.getErrorMessage('Email required')).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error for invalid email', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillFieldAndBlur(registrationPage.emailInput,'1');

    await expect(registrationPage.getErrorMessage('Email is incorrect')).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error when password is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.focusAndBlurField(registrationPage.passwordInput);

    await expect(registrationPage.getErrorMessage('Password required')).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error for invalid password', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillFieldAndBlur(registrationPage.passwordInput,'1');

    await expect(registrationPage
    .getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'))
    .toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error when Re-enter password is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.focusAndBlurField(registrationPage.repeatPasswordInput);

    await expect(registrationPage.getErrorMessage('Re-enter password required')).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should show error when passwords do not match', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillDifferentPasswords('Password123','Password321');

    await expect(registrationPage.getErrorMessage('Passwords do not match')).toBeVisible();
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('should register user with valid data', async ({ page }) => {
    const email = `aqa-olga-${Date.now()}@test.com`;

    const registrationPage = new RegistrationPage(page);
    const garagePage = new GaragePage(page);
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);

    await registrationPage.registerUser('Olga','Kravchenko',email,'Password123');

    await expect(registrationPage.registerButton).toBeEnabled();

    await registrationPage.registerButton.click();

    await expect(garagePage.garageTitle).toBeVisible();

    await garagePage.logout();

    await loginPage.login(email, 'Password123');

    await expect(garagePage.garageTitle).toBeVisible();

    await settingsPage.deleteAccount();

    await expect(loginPage.signInButton).toBeVisible();
  });
});
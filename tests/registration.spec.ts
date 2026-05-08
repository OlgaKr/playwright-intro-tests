import { test, expect } from '@playwright/test';

test.describe('Registration form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });

  const nameInput = '#signupName';
  const lastNameInput = '#signupLastName';
  const emailInput = '#signupEmail';
  const passwordInput = '#signupPassword';
  const reEnterPasswordInput = '#signupRepeatPassword';
  const registerButton = 'button:has-text("Register")';

  test('Registration modal is visible', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Registration' })
    ).toBeVisible();
  });

  test('should show error when name is empty', async ({ page }) => {
    await page.locator(nameInput).focus();
    await page.locator(nameInput).blur();

    await expect(page.getByText('Name required')).toBeVisible();
    await expect(page.locator(registerButton)).toBeDisabled();
  });

  test('should show error for invalid name', async ({ page }) => {
    await page.locator(nameInput).fill('1');
    await page.locator(nameInput).blur();

    await expect(page.getByText('Name is invalid')).toBeVisible();
    await expect(
      page.getByText('Name has to be from 2 to 20 characters long')
    ).toBeVisible();

    await expect(page.locator(registerButton)).toBeDisabled();
  });

  test('should show error when last name is empty', async ({ page }) => {
    await page.locator(lastNameInput).focus();
    await page.locator(lastNameInput).blur();

    await expect(page.getByText('Last name required')).toBeVisible();
    await expect(page.locator(registerButton)).toBeDisabled();
  });

  test('should show error for invalid last name', async ({ page }) => {
    await page.locator(lastNameInput).fill('1');
    await page.locator(lastNameInput).blur();

    await expect(page.getByText('Last name is invalid')).toBeVisible();
    await expect(
      page.getByText('Last name has to be from 2 to 20 characters long')
    ).toBeVisible();

    await expect(page.locator(registerButton)).toBeDisabled();
  });

  test('should show error when email is empty', async ({ page }) => {
    await page.locator(emailInput).focus();
    await page.locator(emailInput).blur();

    await expect(page.getByText('Email required')).toBeVisible();
    await expect(page.locator(registerButton)).toBeDisabled();
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.locator(emailInput).fill('test');
    await page.locator(emailInput).blur();

    await expect(page.getByText('Email is incorrect')).toBeVisible();
    await expect(page.locator(registerButton)).toBeDisabled();
  });

  test('should show error when password is empty', async ({ page }) => {
    await page.locator(passwordInput).focus();
    await page.locator(passwordInput).blur();

    await expect(page.getByText('Password required')).toBeVisible();
    await expect(page.locator(registerButton)).toBeDisabled();
  });

  test('should show error for invalid password', async ({ page }) => {
    await page.locator(passwordInput).fill('123');
    await page.locator(passwordInput).blur();

    await expect(
      page.getByText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      )
    ).toBeVisible();

    await expect(page.locator(registerButton)).toBeDisabled();
  });

  test('should show error when Re-enter password is empty', async ({ page }) => {
    await page.locator(reEnterPasswordInput).focus();
    await page.locator(reEnterPasswordInput).blur();

    await expect(page.getByText('Re-enter password required')).toBeVisible();
    await expect(page.locator(registerButton)).toBeDisabled();
  });

  test('should show error when passwords do not match', async ({ page }) => {
    await page.locator(passwordInput).fill('Password123');
    await page.locator(reEnterPasswordInput).fill('Password321');
    await page.locator(reEnterPasswordInput).blur();

    await expect(page.getByText('Passwords do not match')).toBeVisible();
    await expect(page.locator(registerButton)).toBeDisabled();
  });

  test('should register user with valid data', async ({ page }) => {
    const email = `aqa-olga-${Date.now()}@test.com`;

    // Create account
    await page.locator(nameInput).fill('Olga');
    await page.locator(lastNameInput).fill('Kravchenko');
    await page.locator(emailInput).fill(email);
    await page.locator(passwordInput).fill('Password123');
    await page.locator(reEnterPasswordInput).fill('Password123');

    await expect(page.locator(registerButton)).toBeEnabled();
    await page.locator(registerButton).click();

    await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();

    // Log out
    await page.getByText('My profile').click();
    await page.getByRole('button', { name: 'Logout' }).click();

    // Log in with created account
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('#signinEmail').fill(email);
    await page.locator('#signinPassword').fill('Password123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();

    // Delete account
    await page.getByRole('link', { name: /Settings/ }).click();
    await page.getByRole('button', { name: 'Remove my account' }).click();
    await page.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

});
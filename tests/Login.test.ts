import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_objects/LoginPage';

test.describe('Login Page Tests', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.visit();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();
    
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should show an error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.visit();
    await loginPage.enterUsername('invalid_user');
    await loginPage.enterPassword('invalid_password');
    await loginPage.clickLogin();

    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });
});

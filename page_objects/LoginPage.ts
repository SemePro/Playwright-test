import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  usernameInput = this.page.locator('input[data-test="username"]');
  passwordInput = this.page.locator('input[data-test="password"]');
  loginButton = this.page.locator('input[data-test="login-button"]');
  errorMessageContainer = this.page.locator('.error-message-container');

  // Methods
  async visit() {
    await this.page.goto('/');
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return this.errorMessageContainer;
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.errorMessageContainer).toHaveText(expectedMessage);
  }
}

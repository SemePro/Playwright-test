import { Page, Locator ,expect} from '@playwright/test';

export class CheckoutStepOnePage {
  private page: Page;

  // Locators declared as properties
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators in the constructor
    this.firstNameInput = this.page.locator('input[data-test="firstName"]');
    this.lastNameInput = this.page.locator('input[data-test="lastName"]');
    this.postalCodeInput = this.page.locator('input[data-test="postalCode"]');
    this.continueButton = this.page.locator('div.container button[data-test="continue"]');
    this.cancelButton = this.page.locator('button[data-test="cancel"]');
  }

  // Fills in the entire checkout form
  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.waitFor({ state: 'visible', timeout: 5000 });
  }

  // Verifies that the continue button is enabled
  async verifyContinueButtonEnabled() {
    // Ensure the continue button is both visible and enabled
    await this.continueButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.continueButton).toBeEnabled();
  }

  async clickContinue() {
    if (await this.continueButton.isVisible()) {
      console.log("Continue button is visible.");
      await this.continueButton.click();
    } else {
      console.error("Continue button is not visible.");
    }
  }
  

  async clickCancel() {
    await this.cancelButton.click();
  }
}

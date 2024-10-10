import { Page, Locator, expect} from '@playwright/test';

export class CheckoutCompletePage {
  private page: Page;

  // Locators declared as properties
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly ponyExpressImage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators in the constructor
    this.completeHeader = this.page.locator('h2[data-test="complete-header"]');
    this.completeText = this.page.locator('div[data-test="complete-text"]');
    this.ponyExpressImage = this.page.locator('img[data-test="pony-express"]');
    this.backHomeButton = this.page.locator('button[data-test="back-to-products"]');
  }

  async verifyOrderCompletion() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toHaveText('Your order has been dispatched');
    await expect(this.ponyExpressImage).toBeVisible();
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }
}

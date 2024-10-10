import { Page, Locator, expect } from '@playwright/test';

export class CheckoutStepTwoPage {
  private page: Page;

  // Locators declared as properties
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators in the constructor
    this.finishButton = this.page.locator('button[data-test="finish"]');
    this.cancelButton = this.page.locator('button[data-test="cancel"]');
    this.paymentInfoValue = this.page.locator('div[data-test="payment-info-value"]');
    this.shippingInfoValue = this.page.locator('div[data-test="shipping-info-value"]');
    this.itemTotalLabel = this.page.locator('div[data-test="subtotal-label"]');
    this.taxLabel = this.page.locator('div[data-test="tax-label"]');
    this.totalLabel = this.page.locator('div[data-test="total-label"]');
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async verifyPaymentInfo(paymentInfo: string) {
    await expect(this.paymentInfoValue).toHaveText(paymentInfo);
  }

  async verifyShippingInfo(shippingInfo: string) {
    await expect(this.shippingInfoValue).toHaveText(shippingInfo);
  }

  async verifyItemTotal(total: string) {
    await expect(this.itemTotalLabel).toHaveText(total);
  }

  async verifyTax(tax: string) {
    await expect(this.taxLabel).toHaveText(tax);
  }

  async verifyTotalAmount(total: string) {
    await expect(this.totalLabel).toHaveText(total);
  }
}

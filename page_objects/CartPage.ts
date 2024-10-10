import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  private page: Page;

  // Locators declared as properties
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartItemContainer: Locator;
  readonly cartItems: Locator;
  readonly cartItemQuantity: Locator;
  readonly cartItemDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = this.page.locator('button[data-test="continue-shopping"]');
    this.checkoutButton = this.page.locator('button[data-test="checkout"]');
    this.cartItemContainer = this.page.locator('div[data-test="cart-list"]');
    this.cartItems = this.page.locator('.cart_item');
    this.cartItemQuantity = this.page.locator('div[data-test="cart-quantity-label"]');
    this.cartItemDescription = this.page.locator('div[data-test="cart-desc-label"]');
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  // Corrected verifyCartContainsItems
  async verifyCartContainsItems() {
    // Wait for the cart items to be visible
    await this.cartItems.first().waitFor({ state: 'visible', timeout: 5000 });
    
    // Ensure that the cart contains more than 0 items
    const count = await this.cartItems.count();
    expect(count).toBeGreaterThan(0); // This checks if there are any items in the cart
  }

  async verifyCartItemQuantity(expectedQuantity: string) {
    // Wait for the quantity label to be visible and check the quantity
    await this.cartItemQuantity.first().waitFor({ state: 'visible', timeout: 5000 });
    const quantityText = await this.cartItemQuantity.first().textContent();
    expect(quantityText?.trim()).toBe(expectedQuantity);  // Verifying the quantity is as expected
  }

  async verifyCartItemDescription(description: string) {
    await expect(this.cartItemDescription).toContainText(description);
  }
}

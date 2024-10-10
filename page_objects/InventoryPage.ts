import { Page, Locator , expect} from '@playwright/test';

export class InventoryPage {
  private page: Page;

  // Locators declared as properties
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators in the constructor
    this.menuButton = this.page.locator('#react-burger-menu-btn');
    this.logoutLink = this.page.locator('a[data-test="logout-sidebar-link"]');
    this.cartLink = this.page.locator('.shopping_cart_link');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async addItemToCart(productId: string) {
    const addToCartButton = this.page.locator(`button[data-test="add-to-cart-${productId}"]`);
    if (await addToCartButton.isVisible()) {
      console.log(`Add to Cart button for product ${productId} is visible.`);
      await addToCartButton.click();
    } else {
      console.error(`Add to Cart button for product ${productId} is not visible.`);
    }
  }
  
  

  async goToCart() {
    await this.cartLink.click();
  }

  async verifyProductInList(productId: string, productName: string) {
    const productTitle = this.page.locator(`#item_${productId}_title_link`);
    await expect(productTitle).toHaveText(productName);
  }
}

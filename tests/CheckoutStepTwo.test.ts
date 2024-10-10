import { test, expect } from '@playwright/test';
import { CheckoutStepTwoPage } from '../page_objects/CheckouStepTwoPage';
import { InventoryPage } from '../page_objects/InventoryPage';
import { CartPage } from '../page_objects/CartPage';
import { LoginPage } from '../page_objects/LoginPage';
import { CheckoutStepOnePage } from '../page_objects/CheckoutStepOnePage';

test.describe('Checkout Step Two Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login and complete step one before accessing checkout step two
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('4'); // Add an item to cart
    await inventoryPage.goToCart();
    
    const cartPage = new CartPage(page);
    await cartPage.checkout();
    
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await checkoutStepOnePage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutStepOnePage.clickContinue();
  });

  test('should finish checkout process', async ({ page }) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    
    await checkoutStepTwoPage.clickFinish();
    await expect(page).toHaveURL('/checkout-complete.html');
  });
});

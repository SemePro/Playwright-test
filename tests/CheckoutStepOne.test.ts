import { test, expect } from '@playwright/test';
import { CheckoutStepOnePage } from '../page_objects/CheckoutStepOnePage';
import { InventoryPage } from '../page_objects/InventoryPage';
import { CartPage } from '../page_objects/CartPage';
import { LoginPage } from '../page_objects/LoginPage';



test.describe('Checkout Step One Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login and add items before accessing the checkout page
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('4'); // Add an item to cart
    await inventoryPage.goToCart();
    
    const cartPage = new CartPage(page);
    await cartPage.checkout();
  });

  test('should fill in checkout information and continue', async ({ page }) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    
    await checkoutStepOnePage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutStepOnePage.verifyContinueButtonEnabled();
    await checkoutStepOnePage.clickContinue();
    
    await expect(page).toHaveURL('/checkout-step-two.html');
  });
});

import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_objects/LoginPage';
import { InventoryPage } from '../page_objects/InventoryPage';
import { CartPage } from '../page_objects/CartPage';
import { CheckoutStepOnePage } from '../page_objects/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../page_objects/CheckouStepTwoPage';
import { CheckoutCompletePage } from '../page_objects/CheckoutCompletePage';

test.describe('E2E Test', () => {
  test('should complete an order', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add item to cart
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('4');
    await inventoryPage.goToCart();
    
    // Checkout step one
    const cartPage = new CartPage(page);
    await cartPage.checkout();
    
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await checkoutStepOnePage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutStepOnePage.clickContinue();
    
    // Checkout step two
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await checkoutStepTwoPage.clickFinish();
    
    // Verify order completion
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await checkoutCompletePage.verifyOrderCompletion();
  });
});

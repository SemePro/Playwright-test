import { test, expect } from '@playwright/test';
import { CheckoutCompletePage } from '../page_objects/CheckoutCompletePage';
import { CheckoutStepTwoPage } from '../page_objects/CheckouStepTwoPage';
import { InventoryPage } from '../page_objects/InventoryPage';
import { CartPage } from '../page_objects/CartPage';
import { LoginPage } from '../page_objects/LoginPage';
import { CheckoutStepOnePage } from '../page_objects/CheckoutStepOnePage';

test.describe('Checkout Complete Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login and complete checkout before accessing the complete page
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
    
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await checkoutStepTwoPage.clickFinish();
  });

  test('should verify order completion', async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    await checkoutCompletePage.verifyOrderCompletion();
  });

  test('should navigate back home after completing checkout', async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    await checkoutCompletePage.clickBackHome();
    await expect(page).toHaveURL('/inventory.html');
  });
});

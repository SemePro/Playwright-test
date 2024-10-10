import { test, expect } from '@playwright/test';
import { CartPage } from '../page_objects/CartPage';
import { LoginPage } from '../page_objects/LoginPage';
import { InventoryPage } from '../page_objects/InventoryPage';

test.describe('Cart Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login and add items before accessing the cart page
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('4'); // Add an item to cart
    await inventoryPage.goToCart();
  });

  test('should verify cart contains items', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.verifyCartContainsItems();
  });

  test('should allow user to continue shopping', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.continueShopping();
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should allow user to checkout', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.checkout();
    await expect(page).toHaveURL('/checkout-step-one.html');
  });
});

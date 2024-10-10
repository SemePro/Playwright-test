# Playwright Test Automation Framework

This repository contains an end-to-end (E2E) and API testing framework built using Playwright, which is designed to automate and test modern web applications. The framework supports both UI testing through Playwright’s browser automation capabilities and API testing through HTTP request handling.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Page Object Model](#page-object-model)
- [API Tests](#api-tests)
- [Configuring Playwright](#configuring-playwright)
- [Reports and Artifacts](#reports-and-artifacts)
- [Helper Classes](#helper-classes)
- [ApiHelper](#apihelper)
- [Best Practices](#best-practices)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js >= 16.x**
- **NPM** or **Yarn**
- **Git** (for version control)

To check your Node.js version, run the following command in your terminal:

```bash
node -v






f Node.js is not installed, you can download and install it from Node.js official website.

           ##  Installation

Clone the repository:

bash
Copy code
git clone <repository-url>
cd playwright-test
Install the dependencies:

bash
Copy code
npm install
This will install all the necessary packages for Playwright, including browser binaries.

Folder Structure
The framework follows a structured folder organization for better maintenance and scalability:

bash
Copy code
playwright-test/
├── helper/              # Helper classes for API and other utilities
│   └── ApiHelper.ts     # Helper class for API interactions
├── page_objects/        # Page Object Model (POM) classes for UI testing
│   ├── CartPage.ts
│   ├── CheckoutCompletePage.ts
│   ├── CheckoutStepOnePage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── tests/               # Test files for both UI and API tests
│   ├── api.test.ts      # API tests using Playwright's `request` object
│   ├── Cart.test.ts     # UI tests for the cart functionality
│   ├── Login.test.ts    # UI tests for login functionality
│   └── E2E.test.ts      # End-to-end tests for complete workflows
├── playwright.config.ts # Playwright configuration file
└── tsconfig.json        # TypeScript configuration file
Running Tests
You can run Playwright tests using the following commands:

Run All Tests:

npx playwright test
Run a Specific Test:
bash
Copy code
npx playwright test tests/<test-file-name>.ts
Run Tests in Headed Mode:
If you want to run the tests with a visible browser window:


npx playwright test --headed
Generate Test Reports:
After running tests, you can open the HTML report:

bash
Copy code
npx playwright show-report
Writing Tests
Page Object Model
The framework uses the Page Object Model (POM) design pattern to structure the code for UI tests. Each page of the web application is represented by a class that contains locators and methods to interact with the UI elements.

Example of Page Object (LoginPage):
typescript
Copy code
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  usernameInput = this.page.locator('input[data-test="username"]');
  passwordInput = this.page.locator('input[data-test="password"]');
  loginButton = this.page.locator('input[data-test="login-button"]');
  
  // Methods
  async visit() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
Example Test Using POM:
typescript
Copy code
import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_objects/LoginPage';

test('should login successfully with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.login('standard_user', 'secret_sauce');
  expect(page.url()).toContain('/inventory.html');
});
API Tests
API testing is also supported in the framework using Playwright’s request object. The API interactions are abstracted using the ApiHelper.ts class.

Example of an API Test:
typescript
Copy code
import { test, expect } from '@playwright/test';
import { ApiHelper } from '../helper/ApiHelper';

test('GET list of users', async ({ request }) => {
  const apiHelper = new ApiHelper(request, 'https://reqres.in/api');
  const response = await apiHelper.get('/users?page=2');
  expect(response.status()).toBe(200);
});
Configuring Playwright
The Playwright configuration is stored in playwright.config.ts. You can adjust settings such as timeout, retries, browsers, and base URL from this file.

Example configuration:
typescript
Copy code
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retry-with-video',
  },
});
Reports and Artifacts
After running tests, Playwright generates detailed reports, including screenshots, videos, and traces, which can be found in the playwright-report/ folder.

You can open the HTML report by running:

bash
Copy code
npx playwright show-report
To view videos and screenshots of failed tests, check the test-results/ folder.

Helper Classes
ApiHelper
The ApiHelper.ts class simplifies the process of making HTTP requests. This class abstracts methods like GET, POST, PUT, and DELETE.

typescript
Copy code
export class ApiHelper {
  constructor(private request: any, private baseUrl: string) {}

  async get(endpoint: string) {
    return await this.request.get(`${this.baseUrl}${endpoint}`);
  }

  async post(endpoint: string, body: object) {
    return await this.request.post(`${this.baseUrl}${endpoint}`, { data: body });
  }

  async put(endpoint: string, body: object) {
    return await this.request.put(`${this.baseUrl}${endpoint}`, { data: body });
  }

  async delete(endpoint: string) {
    return await this.request.delete(`${this.baseUrl}${endpoint}`);
  }
}
Best Practices
Use Page Object Model (POM) to separate test logic from UI element selectors.
Keep API tests and UI tests isolated but reusable by writing helper functions.
Always handle asynchronous operations (like await page.click()) properly to avoid flaky tests.
Parameterize test data where possible to ensure flexibility.
Make use of Playwright’s built-in tracing, video, and screenshot features for debugging failed tests.
Use headless mode in CI environments for faster execution, and headed mode locally for easier debugging.